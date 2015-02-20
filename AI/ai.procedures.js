//General
AI.proc.running = [];

//moveTo -procedure definition

AI.proc.moveTo = {};

AI.proc.moveTo.update = function()
{
	var d = this.helpers.dir(this.pos(), this.dest);
	
	var can_move = true;
	
	/*if(game.obstacleList.length > 0)
	{
		for(var obstacle in game.obstacleList)
		{
			AI.helpers.lineInRect(AI.helperVectorB.x, AI.helperVectorB.y
		}
	}
	else
	{
		can_move = true;
	}
*/
	
	if(can_move)
	{
		this.graphicsElement.x += Math.cos(d * Math.PI / 180) * this.moveSpeedScale;
		this.graphicsElement.y += Math.sin(d * Math.PI / 180) * this.moveSpeedScale;
	}
	
	if(this.helpers.dist(this.pos(), this.dest) < 10)
	{
		this.isMoving = false;
		this.state = 'default';
		this.endProcedure('moveto');
	}	
	//console.log(this.helpers.dist(this.pos(), this.dest));
	
}.bind(AI);

AI.proc.moveTo.run = function(point)
{
	this.isMoving = true;
	this.dest = point;
	this.pushProcedure(AI.proc.moveTo, 'moveto');
	
}.bind(AI);