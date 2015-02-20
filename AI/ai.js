var AI = 
{
	state: "",
	graphicsElement: undefined,
	stateChanging: false,
	moveSpeedScale: 8,
	moveX: 0,
	moveY: 0,
	isMoving: false,
	isProcRunning: false,
	dest: undefined,
	pos: function() { return { x: this.graphicsElement.x, y: this.graphicsElement.y }; },
	proc: {},
	helpers: {},
	destLine: undefined,
	target: undefined,
	prevTarget: undefined,
	targetLine: undefined,
	prevTargetLine: undefined,
	prevTargetSeenFrom: undefined,
	prevTargetLineAlpha: 1,
	visionCone: undefined,
	looksAtPoint: { x: undefined, y: undefined },
	fov: 35,
	lookDist: 680,
	obstacles_in_cone: [],
	targets_in_cone: [],
	bullets: [],
	canShoot: true,
	shootInterval: 450,
	helperVectorA: undefined,
	helperVectorAB: undefined,
	helperVectorB: undefined,
	helperVectorBC: undefined,
	helperVectorC: undefined,
	helperVectorLength: 60,
	raycast:
	{
		ray: undefined
	},
	texts: [],
	stays_in_default: 2000
};

AI.update = function()
{
	switch(this.state)
	{
		case "default":
			if(!this.stateChanging)
			{
				this.stateChanging = true;
				setTimeout(function() { this.state = "wander"; this.stateChanging = false; }.bind(AI), AI.stays_in_default);
			}
			break;
		case "wander":		
			if(!this.isMoving)
			{
				var x = this.helpers.ri(0, game.GAME_WIDTH);
				var y = this.helpers.ri(0, game.GAME_HEIGHT);
				
				this.proc.moveTo.run({ x: x, y: y });
			}
			break;
		default:
			console.log('_no state_');
			break;
	}
	
	this.updateProcedures();
	AI.updateDestLine();
	AI.updateHelperVectors();
	AI.updateLooksAtPoint();
	AI.updateVisionCone();
	AI.updateTarget('closest');
	AI.updateTargetLine();
	AI.updateBullets();
	
	if(game.obstacleList.length > 0 && this.dest != undefined)
	{
		for(var i = 0; i < game.obstacleList.length; i++)
		{
			if(AI.helpers.lineInRect(AI.pos().x, AI.pos().y, AI.dest.x, AI.dest.y, game.obstacleList[i]))
			{
				game.obstacleList[i].tint = 0xe74c3c;
			}
		}
	}
};

AI.updateProcedures = function()
{
	for(var i = 0; i < this.proc.running.length; i++)
	{
		this.proc.running[i].procedure.update();
	}
};

AI.pushProcedure = function(procedure, id)
{
	this.proc.running.push({ procedure: procedure, id: id });
};

AI.findProcedureIndex = function(id)
{
	if(this.proc.running != undefined)
	{
		if(this.proc.running.length > 0)
		{
			for(var i = 0; i < this.proc.running.length; i++)
			{
				if(this.proc.running[i].id === id)
				{
					return i;
				}
			}
		}
		else
		{
			console.log('Procedure list empty');
			return undefined;
		}
	}
	else
	{
		console.log('Procedure list not defined');
	}
};

AI.endProcedure = function(id)
{
	if(this.proc.running != undefined)
	{
		if(this.proc.running.length > 0)
		{
			for(var i = 0; i < this.proc.running.length; i++)
			{
				if(this.proc.running[i].id === id)
				{
					this.proc.running.splice(i, 1);
				}
			}
		}
		else
		{
			console.log('Procedure list empty');
			return undefined;
		}
	}
	else
	{
		console.log('Procedure list not defined');
	}
};

AI.isProcedureRunning = function(id)
{
	if(this.proc.running != undefined)
	{
		if(this.proc.running.length > 0)
		{
			for(var i = 0; i < this.proc.running.length; i++)
			{
				if(this.proc.running[i].id === id)
				{
					return true;
				}
			}
			return false;
		}
		else
		{
			console.log('Procedure list empty');
			return false;
		}
	}
	else
	{
		console.log('Procedure list not defined');
	}
};

//Helpers

AI.helpers.r = function(min, max)
{
	return chance.floating({ min: min, max: max });
};

AI.helpers.ri = function(min, max)
{
	return chance.integer({ min: min, max: max });
};

AI.helpers.dist = function(a, b)
{
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

AI.helpers.dir = function(a, b)
{
	return Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
};

//http://totologic.blogspot.fr/2014/01/accurate-point-in-triangle-test.html
AI.helpers.pointInTri = function(x1, y1, x2, y2, x3, y3, x, y)
{
	var denominator = ((y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3));
	var a = ((y2 - y3)*(x - x3) + (x3 - x2)*(y - y3)) / denominator;
	var b = ((y3 - y1)*(x - x3) + (x1 - x3)*(y - y3)) / denominator;
	var c = 1 - a - b;

	if(0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1)
	{
		return true;
	}
	else
	{
		return false;
	}
};

AI.helpers.pointInRect = function(x, y, rect)
{
	var corners = AI.helpers.getRectCorners(rect);
	
	if(AI.helpers.pointInTri(corners.c1.x, corners.c1.y, corners.c3.x, corners.c3.y, corners.c2.x, corners.c2.y, x, y))
	{
		return true;
	}
	else
	{
		if(AI.helpers.pointInTri(corners.c1.x, corners.c1.y, corners.c3.x, corners.c3.y, corners.c4.x, corners.c4.y, x, y))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
};

AI.helpers.closestObstacle = function()
{
	if(game.obstacleList.length > 0)
	{
		var closest = 999999;
		var closest_obj = undefined;
		
		for(var i = 0; i < game.obstacleList.length; i++)
		{
			var dist = AI.helpers.dist(AI.pos(), { x: game.obstacleList[i].x, y: game.obstacleList[i].y });
			
			if(dist < closest)
			{
				closest = dist;
				closest_obj = game.obstacleList[i];
			}
		}
		
		return closest_obj;
	}
	else
	{
		return undefined;
	}
};

AI.helpers.closestVisibleObstacle = function()
{
	if(AI.obstacles_in_cone.length > 0)
	{
		var closest = 999999;
		var closest_obj = undefined;
		
		for(var i = 0; i < AI.obstacles_in_cone.length; i++)
		{
			var dist = AI.helpers.dist(AI.pos(), { x: AI.obstacles_in_cone[i].x, y: AI.obstacles_in_cone[i].y });
			
			if(dist < closest)
			{
				closest = dist;
				closest_obj = AI.obstacles_in_cone[i];
			}
		}
		
		return closest_obj;
	}
	else
	{
		return undefined;
	}
};

AI.helpers.closestTarget = function()
{
	if(AI.targets_in_cone.length > 0)
	{
		var closest = 999999;
		var closest_obj = undefined;
		
		for(var i = 0; i < AI.targets_in_cone.length; i++)
		{
			var dist = AI.helpers.dist(AI.pos(), { x: AI.targets_in_cone[i].x, y: AI.targets_in_cone[i].y });
			
			if(dist < closest)
			{
				closest = dist;
				closest_obj = AI.targets_in_cone[i];
			}
		}
		
		return closest_obj;
	}
	else
	{
		return undefined;
	}
};

AI.helpers.closestVisibleTarget = function()
{
	if(AI.targets_in_cone.length > 0)
	{
		var closest = 999999;
		var closest_obj = undefined;
		
		for(var i = 0; i < AI.targets_in_cone.length; i++)
		{
			AI.targets_in_cone[i].tint = 0xFFFFFF;
			var is_target_visible = true;
			
			for(var j = 0; j < AI.obstacles_in_cone.length; j++)
			{
				if(!AI.helpers.lineInRect(AI.pos().x, AI.pos().y, AI.targets_in_cone[i].x, AI.targets_in_cone[i].y, AI.obstacles_in_cone[j]))
				{
					continue;
				}
				else
				{
					is_target_visible = false;
					break;
				}
			}
			
			if(is_target_visible)
			{
				var dist = AI.helpers.dist(AI.pos(), { x: AI.targets_in_cone[i].x, y: AI.targets_in_cone[i].y });
			
				if(dist < closest)
				{
					closest = dist;
					closest_obj = AI.targets_in_cone[i];
				}
			}
			
		}
		
		return closest_obj;
	}
	else
	{
		return undefined;
	}
};

AI.helpers.getRectSides = function(rect)
{
	if(rect != undefined)
	{
		if(rect.width != undefined && rect.height != undefined)
		{
			var w = rect.width;
			var hw = w/3;
			
			var h = rect.height;
			var hh = h/3;
			
			var px = rect.x;
			var py = rect.y;
			
			var sides = 
			{
				s1: { x1: px - hw, y1: py - hh, x2: px + hw, y2: py - hh},
				s2: { x1: px + hw, y1: py - hh, x2: px + hw, y2: py + hh},
				s3: { x1: px + hw, y1: py + hh, x2: px - hw, y2: py + hh},
				s4: { x1: px - hw, y1: py + hh, x2: px - hw, y2: py - hh}
			};
			
			return sides;
		}
		else
		{
			console.log('getRectSides: Not a rectangle - width/height undefined');
		}
	}
	else
	{
		console.log('Undefined given to getRectSides');
	}
	
	/*var sideslin = new PIXI.Graphics();
	sideslin.lineStyle(1, 0xFFFFFF, 1);
	sideslin.beginFill(0xFFFFFF, 1);
	
	
	for(var side in sides)
	{	
		sideslin.moveTo(sides[side].x1, sides[side].y1);
		sideslin.lineTo(sides[side].x2, sides[side].y2);
	}
	
	sideslin.endFill();
	game.stage.addChild(sideslin);*/
};

AI.helpers.lineInRect = function(x1, y1, x2, y2, rect) 
{
	var rleft = rect.x - rect.width / 3;
	var rtop = rect.y - rect.height / 3;

    var minX = x1;
    var maxX = x2;
    
    if (x1 > x2)
	{
        minX = x2;
        maxX = x1;
    }
    
    if (maxX > rleft + rect.width / 1.5)
        maxX = rleft + rect.width / 1.5;
		
    
    if (minX < rleft)
        minX = rleft;
    
    if (minX > maxX)
        return false;
    
    var minY = y1;
    var maxY = y2;
    
    var dx = x2 - x1;
    
    if (Math.abs(dx) > 0.0000001) 
	{
        var a = (y2 - y1) / dx;
        var b = y1 - a * x1;
        minY = a * minX + b;
        maxY = a * maxX + b;
    }
    
    if (minY > maxY) 
	{
        var tmp = maxY;
        maxY = minY;
        minY = tmp;
    }
    
    if (maxY > rtop + rect.height / 1.5)
        maxY = rtop + rect.height / 1.5;
    
    if (minY < rtop)
        minY = rtop;
    
    if (minY > maxY)
        return false;
    
    return true;
};

AI.helpers.getRectCorners = function(rect)
{
	if(rect != undefined)
	{
		if(rect.width != undefined && rect.height != undefined)
		{
			var w = rect.width;
			var hw = w/3;
			
			var h = rect.height;
			var hh = h/3;
			
			var px = rect.x;
			var py = rect.y;
			
			var corners = 
			{
				c1: { x: px - hw, y: py - hh },
				c2: { x: px + hw, y: py - hh },
				c3: { x: px + hw, y: py + hh },
				c4: { x: px - hw, y: py + hh }
			};
			
			return corners;
		}
		else
		{
			console.log('getRectCorners: Not a rectangle - width/height undefined');
		}
	}
	else
	{
		console.log('Undefined given to getRectCorners');
	}
};

//Updates

AI.updateDestLine = function()
{
	if(AI.dest != undefined)
	{
		AI.destLine.clear();
		AI.destLine.lineStyle(2, 0xf39c12, 1);
		AI.destLine.beginFill(0xf39c12, 1);
		AI.destLine.moveTo(AI.pos().x, AI.pos().y);
		AI.destLine.lineTo(AI.dest.x, AI.dest.y);
		AI.destLine.endFill();
	}
};

AI.updateHelperVectors = function()
{
	if(this.dest != undefined)
	{
		var d = this.helpers.dir(this.pos(), this.dest);
		
		//helperVectorA
		AI.helperVectorA.clear();
		AI.helperVectorA.lineStyle(3, 0x2980b9, 0.7);
		AI.helperVectorA.beginFill(0x2980b9, 0.7);
		AI.helperVectorA.moveTo(AI.pos().x, AI.pos().y);
		AI.helperVectorA.lineTo(AI.pos().x + Math.cos((d - 90) * Math.PI / 180) * AI.helperVectorLength, AI.pos().y + Math.sin((d - 90) * Math.PI / 180) * AI.helperVectorLength);
		AI.helperVectorA.endFill();
		
		//helperVectorAB
		AI.helperVectorAB.clear();
		AI.helperVectorAB.lineStyle(3, 0x2980b9, 0.5);
		AI.helperVectorAB.beginFill(0x2980b9, 0.5);
		AI.helperVectorAB.moveTo(AI.pos().x, AI.pos().y);
		AI.helperVectorAB.lineTo(AI.pos().x + Math.cos((d - 45) * Math.PI / 180) * AI.helperVectorLength, AI.pos().y + Math.sin((d - 45) * Math.PI / 180) * AI.helperVectorLength);
		AI.helperVectorAB.endFill();
		
		//helperVectorB
		AI.helperVectorB.clear();
		AI.helperVectorB.lineStyle(3, 0x2980b9, 0.7);
		AI.helperVectorB.beginFill(0x2980b9, 0.7);
		AI.helperVectorB.moveTo(AI.pos().x, AI.pos().y);
		AI.helperVectorB.lineTo(AI.pos().x + Math.cos(d * Math.PI / 180) * AI.helperVectorLength, AI.pos().y + Math.sin(d * Math.PI / 180) * AI.helperVectorLength);
		AI.helperVectorB.endFill();
		
		//helperVectorBC
		AI.helperVectorBC.clear();
		AI.helperVectorBC.lineStyle(3, 0x2980b9, 0.5);
		AI.helperVectorBC.beginFill(0x2980b9, 0.5);
		AI.helperVectorBC.moveTo(AI.pos().x, AI.pos().y);
		AI.helperVectorBC.lineTo(AI.pos().x + Math.cos((d + 45) * Math.PI / 180) * AI.helperVectorLength, AI.pos().y + Math.sin((d + 45) * Math.PI / 180) * AI.helperVectorLength);
		AI.helperVectorBC.endFill();
		
		//helperVectorC
		AI.helperVectorC.clear();
		AI.helperVectorC.lineStyle(3, 0x2980b9, 0.7);
		AI.helperVectorC.beginFill(0x2980b9, 0.7);
		AI.helperVectorC.moveTo(AI.pos().x, AI.pos().y);
		AI.helperVectorC.lineTo(AI.pos().x + Math.cos((d + 90) * Math.PI / 180) * AI.helperVectorLength, AI.pos().y + Math.sin((d + 90) * Math.PI / 180) * AI.helperVectorLength);
		AI.helperVectorC.endFill();
	}
};

AI.updateTargetLine = function()
{
	if(AI.target != undefined)
	{
		AI.targetLine.clear();
		AI.targetLine.lineStyle(2, 0xe74c3c, 1);
		AI.targetLine.beginFill(0xe74c3c, 1);
		AI.targetLine.moveTo(AI.pos().x, AI.pos().y);
		AI.targetLine.lineTo(AI.target.x, AI.target.y);
		AI.targetLine.endFill();
	}
	else
	{
		AI.targetLine.clear();
		
		if(AI.prevTarget != undefined)
		{
			AI.prevTargetLine.clear();
			AI.prevTargetLine.lineStyle(3, 0xc0392b, AI.prevTargetLineAlpha);
			AI.prevTargetLine.beginFill(0xc0392b, AI.prevTargetLineAlpha);
			AI.prevTargetLine.moveTo(AI.prevTargetSeenFrom.x, AI.prevTargetSeenFrom.y);
			AI.prevTargetLine.lineTo(AI.prevTarget.x, AI.prevTarget.y);
			AI.prevTargetLine.endFill();
			
			AI.prevTargetLineAlpha -= 0.01;
		}
	}
};

AI.updateTarget = function(method) //'random', 'closest'
{
	if(method === 'closest')
	{
		if(AI.helpers.closestVisibleTarget() != undefined)
		{
			AI.target = AI.helpers.closestVisibleTarget();
			AI.prevTarget = AI.helpers.closestVisibleTarget();
			AI.prevTargetSeenFrom = AI.pos();
			AI.prevTargetLineAlpha = 1;
			
			AI.shootAt(AI.target);
		}
		else
		{
			AI.target = undefined;
		}
	}
	else if(method === 'random')
	{
		
	}
	else
	{
		console.log('Undefined targetting method');
	}
};

AI.rayCast = function(x, y, direction, length)
{
	var raycastResult = { doCollide: false };
	
	if (length == 0) 
	{
		raycastResult.doCollide = AI.helpers.isPointTraversable(x, y);
        raycastResult.pos = { x: x, y: y };

        return raycastResult;
    }

	var rayLine = AI.helpers.bresenhamLine(x, y, x + (AI.helpers.normalize(direction.x, direction.y).x * length), y + (AI.helpers.normalize(direction.x, direction.y).y * length));
	
    if (rayLine.length > 0) 
	{
        var rayPointIndex = 0;

        if (rayLine[0].x != x && rayLine[0].y != y) 
			rayPointIndex = rayLine.length - 1;

        // Loop through all the points starting from "position"
        while (true) 
		{
            var rayPoint = rayLine[rayPointIndex];
            if (!AI.helpers.isPointTraversable(rayPoint.x, rayPoint.y)) 
			{
                raycastResult.pos = rayPoint;
                raycastResult.doCollide = true;
                break;
            }
            if (rayLine[0].x != x && rayLine[0].y != y) 
			{
                rayPointIndex--;
                if (rayPointIndex < 0) 
					break;
            } 
			else 
			{
                rayPointIndex++;
                if (rayPointIndex >= rayLine.length) 
					break;
            }
        }
    }

    return raycastResult;
};

AI.helpers.pointInRectLight = function(x, y, rect)
{
	//var corners = AI.helpers.getRectCorners(rect);
	if(x > rect.x - rect.width / 3 && x < rect.x + rect.width / 3 && y > rect.y - rect.height / 3 && y < rect.y + rect.height / 3)
	{
		return true;
	}
	else
	{
		return false;
	}
};

AI.helpers.isPointTraversable = function(x, y) 
{
    if(x < 0 || x > game.GAME_WIDTH || y < 0 || y > game.GAME_HEIGHT)
		return false;
	
	for(var obstacle in game.obstacleList)
	{
		if(AI.helpers.pointInRectLight(x, y, game.obstacleList[obstacle]))
		{
			return false;
		}
		else
		{
			continue;
		}
	}
	return true;
};

AI.helpers.length = function(x, y)
{
	return Math.abs(Math.sqrt((x * x) + (y * y)));
};

AI.helpers.normalize = function(x, y)
{
	return { x: x / AI.helpers.length(x, y), y: y / AI.helpers.length(x, y) };
};

AI.helpers.bresenhamLine = function(x0, y0, x1, y1) 
{
    var result = [];
	
	
    if(Math.abs(y1 - y0) > Math.abs(x1 - x0))
	{
		var step = true;
	}
	else
	{
		var step = false;
	}
	
    if (step) 
	{
		var t = x0;
		x0 = y0;
		y0 = t;
		
		t = x1;
		x1 = y1;
		y1 = t;
    }
	
    if (x0 > x1) 
	{	
		var t = x0;
		x0 = x1;
		x1 = t;
		
		t = y0;
		y0 = y1;
		y1 = t;
    }

    var deltax = x1 - x0;
    var deltay = Math.abs(y1 - y0);
    var error = Math.abs(x1 - x0) - Math.abs(y1 - y0);
    var ystep;
    var y = y0;
	
    if (y0 < y1) 
	{
		ystep = 1; 
	}
	else 
	{
		ystep = -1;
	}
	
    for(var x = x0; x <= x1; x++) 
	{
        if (step)
		{
			result.push({ x: y, y: x });
		}	
        else 
		{
			result.push({ x: x, y: y });
		}
		
        error += deltay;
		
        if (2 * error >= deltax) 
		{
            y += ystep;
            error -= deltax;
        }
    }
	
    return result;
};

var canLog = true;

AI.helpers.nonInvasiveLog = function(log)
{
	if(canLog)
	{
		console.log(log);
		canLog = false;
		setTimeout(function() { canLog = true; }, 1000);
	}
};

(function() 
{
  Array.prototype.mergeSort = jQuery.fn.mergeSort = mergeSort;

	function mergeSort(compare, center) 
	{
		var length = this.length,
			middle = Math.floor(length / 2);

		if (!compare) 
		{
		  compare = function(left, right) 
		  {
			if (left < right)
			  return -1;
			if (left == right)
			  return 0;
			else
			  return 1;
		  };
		}

		if (length < 2)
		  return this;

		return merge(
		  this.slice(0, middle).mergeSort(compare, center),
		  this.slice(middle, length).mergeSort(compare, center),
		  compare, center
		);
	}
	
	function merge(left, right, compare, center) 
	{
		var result = [];

		while (left.length > 0 || right.length > 0) 
		{
		  if (left.length > 0 && right.length > 0) 
		  {
			if (compare(left[0].pos, right[0].pos, center) <= 0) 
			{
			  result.push(left[0]);
			  left = left.slice(1);
			}
			else 
			{
			  result.push(right[0]);
			  right = right.slice(1);
			}
		  }
		  else if (left.length > 0)
		  {
			result.push(left[0]);
			left = left.slice(1);
		  }
		  else if (right.length > 0)
		  {
			result.push(right[0]);
			right = right.slice(1);
		  }
		}
		return result;
  }
})();

AI.helpers.angularLess = function(left, right, center)
{
	if (left.x - center.x >= 0 && right.x - center.x < 0)
        return true;
    if (left.x - center.x < 0 && right.x - center.x >= 0)
        return false;
    if (left.x - center.x == 0 && right.x - center.x == 0) 
	{
        if (left.y - center.y >= 0 || right.y - center.y >= 0)
            return left.y > right.y;
        return right.y > left.y;
    }

    // compute the cross product of vectors (center -> a) x (center -> b)
    var det = (left.x - center.x) * (right.y - center.y) - (right.x - center.x) * (left.y - center.y);
    if (det < 0)
        return true;
    if (det > 0)
        return false;

    // points a and b are on the same line from the center
    // check which point is closer to the center
    var d1 = (left.x - center.x) * (left.x - center.x) + (left.y - center.y) * (left.y - center.y);
    var d2 = (right.x - center.x) * (right.x - center.x) + (right.y - center.y) * (right.y - center.y);
	
	if(d1 > d2)
	{
		return true;
	}
	else
	{
		return false;
	}
};

AI.updateVisionCone = function()
{
	if(AI.visionCone != undefined)
	{
		var d = this.helpers.dir(this.pos(), this.looksAtPoint);
		
		var l1 = 
		{
			x1: AI.pos().x,
			y1: AI.pos().y,
			x2: AI.pos().x + Math.cos((d - this.fov) * Math.PI / 180) * this.lookDist,
			y2: AI.pos().y + Math.sin((d - this.fov) * Math.PI / 180) * this.lookDist
		};
		
		var l2 = 
		{
			x1: AI.pos().x,
			y1: AI.pos().y,
			x2: AI.pos().x + Math.cos((d + this.fov) * Math.PI / 180) * this.lookDist,
			y2: AI.pos().y + Math.sin((d + this.fov) * Math.PI / 180) * this.lookDist
		};
		
		var dist = this.helpers.dist({ x: l1.x2, y: l1.y2 }, { x: l2.x2, y: l2.y2 });
		var visited = [];
		var rays_cast = [];
		
		if(game.obstacleList.length > 0)
		{
			//AI.visionCone.clear();
			//AI.visionCone.lineStyle(1, 0xf1c40f, 1);
			//AI.visionCone.beginFill(0xf1c40f, 0.3);
			
			for(var i = 0; i < game.obstacleList.length; i++)
			{
				var corners = AI.helpers.getRectCorners(game.obstacleList[i]);
				for(var corner in corners)
				{
					if (corners.hasOwnProperty(corner))
					{
						//console.log(corners[corner].x + ' | ' + corners[corner].y);
						//AI.visionCone.moveTo(this.pos().x, this.pos().y);
						
						
						var dToCenter = this.helpers.dir(
						{
							x: corners[corner].x, 
							y: corners[corner].y 
						},
						{
							x: game.obstacleList[i].x,
							y: game.obstacleList[i].y
						});
						
						var d = this.helpers.dir(this.pos(), 
						{
							x: corners[corner].x + Math.cos(dToCenter * Math.PI / 180) * -1.9, 
							y: corners[corner].y + Math.sin(dToCenter * Math.PI / 180) * -1.9
						});
						
						var r = AI.rayCast(this.pos().x, this.pos().y, 
						{ 
							x: Math.cos(d * Math.PI / 180),
							y: Math.sin(d * Math.PI / 180)
						}, 2000);
					
						if(r.pos != undefined)
						{
							//AI.visionCone.lineTo(r.pos.x, r.pos.y);
						}
						
						rays_cast.push(r);
						
						var dToCenter = this.helpers.dir(
						{
							x: corners[corner].x, 
							y: corners[corner].y 
						},
						{
							x: game.obstacleList[i].x,
							y: game.obstacleList[i].y
						});
						
						var d = this.helpers.dir(this.pos(), 
						{
							x: corners[corner].x + Math.cos(dToCenter * Math.PI / 180) * 1.9, 
							y: corners[corner].y + Math.sin(dToCenter * Math.PI / 180) * 1.9
						});
						
						var r = AI.rayCast(this.pos().x, this.pos().y, 
						{ 
							x: Math.cos(d * Math.PI / 180),
							y: Math.sin(d * Math.PI / 180)
						}, 2000);
					
						if(r.pos != undefined)
						{
							//AI.visionCone.lineTo(r.pos.x, r.pos.y);
						}
						
						rays_cast.push(r);
						
						/*AI.visionCone.moveTo(r.pos.x, r.pos.y);
						AI.visionCone.lineStyle(1, 0x1abc9c, 1);
						
						if(r.pos != undefined)
						{
						
							var r2 = AI.rayCast(r.pos.x, r.pos.y, 
							{ 
								x: Math.cos(d * Math.PI / 180),
								y: Math.sin(d * Math.PI / 180)
							}, 2000);
						}
						
						if(r2.pos != undefined)
						{
							AI.visionCone.lineTo(r2.pos.x, r2.pos.y);
						}
						
						rays_cast.push(r2);*/
					}
				}
			}
			
			//AI.visionCone.moveTo(this.pos().x, this.pos().y);
			
			var da = this.helpers.dir(this.pos(), { x: 0, y: 0 });
			var db = this.helpers.dir(this.pos(), { x: game.GAME_WIDTH, y: 0 });
			var dc = this.helpers.dir(this.pos(), { x: game.GAME_WIDTH, y: game.GAME_HEIGHT });
			var dd = this.helpers.dir(this.pos(), { x: 0, y: game.GAME_HEIGHT });
			
			
			var r = AI.rayCast(this.pos().x, this.pos().y, 
			{ 
				x: Math.cos(da * Math.PI / 180),
				y: Math.sin(da * Math.PI / 180)
			}, 2000);
		
			if(r.pos != undefined)
			{
				//AI.visionCone.lineTo(r.pos.x, r.pos.y);
			}
			
			rays_cast.push(r);
			
			//AI.visionCone.moveTo(this.pos().x, this.pos().y);
			
			var r = AI.rayCast(this.pos().x, this.pos().y, 
			{ 
				x: Math.cos(db * Math.PI / 180),
				y: Math.sin(db * Math.PI / 180)
			}, 2000);
		
			if(r.pos != undefined)
			{
				//AI.visionCone.lineTo(r.pos.x, r.pos.y);
			}
			
			rays_cast.push(r);
			
			//AI.visionCone.moveTo(this.pos().x, this.pos().y);
			
			var r = AI.rayCast(this.pos().x, this.pos().y, 
			{ 
				x: Math.cos(dc * Math.PI / 180),
				y: Math.sin(dc * Math.PI / 180)
			}, 2000);
		
			if(r.pos != undefined)
			{
				//AI.visionCone.lineTo(r.pos.x, r.pos.y);
			}
			
			rays_cast.push(r);
			
			//AI.visionCone.moveTo(this.pos().x, this.pos().y);
			
			var r = AI.rayCast(this.pos().x, this.pos().y, 
			{ 
				x: Math.cos(dd * Math.PI / 180),
				y: Math.sin(dd * Math.PI / 180)
			}, 2000);
		
			if(r.pos != undefined)
			{
				//AI.visionCone.lineTo(r.pos.x, r.pos.y);
			}
			
			rays_cast.push(r);
			
			rays_cast = rays_cast.mergeSort(AI.helpers.angularLess, this.pos());
			
			for(var i = 0; i < AI.texts.length; i++)
			{
				game.stage.removeChild(AI.texts[i]);
				AI.texts.splice(i, 1);
			}
			
			AI.raycast.ray.clear();
			
			for(var i = 0; i < rays_cast.length; i++)
			{
				AI.raycast.ray.lineStyle(0, 0xf1c40f, 0.3);
				AI.raycast.ray.beginFill(0xf1c40f, 0.2);
				
				if(i < rays_cast.length-1)
				{
					AI.raycast.ray.moveTo(this.pos().x, this.pos().y);
					AI.raycast.ray.lineTo(rays_cast[i].pos.x, rays_cast[i].pos.y);
					AI.raycast.ray.lineTo(rays_cast[i+1].pos.x, rays_cast[i+1].pos.y);
					AI.raycast.ray.lineTo(this.pos().x, this.pos().y);
					AI.raycast.ray.endFill();
				}
				else
				{
					AI.raycast.ray.moveTo(this.pos().x, this.pos().y);
					AI.raycast.ray.lineTo(rays_cast[i].pos.x, rays_cast[i].pos.y);
					AI.raycast.ray.lineTo(rays_cast[0].pos.x, rays_cast[0].pos.y);
					AI.raycast.ray.lineTo(this.pos().x, this.pos().y);
					AI.raycast.ray.endFill();
				}
			
				/*var t = new PIXI.Text(i, 
				{
					font: '15px Arial',
					fill: '#ecf0f1'
				});
				
				var d = AI.helpers.dir(this.pos(), rays_cast[i].pos);
				
				t.x = this.pos().x + Math.cos(d * Math.PI / 180) * 250;
				t.y = this.pos().y + Math.sin(d * Math.PI / 180) * 250;
				
				game.stage.addChild(t);
				AI.texts.push(t);*/
				}
			
			
			
			
			/*for(var i = 0; i < game.obstacleList.length; i += 1)
			{
				AI.visionCone.moveTo(this.pos().x, this.pos().y);
				var corners = AI.helpers.getRectCorners(game.obstacleList[i]);
				
				for(var corner in corners)
				{
					var angToCenter = AI.helpers.dir({ x: corners[corner].x, y: corners[corner].y }, { x: game.obstacleList[i].x, y: game.obstacleList[i].y });
					var ang = this.helpers.dir(this.pos(), { x: corners[corner].x + Math.cos(angToCenter * Math.PI / 180) * 15, y: corners[corner].y + Math.sin(angToCenter * Math.PI / 180) * 15});
					AI.visionCone.moveTo(this.pos().x, this.pos().y);
					
					
					
					var r = AI.rayCast(this.pos().x, this.pos().y, 
					{ 
						x:1000,
						y: 1000
					}, 10000);
					
					if(r.pos != undefined)
					{
						AI.visionCone.lineTo(r.pos.x, r.pos.y);
					}
					
					
				}
			}*/
			/*
			AI.visionCone.moveTo(this.pos().x, this.pos().y);
			AI.visionCone.lineTo(0, 0);
			
			AI.visionCone.moveTo(this.pos().x, this.pos().y);
			AI.visionCone.lineTo(game.GAME_WIDTH, 0);
			
			AI.visionCone.moveTo(this.pos().x, this.pos().y);
			AI.visionCone.lineTo(game.GAME_WIDTH, game.GAME_HEIGHT);
			
			AI.visionCone.moveTo(this.pos().x, this.pos().y);
			AI.visionCone.lineTo(0, game.GAME_HEIGHT);*/
		}
		
		//AI.visionCone.endFill();
		
		/*var d = this.helpers.dir(this.pos(), this.looksAtPoint);

		var l1 = 
		{
			x1: AI.pos().x,
			y1: AI.pos().y,
			x2: AI.pos().x + Math.cos((d - this.fov) * Math.PI / 180) * this.lookDist,
			y2: AI.pos().y + Math.sin((d - this.fov) * Math.PI / 180) * this.lookDist
		};
		
		var l2 = 
		{
			x1: AI.pos().x,
			y1: AI.pos().y,
			x2: AI.pos().x + Math.cos((d + this.fov) * Math.PI / 180) * this.lookDist,
			y2: AI.pos().y + Math.sin((d + this.fov) * Math.PI / 180) * this.lookDist
		};
		
		var l3 = 
		{
			x1: l1.x2,
			y1: l1.y2,
			x2: l2.x2,
			y2: l2.y2
		};
		
		AI.visionCone.clear();
		AI.visionCone.lineStyle(2, 0x000000, 0.3);
		AI.visionCone.beginFill(0x8e44ad, 0.3);
		AI.visionCone.moveTo(l1.x1, l1.y1);
		AI.visionCone.lineTo(l1.x2, l1.y2);
		AI.visionCone.lineTo(l2.x2, l2.y2);
		AI.visionCone.lineTo(l1.x1, l1.y1);
		AI.visionCone.endFill();
		
		AI.obstacles_in_cone = [];
		
		if(game.obstacleList.length > 0)
		{	
			for(var i = 0; i < game.obstacleList.length; i++)
			{
				var corners = AI.helpers.getRectCorners(game.obstacleList[i]);
				game.obstacleList[i].tint = 0xFFFFFF;
				
				for(var corner in corners)
				{
					if(AI.helpers.pointInTri(l1.x1, l1.y1, l1.x2, l1.y2, l2.x2, l2.y2, corners[corner].x, corners[corner].y))
					{
						AI.obstacles_in_cone.push(game.obstacleList[i]);
						game.obstacleList[i].tint = 0xe74c3c;
					}
				}
			}
		}
		
		AI.targets_in_cone = [];
		
		if(game.targetList.length > 0)
		{
			for(var i = 0; i < game.targetList.length; i++)
			{
				var corners = AI.helpers.getRectCorners(game.targetList[i]);
				game.targetList[i].tint = 0xFFFFFF;
				
				for(var corner in corners)
				{	
					if(AI.helpers.pointInTri(l1.x1, l1.y1, l1.x2, l1.y2, l2.x2, l2.y2, corners[corner].x, corners[corner].y))
					{
						AI.targets_in_cone.push(game.targetList[i]);
					}
				}
			}
		}*/
	}
};

AI.updateLooksAtPoint = function()
{
	if(this.dest == undefined)
	{
		this.looksAtPoint.x = this.pos().x;
		this.looksAtPoint.y = this.pos().y;
	}
	else
	{
		this.looksAtPoint.x = this.dest.x;
		this.looksAtPoint.y = this.dest.y;
	}
};

AI.shootAt = function(target)
{
	if(AI.canShoot)
	{
		var bullet = new PIXI.Graphics();
		bullet.lineStyle(2, 0x000000, 1);
		bullet.beginFill(0xf1c40f, 1);
		bullet.drawCircle(0, 0, 5);
		bullet.endFill();
		
		bullet.x = this.pos().x;
		bullet.y = this.pos().y;
		game.stage.addChild(bullet);
		this.bullets.push({ bullet: bullet, dest: target, dir: this.helpers.dir(this.pos(), { x: target.x, y: target.y }) });
		
		AI.canShoot = false;
		
		setTimeout(function() { AI.canShoot = true; }, AI.shootInterval);
	}
};

AI.updateBullets = function()
{
	for(var i = 0; i < this.bullets.length; i++)
	{		
		this.bullets[i].bullet.x += Math.cos(this.bullets[i].dir * Math.PI / 180) * 5;
		this.bullets[i].bullet.y += Math.sin(this.bullets[i].dir * Math.PI / 180) * 5;
		
		if(this.bullets[i].bullet.x < 0 || this.bullets[i].bullet.x > game.GAME_WIDTH ||
		this.bullets[i].bullet.y < 0 || this.bullets[i].bullet.y > game.GAME_HEIGHT)
		{
			game.stage.removeChild(this.bullets[i].bullet);
			this.bullets.splice(i, 1);
		}
		
		for(var j = 0; j < game.obstacleList.length; j++)
		{
			if(this.bullets[i] != undefined)
			{
				if(AI.helpers.pointInRect(this.bullets[i].bullet.x, this.bullets[i].bullet.y, game.obstacleList[j]))
				{
					game.stage.removeChild(this.bullets[i].bullet);
					this.bullets.splice(i, 1);
				}
			}
		}
		
		for(var j = 0; j < game.targetList.length; j++)
		{
			if(this.bullets[i] != undefined)
			{
				if(AI.helpers.pointInRect(this.bullets[i].bullet.x, this.bullets[i].bullet.y, game.targetList[j]))
				{
					game.stage.removeChild(this.bullets[i].bullet);
					this.bullets.splice(i, 1);
					
					game.stage.removeChild(game.targetList[j]);
					game.targetList.splice(j, 1);
				}
			}
		}
	}
};

//Misc

AI.move = function(direction)
{
	this.graphicsElement.x += this.moveX;
	this.graphicsElement.y += this.moveY;
	
	if(this.graphicsElement.x > game.GAME_WIDTH)
		this.graphicsElement.x = game.GAME_WIDTH;
		
	if(this.graphicsElement.x < 0)
		this.graphicsElement.x = 0;
		
	if(this.graphicsElement.y > game.GAME_HEIGHT)
		this.graphicsElement.y = game.GAME_HEIGHT;
		
	if(this.graphicsElement.y < 0)
		this.graphicsElement.y = 0;	
	
};