var settings = 
{
	stars: { id: 'stars', name: 'Stars', value: true, visiblevalue: 'ON' },
	transparent_windows: { id: 'transparent_windows', name: 'Transparent windows', value: true, visiblevalue: 'ON' }
}

function evaluateSettings()
{
	for (var p in settings) 
	{
		if (settings.hasOwnProperty(p)) 
		{
			var v = settings[p];
			
			if(v.value)
			{
				$('#settings_list').append('<tr><td class = "setting_name">' + v.name + 
				'</td><td class = "setting_state setting_on" data-setting = "' + v.id +
				'" data-settingvalue = "' + v.value + '">[ ' + v.visiblevalue + ' ]</td></tr>');
			}
			else
			{
				$('#settings_list').append('<tr><td class = "setting_name">' + v.name + 
				'</td><td class = "setting_state setting_off" data-setting = "' + v.id +
				'" data-settingvalue = "' + v.value + '">[ ' + v.visiblevalue + ' ]</td></tr>');
			}
		}
    }
	$('#settings_list').append('<tr><td></td><tr>');
	
	$('#settings_list').on('click', 'td.setting_state', function(e)
	{
		e.preventDefault();

		if($(this).data('settingvalue') == true)
		{
			var value = false;
		}
		else
		{
			var value = true;
		}
		
		if($(this).data('setting') != undefined && $(this).data('setting') != "")
		{
			var setting = $(this).data('setting');
		}
		else
		{
			var setting = undefined;
		}
		setSetting(setting, value);
	});
}

function setSetting(setting, value)
{
	getSetting(setting).value = value;

	if(value)
	{
		getSetting(setting).visiblevalue = 'ON';
	}
	else
	{
		getSetting(setting).visiblevalue = 'OFF';
	}
	
	$('#settings_list td').each(function()
	{
		if($(this).data('setting') == setting)
		{
			$(this).data('settingvalue', value);
			$(this).text('[ ' + getSetting(setting).visiblevalue + ' ]');
			$(this).toggleClass('setting_on');
			$(this).toggleClass('setting_off');
		}
	});
	
	switch(setting)
	{
		case 'stars':
			
			break;
		case 'transparent_windows':
			$('.window').each(function()
			{
				if(value)
				{
					$(this).find('.window_content').css('background-color', 'rgba(87, 87, 92, 0.6)');
				}
				else
				{
					$(this).find('.window_content').css('background-color', 'rgba(87, 87, 92, 1.0)');
				}
			});
			break;
		default:
			break;
	}
}

function getSetting(id)
{
	for (var p in settings) 
	{
		if (settings.hasOwnProperty(p)) 
		{
			var v = settings[p];
			
			if(v.id === id)
			{
				return v;
			}
		}
	}
	
	return undefined;
}