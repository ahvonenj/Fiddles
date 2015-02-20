var keysDown = [];
var main_loop;
var base_time = 0;
var acc_time = 0;
var stats;
var GAME_WIDTH;
var GAME_HEIGHT;

$(document).ready(function()
{
	/*************************************************************************************************************
	GAME INITALIZATION
	*************************************************************************************************************/
	
	GAME_WIDTH = $(window).width();
	GAME_HEIGHT = $(window).height();
	
    var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);

    document.body.appendChild(renderer.view);

    var stage = new PIXI.Stage;

    var bunnyTexture = PIXI.Texture.fromImage("res/doge.png");
    var bunny = new PIXI.Sprite(bunnyTexture);

    bunny.position.x = 600;
    bunny.position.y = 600;

    bunny.scale.x = 0.5;
    bunny.scale.y = 0.5;

    stage.addChild(bunny);
	
	stats = new Stats();
	
	
	document.body.appendChild( stats.domElement );
	stats.domElement.style.position = "absolute";
	stats.domElement.style.top = "0px";
	
	var counter = document.createElement("div");
	counter.className = "counter";
	$(counter).css('color', 'white');
	$(counter).css('position', 'absolute');
	$(counter).css('left', '0px');
	$(counter).css('top', '100px');
	document.body.appendChild(counter);

    requestAnimationFrame(animate);

    function animate() 
	{
		update();
        renderer.render(stage);
        requestAnimationFrame(animate);
		stats.end();
    }
	
	var doge_count = 0;
	var dogelist = [];
	
	function update()
	{
		stats.begin();
		base_time++;
		acc_time += 0.01;
		
		bunny.rotation = Math.sin(acc_time) * Math.cos(acc_time*Math.PI/180);
		bunny.scale.x = Math.sin(acc_time) * 2;
		bunny.scale.y = Math.cos(acc_time) * 2;
		
		var xt = PIXI.Texture.fromImage("res/doge.png");
		
		for(var i = 0; i < 100; i++)
		{
			var x = new PIXI.Sprite(bunnyTexture);

			x.position.x = chance.integer({min: 0, max: GAME_WIDTH});
			x.position.y = chance.integer({min: 0, max: GAME_HEIGHT});

			x.scale.x = 0.1;
			x.scale.y = 0.1;
			
			dogelist.push(x);
			stage.addChild(x);
			doge_count++;
			counter.innerHTML = doge_count;
		}
		
		for(var i = 0; i < dogelist.length; i++)
		{
			dogelist[i].position.x += Math.sin(acc_time) * chance.integer({min: -10, max: 10});
			dogelist[i].position.y += Math.cos(acc_time) * chance.integer({min: -10, max: 10});
		}
	}
	
});