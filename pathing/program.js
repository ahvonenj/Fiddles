game.pathing = function()
{
	console.log('Pathing...');
	
	for(var i = 0; i < this.lineList.length; i++)
	{
		this.stage.removeChild(this.lineList[i]);
	}
	
	this.lineList.length = 0;
	
	for(var i = 0; i < this.circleList.length; i++)
	{
		this.circleList[i].isVisited = false;
	}
	
	if(this.circleList.length > 1)
	{
		this.lineTick();
	}
};

game.lineTick = function()
{
	var i = 0;
	var last = { x: undefined, y: undefined };
	
	var tick = 50;
	
	var color = '#1abc9c';
	
	var t = setInterval(function()
	{
		if(i <= this.circleList.length)
		{
			if(i == 0)
			{
				last.x = this.circleList[i].circle.x;
				last.y = this.circleList[i].circle.y;
			}
			else
			{
				var line = new PIXI.Graphics();
				line.lineStyle(3, color.replace('#', '0x'), 1);
				line.beginFill(color.replace('#', '0x'), 1);
				line.moveTo(last.x, last.y);
				
				var next = undefined;
				var bestDist = 999999999999;
				var save;
				
				for(var j = 0; j < this.circleList.length; j++)
				{
					var dst = this.dist(
					{
						x: last.x,
						y: last.y
					},
					{
						x: this.circleList[j].circle.x,
						y: this.circleList[j].circle.y
					});

					if(dst < bestDist && !this.circleList[j].isVisited)
					{
						next = this.circleList[j].circle;
						save = j;
						bestDist = dst;
					}
					
					if(j == this.circleList.length - 1)
					{
						this.circleList[save].isVisited = true;
					}
				}
				
				line.lineTo(next.x, next.y);
				line.endFill();
				this.stage.addChild(line);
				this.lineList.push(line);
				
				last.x = next.x;
				last.y = next.y;
			}
			i++;
		}
		else
		{
			clearInterval(t);
		}	
	}.bind(this), tick);
}