<!doctype html>
<html>
	<head>
		<title>nsm</title>
		<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
		<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
		<script type = "text/javascript" src = "jquery.transit.js"></script>
		<script type = "text/javascript" src = "nsm.js"></script>
		<link rel="stylesheet" type="text/css" href="nsm.css">
	</head>
	<body>
		<div id = "wrapper">
			<div id = "content">
				<button id = "nestedLaunchButton" class = "nestedlaunchbutton">OPEN</button>
				<div id = "nsm" class = "nsm">
					<div id = "nested_a" class = "nsm_nested" data-name = "a">
						<div class = "nested_open_button" data-linkedto = "b">O</div>
						<div class = "nested_open_button" data-linkedto = "c">O</div>
						<div class = "nested_close_button">X</div>
						<table id = "nsm_nested_table_a" class = "nsm_nested_table">
							<tr>
								<td colspan = "1000">NESTED A</td>
							</tr>
							<tr>
								<td>Some data</td>
								<td>Some other data</td>
							</tr>
							<tr>
								<td>Data A</td>
								<td>Data B</td>
								<td>Data C</td>
							</tr>
							<tr>
								<td>Data A</td>
								<td></td>
								<td>Data C</td>
							</tr>
							<tr>
								<td colspan = "1000"></td>
							</tr>
						</table>
					</div>
					<div id = "nested_b" class = "nsm_nested" data-name = "b">
						<div class = "nested_open_button" data-linkedto = "c">O</div>
						<div class = "nested_open_button" data-linkedto = "d">O</div>
						<div class = "nested_open_button" data-linkedto = "a">O</div>
						<div class = "nested_close_button">X</div>
						<p>NESTED B</p>
						<p class = "nsm_nested_paragraph">This is a test paragraph</p>
					</div>
					<div id = "nested_c" class = "nsm_nested" data-name = "c">
						<div class = "nested_open_button" data-linkedto = "d">O</div>
						<div class = "nested_close_button">X</div>
						<table id = "nsm_nested_table_c" class = "nsm_nested_table">
							<tr>
								<td>NESTED C</td>
							</tr>
							<tr>
								<td colspan = "1000"></td>
							</tr>
						</table>
					</div>
					<div id = "nested_d" class = "nsm_nested" data-name = "d">
						<div class = "nested_open_button" data-linkedto = "b">O</div>
						<div class = "nested_open_button" data-linkedto = "e">O</div>
						<div class = "nested_open_button" data-linkedto = "a">O</div>
						<div class = "nested_open_button" data-linkedto = "c">O</div>
						<div class = "nested_close_button">X</div>
						<table id = "nsm_nested_table_d" class = "nsm_nested_table">
							<tr>
								<td>NESTED D</td>
							</tr>
							<tr>
								<td>
									<img src = "pad.png"/>
								</td>
							</tr>
							<tr>
								<td colspan = "1000"></td>
							</tr>
						</table>
					</div>
					<div id = "nested_e" class = "nsm_nested" data-name = "e">
						<div class = "nested_open_button">O</div>
						<div class = "nested_open_button">O</div>
						<div class = "nested_close_button">X</div>
						<table id = "nsm_nested_table_e" class = "nsm_nested_table">
							<tr>
								<td>NESTED E</td>
							</tr>
							<tr>
								<td colspan = "1000"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>