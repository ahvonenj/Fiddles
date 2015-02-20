var resources = 
{
	crystal: { num: 0, id: 'crystal', name: 'Crystals', amount: 0, level: 0 },
	platinum: { num: 1, id: 'platinum', name: 'Platinum', amount: 0, level: 0 },
	plutonium: { num: 2, id: 'plutonium', name: 'Plutonium', amount: 0, level: 0 },
	rck: { num: 3, id: 'rck', name: 'RCK-609', amount: 0, level: 1 },
	sht: { num: 4, id: 'sht', name: 'SHT-420', amount: 0, level: 1 },
	gas: { num: 5, id: 'gas', name: 'Gas', amount: 0, level: 0 },
	nitrogen: { num: 6, id: 'nitrogen', name: 'Nitrogen', amount: 10, level: 0 },
	eg: { num: 7, id: 'eg', name: 'EG-901', amount: 0, level: 2 },
	nl: { num: 8, id: 'nl', name: 'NL-715', amount: 0, level: 2 },
	sb: { num: 9, id: 'sb', name: 'SB-621', amount: 0, level: 2 }
}

function buildResourcesList()
{
	for (var p in resources) 
	{
		if (resources.hasOwnProperty(p)) 
		{
			var v = resources[p];
			$('#resources_list').append('<tr><td data-id = "' + v.id + '">' + v.name + '</td><td>' + v.amount + '</td></tr>');
		}
    }
}

function getResourceAmt(resource)
{
	return resources.resource.amount;
}

function setResource(resources, amt)
{
	resources.resource.amount = amt;
}

function addResource(resource)
{
	for (var p in resources) 
	{
		if (resources.hasOwnProperty(p)) 
		{
			var v = resources[p];
			
			if(v.id == resource)
			{
				v.amount++;
				$('#resources_list td').each(function()
				{
					if($(this).data('id') == v.id)
					{
						$(this).next().text(v.amount);
						console.log('dasdas');
					}
				});
			}
		}
	}	
}

function addRandomResource(resourceTypes)
{
	var resourceFound = false;
	var r;
	
	while(!resourceFound)
	{
		r = Math.floor(Math.random() * keysLength(resources));
		
		for (var p in resources) 
		{
			if (resources.hasOwnProperty(p)) 
			{
				var v = resources[p];
				
				if(v.num == r)
				{
					if(resourceTypes.indexOf(v.level) > -1)
					{
						v.amount++;
						$('#resources_list td').each(function()
						{
							if($(this).data('id') == v.id)
							{
								$(this).next().text(v.amount);
							}
						});
						resourceFound = true;
						break;
					}
				}
			}
		}
	}	
}