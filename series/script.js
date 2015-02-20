var keysDown = [];
var main_loop;
var base_time = 0;
var acc_time = 0;
var stats;
var GAME_WIDTH;
var GAME_HEIGHT;

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
	var prev = { x: undefined, y: undefined };

	spawnBall();
	spawnTimer = setInterval(spawnBall, 100);
	
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
			var o = ballList[i];
		}
	}
	
	function spawnBall()
	{
		var ball = new PIXI.Graphics();
		ball.lineStyle(2, 0x000000, 1);
		ball.beginFill(0x3498DB, 1);
		
		var n = { x: r(-15, 15), y: r(-15, 15) };
		
		if(prev.x != undefined && prev.y != undefined)
		{
			ball.moveTo(prev.x, prev.y);
			ball.lineTo(prev.x + n.x, prev.y + n.y);
			
			prev.x = prev.x + n.x;
			prev.y = prev.y + n.y;
		}
		else
		{
			ball.moveTo(GAME_WIDTH / 2, GAME_HEIGHT / 2);
			ball.lineTo(GAME_WIDTH / 2 + n.x, GAME_HEIGHT / 2 + n.y);
			
			prev.x = GAME_WIDTH / 2 + n.x;
			prev.y = GAME_HEIGHT / 2 + n.y;
		}

		ball.endFill();
		ball.pivot.x = 0.5;
		ball.pivot.y = 0.5;
		ballList.push(ball);
		stage.addChild(ball);
	}
	
	function r(min, max)
	{
		return chance.floating({ min: min, max: max });
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