$(document).ready(function()
{
	var cube = $('#cube');
	var sides = $(cube).children();
	
	$.Velocity.defaults.duration = 0;

	$(sides[0]).velocity({ translateZ: 50 });
	$(sides[1]).velocity({ translateZ: 50 });
	$(sides[2]).velocity({ translateZ: 50 });
	$(sides[3]).velocity({ translateZ: 50 });
	$(sides[4]).velocity({ translateZ: 50 });
	$(sides[5]).velocity({ translateZ: 50 });
	
	$(sides[0]).velocity({ rotateX: 0 });
	$(sides[1]).velocity({ rotateY: 90 });
	$(sides[2]).velocity({ rotateY: 180 });
	$(sides[3]).velocity({ rotateY: -90 });
	$(sides[4]).velocity({ rotateX: 90 });
	$(sides[5]).velocity({ rotateX: -90 });
	
	$(sides[0]).velocity({ translateX: 0, translateY: 0, translateZ: 0 });
	$(sides[1]).velocity({ translateX: 50, translateY: 0, translateZ: 0 });
	$(sides[2]).velocity({ translateX: 0, translateY: 0, translateZ: 0 });
	$(sides[3]).velocity({ translateX: -50, translateY: 0, translateZ: 0 });
	$(sides[4]).velocity({ translateX: 0, translateY: -50, translateZ: 0 });
	$(sides[5]).velocity({ translateX: 0, translateY: 50, translateZ: 0 });
	
	
	
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
			
			transformCube(deltaMouse.x, deltaMouse.y);
			
			console.log('(' + deltaMouse.x + ', ' + deltaMouse.y + ')');
		}
		
		lastMouse.x = currentMouse.x;
		lastMouse.y = currentMouse.y;
	});
	
	function transformCube(y, x)
	{
		/*
			$(sides[0]).velocity({ rotateX: 0 });
			$(sides[1]).velocity({ rotateY: 90 });
			$(sides[2]).velocity({ rotateY: 180 });
			$(sides[3]).velocity({ rotateY: -90 });
			$(sides[4]).velocity({ rotateX: 90 });
			$(sides[5]).velocity({ rotateX: -90 });
		*/
		
		$(sides[0]).velocity({ rotateX: '+=' + x, rotateY: '+=' + y });
		$(sides[1]).velocity({ rotateX: '+=' + x, rotateY: '+=' + y });
		$(sides[2]).velocity({ rotateX: '+=' + x, rotateY: '+=' + y });
		$(sides[3]).velocity({ rotateX: '+=' + x, rotateY: '+=' + y });
		$(sides[4]).velocity({ rotateX: '+=' + x, rotateY: '+=' + y });
		$(sides[5]).velocity({ rotateX: '+=' + x, rotateY: '+=' + y });
		
		$(sides[0]).velocity({ translateZ: 50 });
	$(sides[1]).velocity({ translateZ: 50 });
	/*$(sides[2]).velocity({ translateZ: 50 });
	$(sides[3]).velocity({ translateZ: 50 });
	$(sides[4]).velocity({ translateZ: 50 });
	$(sides[5]).velocity({ translateZ: 50 });*/
	}
});