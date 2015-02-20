var main_loop;
var base_time = 0;
var acc_time = 0;
var stats;
var GAME_WIDTH;
var GAME_HEIGHT;

$(document).ready(function()
{
	window.oncontextmenu = function() 
	{
		return false;
	};
	
	GAME_WIDTH = $(window).width();
	GAME_HEIGHT = $(window).height();
	
	var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);
	document.body.appendChild(renderer.view);

	var stage = new PIXI.Stage(0xFFFFFF);
	
	stats = new Stats();
	document.body.appendChild( stats.domElement );
	stats.domElement.style.position = "absolute";
	stats.domElement.style.top = "15px";
	stats.domElement.style.left = "15px";
	
	
	var g = new PIXI.Graphics();
	g.lineStyle(3, 0x000000, 1);
	g.beginFill(0x000000, 1);
	
	var p = { x: 25, y: GAME_HEIGHT / 2 };
	var r = 1;
	var lolT = 0;
	
	for(var i = 0; i < 100; i++)
	{
		g.beginFill(0x000000, chance.floating({min: 0.1, max: 1.0}));
		g.drawCircle(p.x, p.y + Math.sin(lolT) * 10, r);
		p.x += r * 2 * 1.25;
		r += 0.2;
		lolT += 0.01;
		console.log(p.y + Math.sin(acc_time) * 10000);
	}
	
	g.endFill();
	stage.addChild(g);
	
	
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
		base_time++;
		acc_time += 0.01;
	}
});