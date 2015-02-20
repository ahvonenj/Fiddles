var keysDown = [];
var main_loop;
var base_time = 0;
var acc_time = 0;
var stats;
var GAME_WIDTH;
var GAME_HEIGHT;

var timer;

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
	cursor.lineStyle(0, 0x27AE60, 1);
	cursor.beginFill(0x27AE60, 1);
	cursor.drawCircle(0, 0, 150);
	cursor.endFill();
	stage.addChild(cursor);
	
	stage.defaultCursor = 'none';
	
	var ball = new PIXI.Graphics();
	ball.lineStyle(0, 0x27AE60, 1);
	ball.beginFill(0x27AE60, 1);
	ball.drawCircle(0, 0, 150);
	ball.x = GAME_WIDTH / 2;
	ball.y = GAME_HEIGHT / 2;
	ball.endFill();
	stage.addChild(ball);
	
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
		for(var i = 0; i < lines.length; i++)
		{
			stage.removeChild(lines[i]);
			lines.splice(i, 1);
		}
		
		if(mouse != undefined)
		{
			cursor.x = mouse.x;
			cursor.y = ball.y;
			
			var dst = dist(
			{
				x: mouse.x,
				y: mouse.y
			},
			{
				x: ball.x,
				y: ball.y
			});
			
			
			var dr = dir(
			{
				x: mouse.x,
				y: mouse.y
			},
			{
				x: ball.x,
				y: ball.y
			});
			
			//console.log(Math.sin(dr * Math.PI / 180));
			
			
			//0x27AE60
			//0x000000
			
			var waveA =
			{
				width: 6,
				color: 0x27AE60,
				alpha: 1,
				fill: 0x27AE60,
				fillAlpha: 1
			};
			
			var waveB =
			{
				width: 6,
				color: 0x27AE60,
				alpha: 1,
				fill: 0x27AE60,
				fillAlpha: 1
			};
			
			var mdl =
			{
				width: 6,
				color: 0x27AE60,
				alpha: 1,
				fill: 0x27AE60,
				fillAlpha: 1
			};
			
			var metaWidth = 6.5;
			var step = 6;
			
			var angleA = 0;
			var angleB = Math.PI;
			var k = (Math.PI * step / (Math.max(ball.x, mouse.x) - Math.min(ball.x, mouse.x)));
			
			var pad = 140;
			
			for(var i = Math.min(ball.x, mouse.x); i < Math.max(ball.x, mouse.x); i += step)
			{
				var distancedMetaWidth = dst / metaWidth;
				
				if(distancedMetaWidth < 136)
				{
					angleA += k;
					angleB += k;
					
					var sineA = new PIXI.Graphics();
					sineA.lineStyle(waveA.width, waveA.color, waveA.alpha);
					sineA.moveTo(i, ball.y - pad + Math.sin(angleA) * distancedMetaWidth);
					sineA.beginFill(waveA.fill, waveA.fillAlpha);
					sineA.lineTo(i, cursor.y - pad + Math.sin(angleA) * distancedMetaWidth);
					sineA.endFill();
					lines.push(sineA);
					stage.addChild(sineA);
					
					var sineB = new PIXI.Graphics();
					sineB.lineStyle(waveB.width, waveB.color, waveB.alpha);
					sineB.moveTo(i, ball.y + pad + Math.sin(angleB) * distancedMetaWidth);
					sineB.beginFill(waveB.fill, waveB.fillAlpha);
					sineB.lineTo(i, cursor.y + pad + Math.sin(angleB) * distancedMetaWidth);
					sineB.endFill();
					lines.push(sineB);
					stage.addChild(sineB);
					
					var middle = new PIXI.Graphics();
					middle.lineStyle(mdl.width, mdl.color, mdl.alpha);
					middle.moveTo(i, ball.y - pad + Math.sin(angleA) * distancedMetaWidth);
					middle.beginFill(mdl.fill, mdl.fillAlpha);
					middle.lineTo(i, cursor.y + pad + Math.sin(angleB) * distancedMetaWidth);
					middle.endFill();
					lines.push(middle);
					stage.addChild(middle);
				}
			}
		}
	}
	
	var lines = [];
	var mouse;
	
	stage.mousemove = function(e)
	{
		mouse = 
		{
			x: e.global.x,
			y: e.global.y
		};
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