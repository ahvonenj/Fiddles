var keysDown = [];
var main_loop;
var base_time = 0;
var acc_time = 0;

$(document).ready(function()
{
	/*************************************************************************************************************
	GAME INITALIZATION
	*************************************************************************************************************/
	
	var toPreload = [];
	
	for(var i = 3; i <= 13; i++)
	{
		toPreload.push('res/meteor' + i + '.png');
	}
	
	preload(toPreload);
	
	evaluateSettings();
	buildResourcesList();
	
	var base_time_interval = setInterval(function() { base_time++; acc_time += 0.01 }, 1);
	
	main_loop = setInterval(function()
	{
		if(getSetting('stars').value && !starInterval)
		{
			starInterval = setInterval(starTick, 30);
			canDoStar = true;
		}
		
		if(particles.length > 0)
		{
			for(var i = 0; i < particles.length; i++)
			{
				var da = 
				{
					x: parseInt($(particles[i][0]).css('x')),
					y: parseInt($(particles[i][0]).css('y'))
				}
				
				var db = 
				{
					x: mouseX,
					y: mouseY
				}
				
				if(dist(da, db) < 5)
				{
					$(particles[i][0]).fadeOut(200, function() { /*$(particles[i][0]).remove();*/ });
					particles.splice(i, 1);
					addRandomResource([0, 1, 2]);
				}
				else if(dist(da, db) < 150)
				{
					$(particles[i][0]).css(
					{
						x: '+=' + Math.cos(dir(da, db)*Math.PI/180) * 3 * Math.random(),
						y: '+=' + Math.sin(dir(da, db)*Math.PI/180) * 3 * Math.random()
					});
				}
				else
				{
					/*$(particles[i][0]).css(
					{
						x: '+=' + Math.sin(acc_time) * particles[i][1] * Math.random() * 3 + Math.cos(Math.random()) * 5,
						y: '+=' + Math.cos(acc_time) * particles[i][2] * Math.random() * 3 + Math.sin(Math.random()) * 5
					});*/
					$(particles[i][0]).css(
					{
						x: '+=' + Math.sin(acc_time * Math.random() / 4) * particles[i][1],
						y: '+=' + Math.cos(acc_time * Math.random() / 4) * particles[i][2]
					});
				}
			}
			
			if(particles.length > max_particles)
			{
				for(var i = 0; i < 5; i++)
				{
					$(particles[i][0]).fadeOut(500, function() { $(particles[i][0]).remove(); });
					
				}
				particles.splice(0, 5);
			}
		}
		
		for(var i = 0; i < stars.length; i++)
		{
			$(stars[i][0]).css({ rotate: '+=' + stars[i][1] + 'deg' });
		}
	}, 30);

	/*************************************************************************************************************
	STAR
	*************************************************************************************************************/
	
	var starCount = 0;
	var stars = [];
	var starInterval = setInterval(starTick, 30);
	var canDoStar = true;
	var starUrl = 'res/pxl2.png'
	var starSize = 3;
		
	function starTick()
	{
		if(starCount < 30)
		{
			if(canDoStar)
			{
				starSize = parseInt(Math.floor(Math.random() * 11) + 3);
				
				var s = $('<img class = "star">');
				s.attr('src', 'res/meteor' + starSize + '.png');
				
				if(!eeTriggered)
					//s.css('background-color', '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6));
					
				
					
				s.css('width', 'auto');
				s.css('height', 'auto');
				
				s.css('-webkit-border-radius', starSize + 'px');
				s.css('-moz-border-radius', starSize + 'px');
				s.css('border-radius', starSize + 'px');
				
				var rD = chance.integer({min: 0, max: 3});
				var mD = { x: 0, y: 0 };
				
				if(rD == 0)
				{
					$(s).css(
					{
						x: -125,
						y: Math.floor(Math.random() * $(window).height()) + 1
					});
					
					mD.x = Math.floor(Math.random() * 2) + 1;
					mD.y = Math.random() < 0.5 ? -1 : 1;
				}
				else if(rD == 1)
				{
					$(s).css(
					{
						x: Math.floor(Math.random() * $(window).width()) + 1,
						y: -125
					});
					
					mD.x = Math.random() < 0.5 ? -1 : 1;
					mD.y = Math.floor(Math.random() * 2) + 1;;
				}
				else if(rD == 2)
				{
					$(s).css(
					{
						x: $(window).width() + 125,
						y: Math.floor(Math.random() * $(window).height()) + 1
					});
					
					mD.x = -1 * Math.floor(Math.random() * 2) + 1;
					mD.y = Math.random() < 0.5 ? -1 : 1;
				}
				else if(rD == 3)
				{
					$(s).css(
					{
						x: Math.floor(Math.random() * $(window).width()) + 1,
						y: $(window).height() + 125
					});
					
					mD.x = Math.random() < 0.5 ? -1 : 1;
					mD.y = -1 * Math.floor(Math.random() * 2) + 1;
				}
				
				stars.push([s, Math.random() < 0.5 ? -1 : 1, mD]);
				$('body').append(s);
				
				starCount++;
				canDoStar = false;
				
				setTimeout(function() { canDoStar = true; }, 1000);
			}
		}
		
		for(var i = 0; i < stars.length; i++)
		{
			var x = $(stars[i][0]).css('x');
			var y = $(stars[i][0]).css('y');
			
			$(stars[i][0]).css(
			{
				x: '+=' + stars[i][2].x,
				y: '+=' + stars[i][2].y
			});
			
			if(parseInt($(stars[i][0]).css('x')) > $(window).width() + 150 || 
			parseInt($(stars[i][0]).css('x')) < -150 ||
			parseInt($(stars[i][0]).css('y')) > $(window).height() + 150 ||
			parseInt($(stars[i][0]).css('y')) < -150)
			{
				$(stars[i][0]).remove();
				stars.splice(i, 1);
				starCount--;
				console.log(acc_time);
			}
		}
		
		if(!getSetting('stars').value)
		{
			clearTimeout(starInterval);
			starInterval = false;
			
			for(var i = 0; i < stars.length; i++)
			{
				$(stars[i][0]).remove();
			}
			
			starCount = 0;
			stars = [];
		}
	}
	
	/*************************************************************************************************************
	UI INITALIZATION
	*************************************************************************************************************/
	
	setTimeout(function()
	{
	
		$('#wrapper').css({ scale: [0, 0] });
		$('#wrapper').css('visibility', 'visible');
		//$('#wrapper').css({ transformOrigin: '0px 0px' });
		$('#wrapper').transition(
		{ 
			scale: [1, 1], 
			duration: 500,
			complete: function()
			{
				$('#banner').css({ scale: [0, 1] });
				$('#banner').css('visibility', 'visible');
				$('#banner').css({ transformOrigin: '0px 25px' });
				
				$('#banner').transition(
				{ 
					scale: [1, 1], 
					duration: 500,
					complete: function()
					{
						$('#bannertext').fadeIn(
						{ 
							complete: function()
							{							
								makeWindowGroup($('.window'), 150);
								
								setTimeout(function() { makeIconGroup($('.desktop_icon'), 150) }, 1000);
							} 
						});				
					}
				});
			}
		});
	}, 300);
	
	//$('.banner_options_icon').makeFlippable();
	
	/*************************************************************************************************************
	KEYBINDS (mostly)
	*************************************************************************************************************/
	
	var keyArray = [];
	var konamiArray = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
	var eeTriggered = false;
	
	$(document).on('keydown', function(e)
	{
		keyArray.push(e.which);
		
		if(keyArray.length >= 11)
			keyArray.splice(0, 1);
		
		if(arraysSame(keyArray, konamiArray) && !eeTriggered)
		{
			eeTriggered = true;
			starUrl = 'res/doge.png'	
			starSize = 25;
		}
		
		if(keysDown.indexOf(e.which) == -1)
			keysDown.push(e.which);
	});
	
	$(document).on('keyup', function(e)
	{
		for(var i = 0; i < keysDown.length; i++)
		{
			if(keysDown[i] == e.which)
				keysDown.splice(i, 1);
		}
	});
	
	var particles = [];
	var particles_per_star = 6;
	var max_particles = 125;
	
	$(document).on('click', function(e)
	{
		
		for(var i = 0; i < stars.length; i++)
		{
			if(parseInt($(stars[i][0]).css('x')) <= (e.pageX + $(stars[i][0]).outerWidth()) &&
			parseInt($(stars[i][0]).css('x')) >= (e.pageX - $(stars[i][0]).outerWidth()) &&
			parseInt($(stars[i][0]).css('y')) <= (e.pageY + $(stars[i][0]).outerHeight()) &&
			parseInt($(stars[i][0]).css('y')) >= (e.pageY - $(stars[i][0]).outerHeight()))
			{
				for(var j = 0; j < Math.round(Math.min($(stars[i][0]).outerWidth(), $(stars[i][0]).outerHeight())); j++)
				{
					var s = $('<img class = "particle">');
					s.attr('src', starUrl);	
					s.css('background-color', '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6));
						
					var size = Math.floor(Math.random() * 5) + 2;
						
					s.css('width', size + 'px');
					s.css('height', size + 'px');
					
					s.css('-webkit-border-radius', size + 'px');
					s.css('-moz-border-radius', size + 'px');
					s.css('border-radius', size + 'px');
					
					$(s).css(
					{
						x: $(stars[i][0]).css('x'),
						y: $(stars[i][0]).css('y')
					});
					
					particles.push([s, Math.random() < 0.5 ? -1 : 1, Math.random() < 0.5 ? -1 : 1]);
					$('body').append(s);
				}
				
				$(stars[i][0]).remove();
				stars.splice(i, 1);
				starCount--;
			}
		}
	});
	
	var mouseX = 0;
	var mouseY = 0;
	
	$(document).on('mousemove', function(e)
	{
		mouseX = e.pageX;
		mouseY = e.pageY;
	});
	
	/*$('.banner_options_icon').on('click', function()
	{
		var window = GW('window_settings');
		
		if(!window.isOpen && !window.isAnimating)
		{
			window.isAnimating = true;
			
			$(window.e).css({ transformOrigin: $(window.e).outerWidth() + 'px 0px' });
			
			$(window.e).transition(
			{ 
				scale: [1, 1], 
				duration: 500,
				complete: function() 
				{ 
					window.isOpen = true;
					window.isAnimating = false;
				}
			});
			
			$(this).css({ transformOrigin: $(this).outerWidth() / 2 + 'px ' + $(this).outerHeight() / 2 + 'px' });
			$(this).css({ scale: [0.9, 0.9] });
			
			var ths = $(this);
			
			setTimeout(function() 
			{
				$(ths).css({ scale: [1, 1] });
			}, 100);
		}
	});*/
	
	/*************************************************************************************************************
	EXTRA HELPERS
	*************************************************************************************************************/	

	function arraysSame(A, B)
	{
		if(A.length != B.length)
		{
			return false;
		}
		else
		{
			var isSame = false;
			
			for(var i = 0; i < A.length; i++)
			{
				if(A[i] == B[i])
				{
					isSame = true;
					continue;
				}
				else
				{
					isSame = false;
					break;
				}
			}
			
			return isSame;
		}
	}
});