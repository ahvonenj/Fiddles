<!doctype html>
<html>
	<head>
		<title>Clone</title>
		<style>
			*, html, body
			{
				margin: 0;
				padding: 0;
			}
			
			*
			{
				font-family: Arial;
			}
			
			body
			{
				overflow: hidden;
			}
			
			.clone
			{
				width: 25px;
				height: 25px;
				background-color: #95a5a6;
				position: absolute;
				-webkit-transition: translate3d(0,0,0);
			}
			
			.clone:hover
			{
				border: 2px solid #f1c40f;
				z-index: 9001;		
				-webkit-transform: scale(1.25); 
				-ms-transform: scale(1.25); 
				transform: scale(1.25);
			}
		</style>
		<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
		<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
		<script src="http://ricostacruz.com/jquery.transit/jquery.transit.min.js"></script>
		<script src="tinycolor.js"></script>
		<script>
			$(document).ready(function()
			{
				var interval = setInterval(step, 150);
				
				function step()
				{
					var old = $('body div:last-child');	
					
					var clone = $(old).clone();
					
					$(clone).addClass('clone');
					
					var oldX = $(old).position().left;
					var oldY = $(old).position().top;
					var newX = oldX + 25;
					var newY = oldY;
					var oldC = $(old).css('background-color');
					var newC = tinycolor(oldC).spin(doMath()).toString();
					
					
					
					if(oldX > $(window).width())
					{
						newY += 25;
						newX = 0;
					}
					else
					{
						newY = oldY;
					}
					
					//console.log('wX: ' + $(window).width() + '\nwY: ' + $(window).height() + '\n' +
					//'old: ' + oldX + ', ' + oldY + '\nnew: ' + newX + ', ' + newY);
					
					if(newX >= $(window).width() && newY >= $(window).height())
					{
						$('body div').remove();
						newX = 0;
						newY = 0;
					}
					
					
					
					$(clone).appendTo('body');
					
					$(clone).css(
					{
						'left': newX + 'px',
						'top': newY + 'px',
						'background-color': newC
					});
				}
			});
			
			var d = new Date();
			
			var doMath = function()
			{
				return Math.sqrt(2) * 360;
			};
		</script>
	</head>
	<body>
		<div class = "clone" id = "clone"></div>
	</body>
</html>