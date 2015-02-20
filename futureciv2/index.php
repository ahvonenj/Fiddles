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
		<script src = "script/ext/pixi.dev.js"></script>
		<script src = "script/ext/stats.min.js"></script>
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
		
	</body>
</html>