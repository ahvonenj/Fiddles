var game = 
{
	base_time: undefined,
	acc_time: undefined,
	stats: undefined,
	WIDTH: undefined,
	HEIGHT: undefined,
	renderer: undefined,
	stage: undefined,
	camera: 
	{ 
		position: { x: 0, y: 0 } 
	}
};

var world = 
{
	map: [],
	update: function()
	{
		world.map.length = 0;
		
		for(var i = 0; i < world.map.length; i++)
		{		
			for(var j = 0; j < world.map[i].length; j++)
			{
				stage.removeChild(world.map[i][j]);
			}
		}
		
		for(var i = 0; i < mapvisible_x / cellsize; i++)
		{
			var map1 = [];
			
			for(var j = 0; j < mapvisible_y / cellsize; j++)
			{
				
				console.log(i + ', ' + j);
				
				var rect = new PIXI.Graphics();
				rect.beginFill(helpers.hexFromNoise(noise.perlin2(game.camera.position.x + i / 100, game.camera.position.y + j / 100)), 1);
				rect.lineStyle(1, 0x000000, 1);
				rect.drawRect(0, 0, cellsize, cellsize);
				rect.endFill();
				
				rect.x = (game.WIDTH / 2 - mapvisible_x / 2) + i * cellsize;
				rect.y =( game.HEIGHT / 2 - mapvisible_y / 2) + j * cellsize;
				game.stage.addChild(rect);
				map1.push(rect);
			}
			world.map.push(map1);
		}
	}
};

var helpers = 
{
	gridDist: function(x0, y0, x1, y1)
	{
		var dx = Math.abs(x0-x1);
		var dy = Math.abs(y0-y1);
		
		return { x: dx, Y: dy };
	},
	
	dist: function(a, b)
	{
		return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	},

	dir: function(a, b)
	{
		return Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
	},
	
	getNearbyCells: function(p)
	{
		var nearby = 
		[
			{ x: p.x - 1, y: p.y - 1 },
			{ x: p.x, y: p.y - 1 },
			{ x: p.x + 1, y: p.y - 1 },
			
			{ x: p.x - 1, y: p.y },
			{ x: p.x + 1, y: p.y },
			
			{ x: p.x - 1, y: p.y + 1 },
			{ x: p.x, y: p.y + 1 },
			{ x: p.x + 1, y: p.y + 1 }
		];
		
		return nearby;
	},
	
	hexFromNoise: function(noiseOut)
	{
		var tiles = 
		{
			deepwater: '0x2980b9',
			water: '0x3498db',
			sand: '0xf1c40f',
			forest: '0x2ecc71',
			deepforest: '0x27ae60',
			rock: '0xbdc3c7',
			mountain: '0x95a5a6',
			highmountain: '0x7f8c8d',
			snow: '0xecf0f1',
			debug: '0x9b59b6'
		};
	
		var n = Math.abs(Math.floor(noiseOut * 100));
		
		if(n < 5)
		{
			return tiles.deepwater;
		}
		else if(n < 10)
		{
			return tiles.water;
		}
		else if(n < 15)
		{
			return tiles.sand;
		}
		else if(n < 20)
		{
			return tiles.forest;
		}
		else if(n < 25)
		{
			return tiles.deepforest;
		}
		else if(n < 30)
		{
			return tiles.rock;
		}
		else if(n < 35)
		{
			return tiles.mountain;
		}
		else if(n < 40)
		{
			return tiles.highmountain;
		}
		else if(n < 45)
		{
			return tiles.snow;
		}
		else
		{
			return tiles.debug;
		}
	}
};

var simplex = new SimplexNoise(Math);
	
noise.seed(161803398875);

var mapvisible_x = 600;
var mapvisible_y = 600;
var cellsize = 15;

$(document).ready(function()
{
	window.oncontextmenu = function() 
	{
		return false;
	};

	game.WIDTH = $(window).width();
	game.HEIGHT = $(window).height();
	//game.camera.position.x = game.WIDTH / 2;
	//game.camera.position.y = game.HEIGHT / 2;
	
	game.renderer = new PIXI.autoDetectRenderer(game.WIDTH, game.HEIGHT);
	document.body.appendChild(game.renderer.view);

	game.stage = new PIXI.Stage(0xFFFFFF);

	game.stats = new Stats();
	document.body.appendChild(game.stats.domElement);
	game.stats.domElement.style.position = "absolute";
	game.stats.domElement.style.top = "15px";
	game.stats.domElement.style.left = "15px";	
	
	for(var i = 0; i < mapvisible_x / cellsize; i++)
	{
		var map1 = [];
		
		for(var j = 0; j < mapvisible_y / cellsize; j++)
		{
			
			console.log(i + ', ' + j);
			
			var rect = new PIXI.Graphics();
			rect.beginFill(helpers.hexFromNoise(noise.perlin2(game.camera.position.x + i / 100, game.camera.position.y + j / 100)), 1);
			rect.lineStyle(1, 0x000000, 1);
			rect.drawRect(0, 0, cellsize, cellsize);
			rect.endFill();
			
			rect.x = (game.WIDTH / 2 - mapvisible_x / 2) + i * cellsize;
			rect.y =( game.HEIGHT / 2 - mapvisible_y / 2) + j * cellsize;
			game.stage.addChild(rect);
			map1.push(rect);
		}
		world.map.push(map1);
	}
	
	requestAnimationFrame(animate);

	function animate() 
	{
		update();
		game.renderer.render(game.stage);
		requestAnimationFrame(animate);
		game.stats.end();
	}
	
	function update()
	{
		game.stats.begin();
		game.base_time++;
		game.acc_time += 0.01;
	}
	
	var mouseLeftDown = false;
	var mouseMiddleDown = false;
	var mouseRightDown = false;
	
	game.stage.mousedown = function(e)
	{				
		switch(e.originalEvent.which)
		{
			case 1:
				mouseLeftDown = true;
				break;
			case 2:
				mouseMiddleDown = true;
				break;
			case 3:
				mouseRightDown = true;
				break;
			default:
				break;
		}
	};
	
	game.stage.mouseup = function(e)
	{		
		switch(e.originalEvent.which)
		{
			case 1:
				mouseLeftDown = false;
				break;
			case 2:
				mouseMiddleDown = false;
				break;
			case 3:
				mouseRightDown = false;
				break;
			default:
				break;
		}
	};
	
	var lastGridPos = { x: undefined, y: undefined };
	var isEndPlaced = false;
	var isStartPlaced = false;
	
	game.stage.mousemove = function(e)
	{
		var m = e.getLocalPosition(game.stage);
		
		if(mouseLeftDown || mouseMiddleDown || mouseRightDown)
		{
			
		}
	};
	
	$(document).on('keydown', function(e)
	{
		console.log(e.which);
		switch(e.which)
		{
			case 87: //W
				game.camera.position.y -= 1; 
				world.update();
				break;
			case 65: //A
				game.camera.position.x -= 1; 
				world.update();
				break;
			case 83: //S
				game.camera.position.y += 1; 
				world.update();
				break;
			case 68: //D
				game.camera.position.x += 1; 
				world.update();
				break;
			case 38: //UP
				
				break;
			case 37: //DOWN
				
				break;
			case 40: //LEFT
				
				break;
			case 39: //RIGHT
				
				break;
			default:
				break;
		}
	});
});