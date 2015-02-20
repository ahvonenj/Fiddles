function highestOf(collection)
{
	var h = -1000;
	
	for(var i = 0; i < collection.length; i++)
	{
		if(collection[i].initial.zindex > h)
			h = collection[i].initial.zindex;
	}
	
	return h;
}

function keysLength(object)
{
	return Object.keys(object).length;
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

function dist(a, b)
{
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function dir(a, b)
{
	return Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
}