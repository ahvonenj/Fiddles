<!DOCTYPE html>
<html>
	<head>
		<title>Speedtest result parser</title>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
		<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
		<script src="js/jquery.tablesorter.min.js"></script>
		<script type = "text/javascript">
			$(document).ready(function()
			{
				var lat = $('.lat');
				var lon = $('.lon');
				var i = 0;
				
				$('.lat').each(function()
				{
					var h = $(this).html();
					
					$(this).html('<a href = "https://www.google.com.au/maps/preview/@' + $(lat[i]).text() + ',' + $(lon[i]).text() + ',16z">' + $(lat[i]).text() + '</a>');
					
					i++;
				});
				
				i = 0;
				
				$('.lon').each(function()
				{
					var h = $(this).html();
					
					$(this).html('<a href = "https://www.google.com.au/maps/preview/@' + $(lat[i]).text() + ',' + $(lon[i]).text() + ',16z">' + $(lat[i]).text() + '</a>');
					
					i++;
				});
				
				$('#resultstable').tablesorter();
			});
		</script>
	</head>
	<body>
		<?php

			error_reporting(E_ALL);
			ini_set("display_errors", 1);
			
			$handle = fopen("testresults.txt", "r");
			
			$i = 0;
			
			echo '<table id = "resultstable" class = "tablesorter"><thead>';
			
			if($handle) 
			{
				while (($line = fgets($handle)) !== false)
				{
					echo '<tr>';
					
					if($i == 0)
					{
						$arr = explode(',', $line);
						
						
						foreach($arr as $key => $value)
						{
							echo "<th>" . $value . "</th>";
						}
					}
					else if($i == 1)
					{
						echo "</thead><tbody>";
					}
					else
					{
						$j = 0;
						$arr = explode(',', $line);
						
						foreach($arr as $key => $value)
						{
							if($j == 2)
							{
								echo "<td class = 'lat'>" . str_replace('"', "", $value) . "</td>";
							}
							else if($j == 3)
							{
								echo "<td class = 'lon'>" . str_replace('"', "", $value) . "</td>";
							}
							else
							{
								echo "<td>" . str_replace('"', "", $value) . "</td>";
							}
							$j++;
						}
					}
					$i++;
				}
				echo "</tbody>";
			} 
			else 
			{
			} 
			fclose($handle);
		?>
	</body>
</html>