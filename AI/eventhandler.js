game.mouseLeftDown = function(e)
{
	var target = new PIXI.Graphics();
	target.lineStyle(3, 0x000000, 1);
	target.beginFill(0xd35400, 1);
	target.drawRect(-20, -20, 40, 40);
	target.endFill();
	
	target.x = e.originalEvent.clientX;
	target.y = e.originalEvent.clientY;
	this.stage.addChild(target);
	this.targetList.push(target);
};

game.mouseMiddleDown = function(e)
{
	if(game.obstacleList.length > 0)
	{
		for(var i = 0; i < game.obstacleList.length; i++)
		{
			if(game.obstacleList[i].getBounds().contains(e.originalEvent.clientX, e.originalEvent.clientY))
			{
				game.draggedObject = game.obstacleList[i];
			}
		}
	}
};

game.mouseRightDown = function(e)
{
	var obstacle = new PIXI.Graphics();
	obstacle.lineStyle(3, 0x000000, 1);
	obstacle.beginFill(0x7f8c8d, 1);
	obstacle.drawRect(-20, -20, 40, 40);
	obstacle.endFill();
	
	obstacle.x = e.originalEvent.clientX;
	obstacle.y = e.originalEvent.clientY;
	this.stage.addChild(obstacle);
	this.obstacleList.push(obstacle);
};

game.mouseLeftUp = function(e)
{
	
};

game.mouseMiddleUp = function(e)
{
	game.draggedObject = undefined;
};

game.mouseRightUp = function(e)
{
	
};

game.mouseMoved = function(e)
{
	if(game.draggedObject != undefined)
	{
		game.draggedObject.x = e.originalEvent.clientX;
		game.draggedObject.y = e.originalEvent.clientY;
	}
};