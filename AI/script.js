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
	dir: undefined,
	
	targetList: [],
	obstacleList: [],
	
	draggedObject: undefined
};

$(document).ready(function()
{
	game.GAME_WIDTH = $(window).width();
	game.GAME_HEIGHT = $(window).height();
	
	
	
	game.renderer = new PIXI.autoDetectRenderer(game.GAME_WIDTH, game.GAME_HEIGHT, null, false, true);
	document.body.appendChild(game.renderer.view);
	game.stage = new PIXI.Stage(0x3A3C42, true);
	
	game.stats = new Stats();
	document.body.appendChild(game.stats.domElement);
	game.stats.domElement.style.position = "absolute";
	game.stats.domElement.style.top = "10px";
	game.stats.domElement.style.left = "10px";
	
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
		AI.update();
		UI.update();
	}
	
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
	
	game.main = function()
	{
		this.mousemove();
		this.mousedown();
		this.mouseup();
		
		var circle = new PIXI.Graphics();
		circle.lineStyle(3, 0x000000, 0.7);
		circle.beginFill(0x2ecc71, 0.7);
		circle.drawCircle(0, 0, 20);
		circle.endFill();
		
		circle.x = this.GAME_WIDTH / 2;
		circle.y = this.GAME_HEIGHT / 2;
		this.stage.addChild(circle);
		
		AI.graphicsElement = circle;
	
		AI.destLine = new PIXI.Graphics();
		this.stage.addChild(AI.destLine);
		
		AI.helperVectorA = new PIXI.Graphics();
		this.stage.addChild(AI.helperVectorA);
		
		AI.helperVectorAB = new PIXI.Graphics();
		this.stage.addChild(AI.helperVectorAB);
		
		AI.helperVectorB = new PIXI.Graphics();
		this.stage.addChild(AI.helperVectorB);
		
		AI.helperVectorBC = new PIXI.Graphics();
		this.stage.addChild(AI.helperVectorBC);
		
		AI.helperVectorC = new PIXI.Graphics();
		this.stage.addChild(AI.helperVectorC);
		
		AI.targetLine = new PIXI.Graphics();
		this.stage.addChild(AI.targetLine);
		
		AI.prevTargetLine = new PIXI.Graphics();
		this.stage.addChild(AI.prevTargetLine);
		
		AI.visionCone = new PIXI.Graphics();
		this.stage.addChild(AI.visionCone);
		
		AI.raycast.ray = new PIXI.Graphics();
		this.stage.addChild(AI.raycast.ray);
		
		
		
		AI.state = "default";
		
		UI.debugComponents.bulletCount = new PIXI.Text('Bullets: -', 
		{
			font: '20px Arial',
			fill: '#ecf0f1'
		});
		
		UI.debugComponents.obstacleCount = new PIXI.Text('Obstacles: -',
		{
			font: '20px Arial',
			fill: '#ecf0f1'
		});
		
		UI.debugComponents.targetCount = new PIXI.Text('Targets: -',
		{
			font: '20px Arial',
			fill: '#ecf0f1'
		});
		
		UI.debugComponents.targetsInCone = new PIXI.Text('Targets in vision: -',
		{
			font: '20px Arial',
			fill: '#ecf0f1'
		});
		
		UI.debugComponents.obstaclesInCone = new PIXI.Text('Obstacles in vision: -',
		{
			font: '20px Arial',
			fill: '#ecf0f1'
		});
		
		UI.debugComponents.hasTarget = new PIXI.Text('Has target: -',
		{
			font: '20px Arial',
			fill: '#ecf0f1'
		});
		
		UI.debugComponents.aiState = new PIXI.Text('AI state: -',
		{
			font: '20px Arial',
			fill: '#ecf0f1'
		});
		
		UI.debugComponents.bulletCount.x = 10;
		UI.debugComponents.bulletCount.y = 75;
		
		UI.debugComponents.obstacleCount.x = 10;
		UI.debugComponents.obstacleCount.y = 100;
		
		UI.debugComponents.targetCount.x = 10;
		UI.debugComponents.targetCount.y = 125;
		
		UI.debugComponents.targetsInCone.x = 10;
		UI.debugComponents.targetsInCone.y = 150;
		
		UI.debugComponents.obstaclesInCone.x = 10;
		UI.debugComponents.obstaclesInCone.y = 175;
		
		UI.debugComponents.hasTarget.x = 10;
		UI.debugComponents.hasTarget.y = 200;
		
		UI.debugComponents.aiState.x = 10;
		UI.debugComponents.aiState.y = 225;
		
		this.stage.addChild(UI.debugComponents.bulletCount);
		this.stage.addChild(UI.debugComponents.obstacleCount);
		this.stage.addChild(UI.debugComponents.targetCount);
		this.stage.addChild(UI.debugComponents.targetsInCone);
		this.stage.addChild(UI.debugComponents.obstaclesInCone);
		this.stage.addChild(UI.debugComponents.hasTarget);
		this.stage.addChild(UI.debugComponents.aiState);
		
		
		var obstacle = new PIXI.Graphics();
		obstacle.lineStyle(3, 0x000000, 1);
		obstacle.beginFill(0x7f8c8d, 1);
		obstacle.drawRect(-20, -20, 40, 40);
		obstacle.endFill();
		
		obstacle.x = game.GAME_WIDTH / 3;
		obstacle.y = game.GAME_HEIGHT / 3;
		this.stage.addChild(obstacle);
		this.obstacleList.push(obstacle);
	}
	
	game.main();
	requestAnimationFrame(game.animate);
});

