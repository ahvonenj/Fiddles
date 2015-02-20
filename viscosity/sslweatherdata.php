<?php
	
	//Force https
	if($_SERVER["HTTPS"] != "on")
	{
		header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
		exit();
	}
	
	//Needs to be set so ajax-requests can get through
	header("Access-Control-Allow-Origin: *");
	
	$replacethese = array("ä", "ö");
	$withthese = array("a", "o");

	//Check that all the GET-parameters are set
	if(isset($_GET['query']) &&
	   isset($_GET['start']) &&
	   isset($_GET['end']) &&
	   isset($_GET['place']))
	   {
			$q = $_GET['query'];
			$s = $_GET['start'];
			$e = $_GET['end']; 
			$p = str_replace($replacethese, $withthese, $_GET['place']); 

			requestWeather($q, $s, $e, $p);
		}
		else
		{
			echo "null";
		}
	
	//Curl-"request" ilmatieteenlaitos for weather
	function requestWeather($query, $start, $end, $place)
	{		
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => 'http://data.fmi.fi/fmi-apikey/0b1ff19b-f688-4511-8893-1472e0978fa5/wfs' . 
							'?request=getFeature&storedquery_id=' . $query . '&starttime=' . $start .
							'&endtime=' . $end . '&timestep=1&place=' . $place
		));

		$resp = curl_exec($curl);
		curl_close($curl);
		
		echo $resp;
	}
?>