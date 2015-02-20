<!doctype html>
<html>
	<head>
		<title>GN</title>
		<style>
			*, html, body
			{
				margin: 0;
				padding: 0;
			}
			
			body
			{
				background-color: #ecf0f1;
				font-family: Tahoma, Arial;
			}
			
			#wrapper
			{
				margin-top: 10vh;
				margin-left: auto;
				margin-right: auto;
				background-color: #bdc3c7; 
				
				width: 80vw;
				height: 80vh;
			}
			
			#menu
			{
				width: 80%;
				height: 80%;
				position: relative;
				left: 10%;
				top: 10%;
				color: white;
			}
			
			#menu_table
			{
				width: 100%;
				height: 100%;
				table-layout: fixed;
				text-align: center;
				font-size: 80pt;
				border-spacing: 30px;
				border-collapse: separate;
			}
			
			#menu_table td
			{
				border: 1px solid black;
				-webkit-box-shadow: 10px 10px 0px 0px rgba(0,0,0,0.1);
				-moz-box-shadow: 10px 10px 0px 0px rgba(0,0,0,0.1);
				box-shadow: 10px 10px 0px 0px rgba(0,0,0,0.1);
			}
			
			#program
			{
				width: 100%;
				height: 100%;
				color: white;
				display: table;
			}
			
			#number
			{
				width: 100%;
				height: 100%;
				text-align: center;
				font-size: 126pt;
				display: table-cell;
				vertical-align: middle;
			}
		</style>
		<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
		<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
		<script src="chance.min.js"></script>
		
		<script>
			$(document).ready(function()
			{
				$('#program').hide();
				$('#menu').show();
			
				var g_program_mode = null;
				var running = false;
				
				$(document).on('click', '#menu_select_t', function()
				{
					g_program_mode = 'teach';
					$('#menu').hide();
					$('#program').fadeIn('fast');
					run();
				});
				
				$(document).on('click', '#menu_select_r', function()
				{
					g_program_mode = 'recognize';
					$('#menu').hide();
					$('#program').fadeIn('fast');
					run();
				});
				
				$(document).keydown(function(e) 
				{
					if(running)
					{
						switch(e.keyCode)
						{
							case 32:
								console.log('spc');
								console.log(range_distribution);
								break;
							case 37:
								console.log('<-');
								//range_distribution[current_number] = (range_distribution[current_number] > 0) ? range_distribution[current_number]-- : range_distribution[current_number];
								range_distribution[current_number]--;
								step();
								break;
							case 39:
								console.log('->');
								range_distribution[current_number]++;
								step();
								break;
							default: 
								break;
						}
					}
					else
					{
						console.log('Not running, keystrokes ignored');
					}
				});
				
				
				var range_min = 1;
				var range_max = 25;
				var range = range_max - range_min;
				var range_distribution = [];
				var current_number = null;
				var last_number = null;
				
				function init()
				{
					if(range <= 0)
					{
						console.log('Range distribution <= 0');
						running = false;
						return false;
					}
				
					for(var i = range_min; i <= range_max; i++)
					{
						range_distribution[i] = 0;
					}
					
					for(var i = range_min; i <= range_max; i++)
					{
						console.log(range_distribution[i]);
					}
				}
				
				function run()
				{
					running = true;
					
					init();
					
					if(running)
					{
						step();
					}
				}
				
				function step()
				{
					if(g_program_mode == 'teach')
					{
						if(last_number == null)
						{
							current_number = chance.integer({ min: range_min, max: range_max });
							last_number = current_number;
						}
						else
						{
							current_number = chance.integer({ min: range_min, max: range_max });
							
							while(current_number == last_number)
							{
								current_number = chance.integer({ min: range_min, max: range_max });
							}
							
							last_number = current_number;
						}
						$('#number').text(current_number);
					}
					else if(g_program_mode == 'recognize')
					{
					
					}
					else
					{
						console.log('Invalid program!');
						running = false;
					}
				}
			});
		</script>
	</head>
	<body>
		<div id = "wrapper">
			<div id = "menu">
				<table id = "menu_table">
					<tr>
						<td id = "menu_select_t">
							T
						</td>
						<td id = "menu_select_r">
							R
						</td>
					</tr>
				</table>
			</div>
			<div id = "program">
				<div id = "number">
				-
				</div>
			</div>
		<div>
	</body>
</html>