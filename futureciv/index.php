<!DOCTYPE html>

<?php

	$valid_passwords = array ("jonah" => "jdemo", 'demo' => 'demo');
	$valid_users = array_keys($valid_passwords);

	if(!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW']))
	{	
		header('WWW-Authenticate: Basic realm="futureCiv beta"');
		header('HTTP/1.0 401 Unauthorized');
		die ("Unauthorized");
	}
	else
	{
		$user = $_SERVER['PHP_AUTH_USER'];
		$pass = $_SERVER['PHP_AUTH_PW'];
		
		$validated = (in_array($user, $valid_users)) && ($pass == $valid_passwords[$user]);
	
		if (!$validated) 
		{
			header('WWW-Authenticate: Basic realm="futureCiv beta"');
			header('HTTP/1.0 401 Unauthorized');
			die ("Unauthorized");
		}
	}
	
?>

<html>
	<head>
		<title>jonah.fi</title>
		<meta charset="utf-8">
		<meta name="robots" content="nofollow nosnippet noodp noarchive noimageindex"/>
		<meta name="google" content="notranslate"/>
		
		<link rel="apple-touch-icon" href="res/ios-icon.png"/>  
		<link rel="icon" href="res/favicon.ico"/>  
		
		<link rel="stylesheet" type="text/css" href="css/style.css"/>
		
		<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
		<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
		<script src="script/ext/jquery.transit.min.js"></script>
		<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
		<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
		<script src = "script/ext/tinycolor.js"></script>
		<script src = "script/ext/chance.min.js"></script>
		
		<?php
		
			$minify = false;
			
			if(!$minify)
			{
				echo '<script src = "script/helpers/storage.js"></script>';
				echo '<script src = "script/helpers/jquery_extensions.js"></script>';
				echo '<script src = "script/helpers/helpers.js"></script>';
				
				echo '<script src = "script/class/settings.js"></script>';
				echo '<script src = "script/class/resources.js"></script>';
				echo '<script src = "script/game.js"></script>';
				
			}
			else
			{
				echo '<script src = "script/min/helpers/storage_min.js"></script>';
				echo '<script src = "script/min/helpers/jquery_extensions_min.js"></script>';
				echo '<script src = "script/min/helpers/helpers_min.js"></script>';
				echo '<script src = "script/min/game_min.js"></script>';
			}
		?>
		
	</head>
	<body>
		<div id = "wrapper">
			<div id = "banner">
				<span id = "bannertext">>> futureCiv (ReVirtualized) v0.1</span>
				<!--<img src = "res/cog.png" class = "banner_options_icon"/>-->
			</div>
			
			<div class = "desktop_icon" data-linkto = "profile">
				<div class = "desktop_icon_content">
					<img src = "res/tophat_icon.png" class = "desktop_icon_image"/>
				</div>
			</div>
			
			<div class = "desktop_icon" data-linkto = "resources">
				<div class = "desktop_icon_content">
					<img src = "res/resources_icon.png" class = "desktop_icon_image"/>
				</div>
			</div>
			
			<div class = "desktop_icon" data-linkto = "upgrades">
				<div class = "desktop_icon_content">
					<img src = "res/upgrades_icon.png" class = "desktop_icon_image"/>
				</div>
			</div>
			
			<div class = "desktop_icon" data-linkto = "crafting">
				<div class = "desktop_icon_content">
					<img src = "res/crafting_icon.png" class = "desktop_icon_image"/>
				</div>
			</div>
			
			<div class = "desktop_icon" data-linkto = "changelog">
				<div class = "desktop_icon_content">
					<img src = "res/changelog_icon.png" class = "desktop_icon_image"/>
				</div>
			</div>
			
			<div class = "desktop_icon" data-linkto = "help">
				<div class = "desktop_icon_content">
					<img src = "res/help_icon.png" class = "desktop_icon_image"/>
				</div>
			</div>
			
			<div class = "desktop_icon" data-linkto = "settings">
				<div class = "desktop_icon_content">
					<img src = "res/settings_icon.png" class = "desktop_icon_image"/>
				</div>
			</div>
			
			<div id = "window_resources" class = "window">
				<div class = "window_titlebar">
					<span class = "window_titlebar_text">>> Resources</span>
					<div class = "window_titlebar_close">X</div>
					<div class = "window_titlebar_minimize">_</div>
				</div>
				<div class = "window_content">
					<table class = "resources_table" id = "resources_list">

					</table>
				</div>
			</div>
			
			<div id = "window_upgrades" class = "window">
				<div class = "window_titlebar">
					<span class = "window_titlebar_text">>> Upgrades</span>
					<div class = "window_titlebar_close">X</div>
					<div class = "window_titlebar_minimize">_</div>
				</div>
				<div class = "window_content">
					<table class = "upgrades_table" id = "upgrades_list">

					</table>
				</div>
			</div>
			
			<div id = "window_crafting" class = "window">
				<div class = "window_titlebar">
					<span class = "window_titlebar_text">>> Crafting</span>
					<div class = "window_titlebar_close">X</div>
					<div class = "window_titlebar_minimize">_</div>
				</div>
				<div class = "window_content">
					<table class = "crafting_table" id = "crafting_list">

					</table>
				</div>
			</div>
			
			<div id = "window_profile" class = "window">
				<div class = "window_titlebar">
					<span class = "window_titlebar_text">>> Profile</span>
					<div class = "window_titlebar_close">X</div>
					<div class = "window_titlebar_minimize">_</div>
				</div>
				<div class = "window_content">
					<table class = "profile_table">
						<tr>
							<td>
								Player: Demo
							</td>
							<td rowspan = "11">
								<img src = "res/fox.png" class = "profile_picture"/>
							</td>
						</tr>
						<tr>
							<td>Race: Fox</td>
						</tr>
						<tr>
							<td>Age: 1</td>
						</tr>
						<tr>
							<td> </td>
						</tr>
						<tr>
							<td>Money: 1000$</td>
						</tr>
						<tr>
							<td>Reputation: 0</td>
						</tr>
						<tr>
							<td> </td>
						</tr>
					</table>
				</div>
			</div>
			
			<div id = "window_changelog" class = "window">
				<div class = "window_titlebar">
					<span class = "window_titlebar_text">>> Changelog</span>
					<div class = "window_titlebar_close">X</div>
					<div class = "window_titlebar_minimize">_</div>
				</div>
				<div class = "window_content">
					<p>
						17.6 - Added working settings-menu</br>
						16.6 - Added desktop icons</br>
						16.6 - Added help menu</br>
						16.6 - Enhanced resources window</br>
						16.6 - Enhanced profile window</br>
						16.6 - Transparent windows</br>
						16.6 - Dragged window always on top</br>
						15.6 - Iinital release (v0.1)
					</p>
				</div>
			</div>
			
			<div id = "window_settings" class = "window">
				<div class = "window_titlebar">
					<span class = "window_titlebar_text">>> Settings</span>
					<div class = "window_titlebar_close">X</div>
					<div class = "window_titlebar_minimize">_</div>
				</div>
				<div class = "window_content">
					<table class = "settings_table" id = "settings_list">
						<tr>
							<td colspan = "2" class = "setting_kategory_header" style = "color: #1abc9c;">Graphics</td>
						</tr>
					</table>
				</div>
			</div>
			
			<div id = "window_help" class = "window">
				<div class = "window_titlebar">
					<span class = "window_titlebar_text">>> Help</span>
					<div class = "window_titlebar_close">X</div>
					<div class = "window_titlebar_minimize">_</div>
				</div>
				<div class = "window_content">
					<p>
						- Hold shift before dragging shortcuts to drag them in a grid
					</p>
				</div>
			</div>
			
		</div>
	</body>
</html>