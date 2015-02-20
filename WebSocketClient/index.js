$(document).ready(function()
{
	var ip = prompt('IP?', '107.170.72.87');
	var connection = new WebSocket('ws://' + ip + ':8181');

	connection.onopen = function () 
	{
		setInterval(function()
		{
			connection.send(Math.random().toString());
		}, 50);
	};

	connection.onerror = function (error) 
	{
	  	console.log('WebSocket Error ' + error);
	};

	connection.onmessage = function (e) 
	{
		$('#wrapper').text('Server: ' + e.data);
	};
});