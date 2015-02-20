$(document).ready(function()
{
	var ball = $('#ball');
	var source = $('#source');
	
	var rad = 250;
	
	source.draggable(
	{
		drag: function(e, u)
		{
			var dst = dist(
			{
				x: e.pageX,
				y: e.pageY
			},
			{
				x: (ball.offset().left + rad / 2),
				y: (ball.offset().top + rad / 2)
			});
			
			var dr = dir(
			{
				x: e.pageX,
				y: e.pageY
			},
			{
				x: (ball.offset().left + rad / 2),
				y: (ball.offset().top + rad / 2)
			});
			
			console.log(((dr - 90)));
			
			$(ball).css('background', 'radial-gradient(circle at ' + rad / Math.sin(((dr + 270) * Math.PI/180)) + 'px ' + rad / Math.cos(((dr + 270) * Math.PI/180)) + 'px, ' + 'red' + ', #000');
		}
	});
	
	$(ball).css('background', 'radial-gradient(circle at ' + rad/3 + 'px ' + rad/3 + 'px, ' + 'red' + ', #000');
		
	$(ball).css('width', rad + 'px');
	$(ball).css('height', rad + 'px');
	
	$(ball).css('top', '500px');
	$(ball).css('left', '500px');
	
	$(ball).css('-webkit-border-radius', rad + 'px');
	$(ball).css('-moz-border-radius', rad + 'px');
	$(ball).css('border-radius', rad + 'px');
	
	
	
	
	
	function dist(a, b)
	{
		return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	}

	function dir(a, b)
	{
		return Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
	}
});