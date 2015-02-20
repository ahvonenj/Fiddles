<html>
	<head>
		<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
		<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
		<script src="jquery-ui-1.10.4.min.js"></script>
		<script src="jquery.transit.min.js"></script>
		<script src="script.js"></script>
		<style>
			body
			{
				/*background-color: #ecf0f1;*/
				background-image: url('bg.jpg');
				background-repea: repeat;
				font-family: Consolas;
				cursor: default;
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}
			
			#object
			{
				position: absolute;
				width: 550px;
				height: 350px;
				left: 300px;
				top: 300px;
				background-color: #7f8c8d;
				filter: alpha(opacity=95);
				-moz-opacity: 0.95;
				opacity: 0.95;
				overflow: hidden;
				-webkit-box-shadow: 13px 13px 38px -4px rgba(0,0,0,0.5);
				-moz-box-shadow: 13px 13px 38px -4px rgba(0,0,0,0.5);
				box-shadow: 13px 13px 38px -4px rgba(0,0,0,0.5);
			}
			
			#titlebar
			{
				position: relative;
				background-color: #95a5a6;
				width: 100%;
				height: 25px;
			}
			
			#closebutton
			{
				position: relative;
				width: 25px;
				height: 25px;
				right: 0px;
				top: 0px;
				float: right;
				background-color: #bdc3c7;
				text-align: center;
				line-height: 25px;
				color: #c0392b;
			}
			
			#windowcontent
			{
				position: relative;
				background-color: #7f8c8d;
				margin-left: 10px;
				margin-right: 10px;
				color: #ecf0f1;
			}
		</style>
	</head>
	<body>
		<div id = 'object' style = ''>
			<div id = 'titlebar'>
				<div id = 'closebutton'>
				X
				</div>
			</div>
			<div id = 'windowcontent'>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
		</div>
	</body>
</html>