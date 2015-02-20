$(document).ready(function()
{
	function starTick()
	{
		if(starCount < 30)
		{
			if(canDoStar)
			{
				var s = $('<img class = "star">');
				s.attr('src', 'res/pxl2.png');
				s.css('background-color', '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6));
				
				$(s).css(
				{
					x: Math.floor(Math.random() * $(window).width()) + 1,
					y: 0
				});
				
				stars.push(s);
				$('body').append(s);
				
				starCount++;
				canDoStar = false;
				
				setTimeout(function() { canDoStar = true; }, 600);
			}
		}
		
		for(var i = 0; i < stars.length; i++)
		{
			var x = $(stars[i]).css('x');
			var y = $(stars[i]).css('y');
			
			$(stars[i]).css(
			{
				x: '+=' + 1,
				y: '+=' + 2
			});
			
			if(parseInt($(stars[i]).css('x')) > $(window).width() || 
			parseInt($(stars[i]).css('x')) < 0 ||
			parseInt($(stars[i]).css('y')) > $(window).height() ||
			parseInt($(stars[i]).css('y')) < 0)
			{
				$(stars[i]).remove();
				stars.splice(i, 1);
				starCount--;
				console.log(acc_time);
			}
		}
	}
});