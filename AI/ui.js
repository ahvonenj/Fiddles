var UI = 
{
	debugComponents:
	{
		bulletCount: undefined,
		obstacleCount: undefined,
		targetCount: undefined,
		targetsInCone: undefined,
		obstaclesInCone: undefined,
		hasTarget: undefined,
		aiState: undefined
	}
};

UI.update = function()
{
	if(AI.bullets != undefined && this.debugComponents.bulletCount != undefined)
		this.debugComponents.bulletCount.setText('Bullets: ' + AI.bullets.length);
	
	if(game.obstacleList != undefined && this.debugComponents.obstacleCount != undefined)
		this.debugComponents.obstacleCount.setText('Obstacles: ' + game.obstacleList.length);
		
	if(game.targetList != undefined && this.debugComponents.targetCount != undefined)
		this.debugComponents.targetCount.setText('Targets: ' + game.targetList.length);
		
	if(AI.targets_in_cone != undefined && this.debugComponents.targetsInCone != undefined)
		this.debugComponents.targetsInCone.setText('Targets in vision (points): ' + AI.targets_in_cone.length);
		
	if(AI.obstacles_in_cone != undefined && this.debugComponents.obstaclesInCone != undefined)
		this.debugComponents.obstaclesInCone.setText('Obstacles in vision (points): ' + AI.obstacles_in_cone.length);
		
	if(this.debugComponents.targetCount != undefined)
	{
		if(AI.target == undefined)
		{
			this.debugComponents.hasTarget.setText('Has target: false');
		}
		else
		{
			this.debugComponents.hasTarget.setText('Has target: true');
		}
	}
	
	if(AI.state != undefined && this.debugComponents.aiState != undefined)
		this.debugComponents.aiState.setText('AI state: ' + AI.state);
}