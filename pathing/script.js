var game = 
{
	keysDown: [],
	main_loop: undefined,
	base_time: 0,
	acc_time: 0,
	GAME_WIDTH: undefined,
	GAME_HEIGHT: undefined,

	renderer: undefined,
	stage: undefined,
	circleList: [],
	lineList: [],
	stats: undefined,
	timer: undefined,
	g_mouse: undefined,
	
	animate: undefined,
	update: undefined,
	
	mouseup: undefined,
	mousedown: undefined,
	mousemove: undefined,
	
	r: undefined,
	dist: undefined,
	dir: undefined
};

$(document).ready(function()
{
	game.GAME_WIDTH = $(window).width();
	game.GAME_HEIGHT = $(window).height();
	
	
	
	game.renderer = new PIXI.autoDetectRenderer(game.GAME_WIDTH, game.GAME_HEIGHT, null, false, true);
	document.body.appendChild(game.renderer.view);
	game.stage = new PIXI.Stage(0x3A3C42, true);
	
	game.ballList = [];
	
	game.stats = new Stats();
	document.body.appendChild(game.stats.domElement);
	game.stats.domElement.style.position = "absolute";
	game.stats.domElement.style.top = "0px";
	
	game.timer = setInterval(function() 
	{ 
		game.base_time += 100 
	}, 100);
	
	game.g_mouse = 
	{
		x: undefined,
		y: undefined,
		isLeftDown: false,
		isMiddleDown: false,
		isRightDown: false
	};
	
	game.animate = function()
	{
		game.update();
		game.renderer.render(game.stage);
		requestAnimationFrame(game.animate);
		game.stats.end();
	}
	
	game.update = function()
	{
		game.stats.begin();
	}
	
	requestAnimationFrame(game.animate);

	
	
	game.mouseup = function(e)
	{
		var o_game = this;
		
		this.stage.mouseup = function(e)
		{
			e.originalEvent.preventDefault();
			
			switch(e.originalEvent.which)
			{
				case 1:
					o_game.isLeftDown = false;
					o_game.mouseLeftUp(e);
					break;
				case 2:
					o_game.isMiddleDown = false;
					o_game.mouseMiddleUp(e);
					break;
				case 3:
					o_game.isRightDown = false;
					o_game.mouseRightUp(e);
					break;
			}	
		};
	};
	
	game.mousedown = function(e)
	{
		var o_game = this;
		
		this.stage.mousedown = function(e)
		{
			e.originalEvent.preventDefault();
			
			switch(e.originalEvent.which)
			{
				case 1:
					o_game.isLeftDown = true;
					o_game.mouseLeftDown(e);
					break;
				case 2:
					o_game.isMiddleDown = true;
					o_game.mouseMiddleDown(e);
					break;
				case 3:
					o_game.isRightDown = true;
					o_game.mouseRightDown(e);
					break;
			}
		}
	};
	
	game.mousemove = function(e)
	{
		var o_game = this;
		
		this.stage.mousemove = function(e)
		{
			e.originalEvent.preventDefault();
			
			o_game.g_mouse.x = e.global.x;
			o_game.g_mouse.y = e.global.y;
			
			o_game.mouseMoved(e);
		};
	};
	
	game.r = function(min, max)
	{
		return chance.floating({ min: min, max: max });
	}
	
	game.dist = function(a, b)
	{
		return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	}

	game.dir = function(a, b)
	{
		return Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
	}
	
	game.main = function()
	{
		this.mousemove();
		this.mousedown();
		this.mouseup();
	}
	
	game.main();
});

