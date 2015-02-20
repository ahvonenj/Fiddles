$(document).ready(function()
{
	var worm = $('#worm');
	var parts = $(worm).children();
	
	var worm_part_rad = 50;
	
	for(var i = 0; i < parts.length; i++)
	{
		//$(parts[i]).css('background-color', chance.color({format: 'hex'}));
		//$(parts[i]).css('background-color', 'red');
		$(parts[i]).css('background', 'radial-gradient(circle at 17px 17px, ' + chance.color({format: 'hex'}) + ', #000');
		
		$(parts[i]).css('width', worm_part_rad + 'px');
		$(parts[i]).css('height', worm_part_rad + 'px');
		
		$(parts[i]).css('-webkit-border-radius', worm_part_rad + 'px');
		$(parts[i]).css('-moz-border-radius', worm_part_rad + 'px');
		$(parts[i]).css('border-radius', worm_part_rad + 'px');
		
		$(parts[i]).css(
		{
			transformOrigin: worm_part_rad / 2 + 'px ' + worm_part_rad / 2 + 'px'
		});
	}
	
	var lastMouse = 
	{
		x: undefined,
		y: undefined
	};
	
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
			};
			
			transformWorm(deltaMouse.x, deltaMouse.y);
			
			console.log('(' + deltaMouse.x + ', ' + deltaMouse.y + ')');
		}
		else
		{
			for(var i = 0; i < parts.length; i++)
			{
				$(parts[i]).css({ x: e.pageX - worm_part_rad / 2, y: e.pageY - worm_part_rad / 2 });
			}
		}
		
		lastMouse.x = currentMouse.x;
		lastMouse.y = currentMouse.y;
	});
	
	function transformWorm(x, y)
	{		
		var last_x;
		var last_y;
		
		for(var i = 0; i < parts.length; i++)
		{
			
			if(i == 0)
			{	
				last_x = parseFloat($(parts[i]).css('x'));
				last_y = parseFloat($(parts[i]).css('y'));
				$(parts[i]).css({ x: '+=' + x, y: '+=' + y });
			}
			else
			{
				var this_x = parseFloat($(parts[i]).css('x'));
				var this_y = parseFloat($(parts[i]).css('y'));
				
				var delta_x = this_x - last_x;
				var delta_y = this_y - last_y;
				
				if(Math.abs(delta_x) > 0 || Math.abs(delta_y) > 0)
				{
					$(parts[i]).css({ x: last_x, y: last_y });
				}
				
				last_x = this_x;
				last_y = this_y;
				
				console.log(delta_x);
			}
		}
	}
});