var keysDown = [];
var main_loop;
var base_time = 0;
var acc_time = 0;
var stats;
var GAME_WIDTH;
var GAME_HEIGHT;

var GRAV = 0.6;
var VEL_MAX = 15;

var timer;
var spawnTimer;

$(document).ready(function()
{
	GAME_WIDTH = $(window).width();
	GAME_HEIGHT = $(window).height();
	
	var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);
	document.body.appendChild(renderer.view);
	var stage = new PIXI.Stage(0xFFFFFF, true);
	
	var ballList = [];
	
	stats = new Stats();
	document.body.appendChild( stats.domElement );
	stats.domElement.style.position = "absolute";
	stats.domElement.style.top = "0px";
	
	timer = setInterval(function() 
	{ 
		base_time += 100 
	}, 100);
	
	var cursor = new PIXI.Graphics();
	cursor.lineStyle(0, 0x000000, 1);
	cursor.beginFill(0x000000, 1);
	cursor.drawCircle(0, 0, 3);
	cursor.endFill();
	cursor.pivot.x = 0.5;
	cursor.pivot.y = 0.5;
	stage.addChild(cursor);
	
	stage.defaultCursor = 'none';
	
	spawnBall();
	spawnTimer = setInterval(spawnBall, 5000);
	
	requestAnimationFrame(animate);

	function animate() 
	{
		update();
		renderer.render(stage);
		requestAnimationFrame(animate);
		stats.end();
	}
	
	function update()
	{
		stats.begin();
		
		for(var i = 0; i < ballList.length; i++)
		{
			var o = ballList[i].obj;
			var b = ballList[i];
	
			o.x += b.vx;
			o.y += b.vy;	
			
			/*
			b.vx += b.ax;
			
			if(b.vx > VEL_MAX)
				b.vx = VEL_MAX;
			
			b.vy += b.ay + GRAV;
			
			if(b.vy > VEL_MAX)
				b.vy = VEL_MAX;
			*/

			
			
			
			if (o.y > GAME_HEIGHT - 30) 
			{
				b.vx *= chance.floating({ min: -2.1, max: 2.0 });
				b.vy *= chance.floating({ min: -0.95, max: -0.7 });
				
				o.y = GAME_HEIGHT - 30;
			}
			
			/*for(var j = 0; j < ballList.length; j++)
			{
				var o2 = ballList[j].obj;
				var b2 = ballList[j];
			
				if(dist({ x: o.x, y: o.y }, { x: o2.x, y: o2.y }) < 5)
				{
					var d = dir({ x: o.x, y: o.y }, { x: o2.x, y: o2.y });
					var d2 = -d;
					
					b.vy *= Math.cos(d * Math.PI / 180);
					b.vx *= Math.sin(d * Math.PI / 180);
					
					b2.vy *= Math.cos(d2 * Math.PI / 180);
					b2.vx *= Math.sin(d2 * Math.PI / 180);
				}
			}*/
			
			b.vy += GRAV;
			
			if((base_time - b.createTime) >= b.lifeTime)
			{
				o.alpha -= 0.05;
				
				if(o.alpha <= 0)
				{
					stage.removeChild(o);
					ballList.splice(i, 1);
					//console.log('Spliced @ ' + i);
				}
			}
		}
	}
	
	stage.mousemove = function(e)
	{
		cursor.x = e.global.x;
		cursor.y = e.global.y;
	}

	function spawnBall()
	{
		var sX = chance.integer({ min: 15, max: GAME_WIDTH - 15 });
		
		for(var i = 0; i < 150; i++)
		{
			var ball = new PIXI.Graphics();
			ball.lineStyle(3, 0x000000, 1);
			ball.beginFill(0x3498DB, 1);
			ball.drawCircle(sX, 15, 15);
			ball.endFill();
			ball.pivot.x = 0.5;
			ball.pivot.y = 0.5;
			ballList.push(
			{ 
				obj: ball, 
				vx: chance.floating({ min: -6, max: 6 }), 
				vy: chance.floating({ min: -1, max: 1 }),
				ax: 1,
				ay: 1,
				createTime: base_time,
				lifeTime: chance.floating({ min: 3000, max: 7500 })
			});
			stage.addChild(ball);

		}
	}
	
	function dist(a, b)
	{
		return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	}

	function dir(a, b)
	{
		return Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
	}
});