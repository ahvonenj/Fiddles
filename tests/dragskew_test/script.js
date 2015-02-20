$(document).ready(function()
{
	
	//$('#object').draggable();
	
	var isDown = false;
	var lastX = 6666666;
	var lastY = 6666666;
	var curX;
	var curY;
	var dX;
	var dY;
	
	var deltaMax = 15;
	
	$('#object').on('mousedown', function(e)
	{
		e.preventDefault();
		isDown = true;
		lastX = e.pageX;
		lastY = e.pageY;
	});
	
	$(document).on('mouseup', function(e)
	{
		isDown = false;
		
		$('#object').transition(
		{
			skewX: 0,
			skewY: 0,
			duration: 200
		});
	});
	
	$('#object').on('mouseup', function(e)
	{
		isDown = false;
		
		$('#object').transition(
		{
			skewX: 0,
			skewY: 0,
			duration: 200
		});
	});
	
	var negativeX = false;
	var negativeY = false;
	
	$(document).on('mousemove', function(e)
	{		
		if(isDown)
		{
			curX = e.pageX;
			curY = e.pageY;
			
			dX = lastX - curX;
			dY = lastY - curY;
			lastX = curX;
			lastY = curY;
			
			console.log('DX: ' + dX + ', DY: ' + dY);
			if(dX > deltaMax)
			{
				dX = deltaMax;
			}
			
			if(dX < -deltaMax)
			{
				dX = -deltaMax;
			}
			
			if(dY > deltaMax)
			{
				dY = deltaMax;
			}
			
			if(dY < -deltaMax)
			{
				dY = -deltaMax;
			}
			
			if(dX < 0)
			{
				negativeX = true;
			}
			else
			{
				negativeX = false;
			}
			
			if(dY < 0)
			{
				negativeY = true;
			}
			else
			{
				negativeY = false;
			}
			
			/*
			$('#object').css(
			{ 
				skewX: dX
			});
			*/
			
			$('#object').css(
			{ 
				width: $('#object').outerWidth() + dX * 1.75 * -1,
				height: $('#object').outerHeight() + dY * 1.75 * -1
			});
			
			/*
			if(negativeX && negativeY)
			{
				$('#object').css(
				{ 
					skewX: -dX,
					skewY: -dY
				});
			}
			else if(negativeX)
			{
				$('#object').css(
				{ 
					skewX: dX,
					skewY: -dY
				});
			}
			else if(negativeY)
			{
				$('#object').css(
				{ 
					skewX: -dX,
					skewY: dY
				});
			}
			else
			{
				$('#object').css(
				{ 
					skewX: dX,
					skewY: dY
				});
			}
			*/
		}
	});
	
	$('#closebutton').on('click', function(e)
	{
		var w = $('#object').outerWidth();
		var h = $('#object').outerHeight();
		
		$('#object').css(
		{
			transformOrigin: w + 'px 0px'
		});
		
		$('#object').transition(
		{
			opacity: 0,
			scale: 0,
			duration: 500
		});
	});	
	
	$(document).on('keypress', function(e)
	{

		if(e.which == 82 || e.which == 114)
		{
			$('#object').transition(
			{
				opacity: 1,
				scale: 1,
				duration: 500
			});
		}
	});
	
});