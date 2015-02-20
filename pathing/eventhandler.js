game.mouseLeftDown = function(e)
{
	for(var i = 0; i < this.circleList.length; i++)
	{
		if(this.circleList[i].circle.getBounds().contains(this.g_mouse.x, this.g_mouse.y))
		{
			this.selectedObject = this.circleList[i].circle;
		}
	}
};

game.mouseMiddleDown = function(e)
{
	this.pathing();
};

game.mouseRightDown = function(e)
{
	var circle = new PIXI.Graphics();
	circle.lineStyle(3, 0x000000, 0.7);
	circle.beginFill(0x2ecc71, 0.7);
	circle.drawCircle(0, 0, 8);
	circle.endFill();
	
	circle.x = this.g_mouse.x;
	circle.y = this.g_mouse.y;
	this.stage.addChild(circle);
	this.circleList.push({ circle: circle, isVisited: false });
};

game.mouseLeftUp = function(e)
{
	this.selectedObject = null;
};

game.mouseMiddleUp = function(e)
{
	
};

game.mouseRightUp = function(e)
{
	
};

game.mouseMoved = function(e)
{
	if(this.isLeftDown && this.selectedObject)
	{
		this.selectedObject.x = this.g_mouse.x;
		this.selectedObject.y = this.g_mouse.y;
	}
};