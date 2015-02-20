function G(array, id)
{
	for(var i = 0; i < array.length; i++)
	{
		if(array[i].id === id)
		{
			return array[i];
		}
	}
	
	return undefined;
}

function getWindow(id)
{
	for(var i = 0; i < windows.length; i++)
	{
		if(windows[i].id === id)
		{
			return windows[i];
		}
	}
	
	return undefined;
}

function GW(id)
{
	for(var i = 0; i < windows.length; i++)
	{
		if(windows[i].id === id)
		{
			return windows[i];
		}
	}
	
	return undefined;
}

function getFlippableIcon(id)
{
	for(var i = 0; i < flippableIcons.length; i++)
	{
		if(flippableIcons[i].id === id)
		{
			return flippableIcons[i];
		}
	}
	
	return undefined;
}

function getDesktopIcon(id)
{
	for(var i = 0; i < desktop_icons.length; i++)
	{
		if(desktop_icons[i].id === id)
		{
			return desktop_icons[i];
		}
	}
	
	return undefined;
}

function makeWindowGroup(group, delay)
{
	var i = 0;
	
	var t = setInterval(function()
	{
		if(i < group.length)
		{
			$(group[i]).makeWindow();
			i++;
		}
		else
		{
			clearInterval(t);
		}
	}, delay);
}

function makeIconGroup(group, delay)
{
	var i = 0;
	
	var t = setInterval(function()
	{
		if(i < group.length)
		{
			$(group[i]).makeDesktopIcon();
			i++;
		}
		else
		{
			clearInterval(t);
		}
	}, delay);
}

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