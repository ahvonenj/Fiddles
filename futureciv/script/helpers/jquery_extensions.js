var windows = [];
var window_position_padding_x = 0;
var window_position_padding_y = 0;
var windowsCreated = 0;

/*var isDown = false;
var lastX = 6666666;
var lastY = 6666666;
var curX;
var curY;
var dX;
var dY;
var deltaMax = 15;*/

(function($)
{
    $.fn.makeWindow = function(options)
	{	
		var e = $(this);
		var id = $(e).attr('id');

		var settings = $.extend(
		{
            width: '350px',
			height: '275px',
			left: 500 + window_position_padding_x + 'px',
			top: 100 + window_position_padding_y + 'px'
        }, options);
		
		window_position_padding_x += 30;
		window_position_padding_y += 30;
		
		/*if(windowsCreated % 2 == 0 && windowsCreated != 0)
		{
			window_position_padding_x = 0;
			window_position_padding_y += 320;
		}
		else
		{
			window_position_padding_x += 360;
		}*/
		
		windowsCreated++;
		
		this.css(
		{
			width: settings.width,
			height: settings.height,
			left: settings.left,
			top: settings.top
		});
		
		windows.push(
		{ 
			e: $(this),
			id: $(this).attr('id'), 
			isOpen: true, 
			isMinimized: false, 
			isAnimating: false, 
			initial: 
			{ 
				width: $(e).outerWidth(), 
				height: $(e).outerHeight(),
				zindex: $(e).css('z-index')
			}
		});	
		
		$(e).find('.window_titlebar_close').on('click', function()
		{
			GW(id).isAnimating = true;
			
			$(e).css({ transformOrigin: $(e).outerWidth() + 'px 0px' });
			
			$(e).transition(
			{ 
				scale: [0, 0], 
				duration: 500,
				complete: function() 
				{ 
					GW(id).isOpen = false;
					GW(id).isAnimating = false;
				}
			});
		});
		
		$(e).find('.window_titlebar_minimize').on('click', function()
		{
			var c = $(e).find('.window_content');
			
			if(!GW(id).isAnimating)
			{
				GW(id).isAnimating = true;
				
				if(!getWindow(id).isMinimized)
				{
					$(c).css({ transformOrigin: $(c).outerWidth() + 'px 0px' });
					
					$(c).transition(
					{ 
						scale: [1, 0], 
						duration: 500,
						complete: function()
						{ 
							$(e).css('height', 0 + 'px'); 
							GW(id).isAnimating = false; 
							getWindow(id).isMinimized = true;
						}
					});
					
					
				}
				else
				{
					$(c).css({ transformOrigin: $(c).outerWidth() + 'px 0px' });
					$(e).css('height', GW(id).initial.height + 'px'); 
					
					$(c).transition(
					{ 
						scale: [1, 1], 
						duration: 500,
						complete: function()
						{ 
							
							GW(id).isAnimating = false; 
						}
					});
					
					getWindow(id).isMinimized = false;
				}
			}
		});
		
		/*$(e).on('mousedown', function(e)
		{
			e.preventDefault();
			isDown = true;
			lastX = e.pageX;
			lastY = e.pageY;
		});
		
		$(document).on('mouseup', function(e)
		{
			isDown = false;
			
			$(e).transition(
			{
				skewX: 0,
				skewY: 0,
				duration: 200
			});
		});
		
		$(e).on('mouseup', function(e)
		{
			isDown = false;
			
			$(e).transition(
			{
				skewX: 0,
				skewY: 0,
				duration: 200
			});
		});
		
		$(document).on('mousemove', function(e)
		{		
			if(isDown)
			{
				curX = e.pageX;
				curY = e.pageY;
				
				dX = lastX - curX;
				dY = lastY - curY;
				lastX = curX;
				lastY = curY;
				
				if(dX > deltaMax)
				{
					dX = deltaMax;
				}
				
				if(dX < -deltaMax)
				{
					dX = -deltaMax;
				}
				
				if(dY > deltaMax)
				{
					dY = deltaMax;
				}
				
				if(dY < -deltaMax)
				{
					dY = -deltaMax;
				}
				
				$(e).css(
				{ 
					skewX: dX * 10
				});
			}
		});*/
		
		$(e).css({ scale: [0, 0] });
		$(e).css('visibility', 'visible');
		$(e).css({ transformOrigin: '0px 0px' });
		
		$(e).transition(
		{ 
			scale: [1, 1], 
			duration: 500 
		});
		
		$(e).draggable(
		{
			containment: $('#wrapper'),
			snap: $('.window'),
			snapTolerance: 5
		});
		
		$(e).on('dragstart', function()
		{
			var h = parseInt(highestOf(windows)) + 1;
			
			$(e).css('z-index', h);
			GW(id).initial.zindex = h;
		});
		
		$(e).on('dragstop', function()
		{
			//$(e).css('z-index', GW(id).initial.zindex);
		});
	}
}(jQuery));

var desktop_icons = [];
var desktop_icon_padding_x = 0;
var desktop_icon_padding_y = 0;
var iconsCreated = 0;

(function($)
{
    $.fn.makeDesktopIcon = function(options)
	{	
		var e = $(this);
		var id = $(e).attr('id');

		var settings = $.extend(
		{
            width: '50px',
			height: '60px',
			left: 100 + desktop_icon_padding_x+ 'px',
			top: 100 + desktop_icon_padding_y + 'px'
        }, options);
		
		if(iconsCreated % 4 == 0 && iconsCreated != 0)
		{
			desktop_icon_padding_x = 0;
			desktop_icon_padding_y += 70;
		}
		else
		{
			desktop_icon_padding_x += 60;
		}
		
		iconsCreated++;
		
		this.css(
		{
			width: settings.width,
			height: settings.height,
			left: settings.left,
			top: settings.top
		});
		
		desktop_icons.push(
		{ 
			id: $(this).attr('id'), 
			isAnimating: false, 
			initial: 
			{ 
				width: $(e).outerWidth(), 
				height: $(e).outerHeight(),
				zindex: $(e).css('z-index')
			}
		});	
		
		$(e).css({ scale: [0, 0] });
		$(e).css('visibility', 'visible');
		$(e).css({ transformOrigin: '0px 0px' });
		
		$(e).transition(
		{ 
			scale: [1, 1], 
			duration: 500 
		});
		
		$(e).draggable(
		{ 
			distance: 12, 
			containment: $('#wrapper'),
			snap: $('.desktop_icon'),
			snapTolerance: 5
		});
		
		$(e).on('dragstart', function()
		{
			$(e).css('z-index', 10000);
			
			if(k(16))
			{
				$(e).draggable('option', 'grid', [15, 15]);
			}
		});
		
		$(e).on('dragstop', function()
		{
			$(e).css('z-index', getDesktopIcon(id).initial.zindex);
			$(e).draggable('option', 'grid', false);
		});
		
		$(e).on('click', function()
		{
			var window = GW('window_' + $(this).data('linkto'));
			
			if(!window.isOpen && !window.isAnimating)
			{
				window.isAnimating = true;
				
				$(window.e).css({ transformOrigin: $(window.e).outerWidth() + 'px 0px' });
				
				$(window.e).transition(
				{ 
					scale: [1, 1], 
					duration: 500,
					complete: function() 
					{ 
						window.isOpen = true;
						window.isAnimating = false;
					}
				});
			}
			
			$(this).css({ transformOrigin: $(this).outerWidth() / 2 + 'px ' + $(this).outerHeight() / 2 + 'px' });
			$(this).css({ scale: [0.9, 0.9] });
			
			var ths = $(this);
			
			setTimeout(function() 
			{
				$(ths).css({ scale: [1, 1] });
			}, 100);
		});
		
		return this.each(function() 
		{
		
		});
	}
}(jQuery));

var flippableIcons = [];

(function($)
{
    $.fn.makeFlippable = function()
	{	
		var e = $(this);
		
		flippableIcons.push({ id: $(e).attr('id'), element: $(e), isAnimating: false });
		
		$(e).on('mouseover', function()
		{
			if(!getFlippableIcon($(e).attr('id')).isAnimating)
			{
				getFlippableIcon($(e).attr('id')).isAnimating = true;
				$(this).css({ transformOrigin: $(this).outerWidth() / 2 + 'px ' + $(this).outerHeight() / 2 + 'px' });
				
				$(this).transition(
				{
					perspective: '100px',
					rotateY: '+=180deg',
					complete: function()
					{
						getFlippableIcon($(e).attr('id')).isAnimating = false;
					}
				});
			}
		});
		
		$(e).on('mouseout', function()
		{
			if(!getFlippableIcon($(e).attr('id')).isAnimating)
			{
				getFlippableIcon($(e).attr('id')).isAnimating = true;
				$(this).css({ transformOrigin: $(this).outerWidth() / 2 + 'px ' + $(this).outerHeight() / 2 + 'px' });
				
				$(this).transition(
				{
					perspective: '100px',
					rotateY: '-=180deg',
					complete: function()
					{
						getFlippableIcon($(e).attr('id')).isAnimating = false;
					}
				});
			}
		});
	
	}
}(jQuery));

//is key with code n down
function k(n)
{
	if(keysDown.indexOf(n) > -1)
	{
		return true;
	}
	else
	{
		return false;
	}
}