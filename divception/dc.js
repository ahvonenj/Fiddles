$(document).ready(function() {
	var last = $('#wrapper');
	for(var i = 0; i < 200; i++) {
		var current = $('<div>');	
		$(current).attr('class', 'cepted');
		$(current).css('background-color', tinycolor.darken($(last).css('background-color'), 0.3).toHexString());
		$(current).css('left', '50%');
		$(current).css('top', '50%');
		$(last).append($(current));	
		last = $(current);
	}
	
	var lastMouse = { x: undefined, y: undefined };
	var moveAmount = 0.005;
	
	$(document).on('mousemove', function(e)
	{
		var currentMouse = 
		{
			x: e.pageX,
			y: e.pageY
		};
		
		if(lastMouse.x != undefined && lastMouse.y != undefined)
		{
			var deltaMouse = 
			{
				x: currentMouse.x - lastMouse.x,
				y: currentMouse.y - lastMouse.y
			}
			
			var parsedMouse = { x: undefined, y: undefined };
			
			if(deltaMouse.x > 0)
				parsedMouse.x = moveAmount;
				
			if(deltaMouse.x < 0)
				parsedMouse.x = -moveAmount;
				
			if(deltaMouse.y > 0)
				parsedMouse.y = moveAmount;
				
			if(deltaMouse.y < 0)
				parsedMouse.y = -moveAmount;
				
			if(deltaMouse.x == 0)
				parsedMouse.x = 0;
				
			if(deltaMouse.y == 0)
				parsedMouse.y = 0;

			var left = $('#wrapper :nth-child(1)')[0].style.left;
			var pLeft = parseFloat(left.substr(0, left.length-1));
			
			var top = $('#wrapper :nth-child(1)')[0].style.top;
			var pTop = parseFloat(top.substr(0, top.length-1));
			console.log(parsedMouse.x);
			
			$('#wrapper :nth-child(1)').css(
			{
				left: (pLeft + parsedMouse.x) + '%',
				top: (pTop + parsedMouse.y) + '%'
			});
		}
		
		lastMouse.x = currentMouse.x;
		lastMouse.y = currentMouse.y;
	});
});

/*$(document).ready(function()
{
	var last = $('#wrapper');
	
	var r = Math.floor(Math.random() * 500);
	
	for(var i = 0; i < 500; i++)
	{
		var current = $('<div>');
		
		$(current).attr('class', 'cepted');
		$(current).css('background-color', tinycolor.darken($(last).css('background-color'), 0.3).toHexString());
		
		/*$(current).css('-webkit-border-radius', $(current).outerWidth() + 'px ' + $(current).outerHeight() + 'px');
		$(current).css('-moz-border-radius', $(current).outerWidth() + 'px ' + $(current).outerHeight() + 'px');
		$(current).css('border-radius', $(current).outerWidth() + 'px ' + $(current).outerHeight() + 'px');
		
		$(last).append($(current));	
		
		/*if(i == r)
		{
			var i = $('<img>');
			$(i).attr('src', 'corg.png');
			$(i).attr('id', 'corg');
			$(current).append($(i));
		}
		
		last = $(current);
	}
	
	/*console.log(parseInt($('#corg').css('width')));
	$('#corg').css('width', parseInt($('#corg').css('width')) / parseInt($('#corg').parent().css('width')) + '%');
});*/