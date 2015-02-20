$(document).ready(function()
{
	$('#wrapper').css('height', $(window).height() + 'px');
	$('#nsm').nestedSlidemenu($('#nestedLaunchButton')
	);
});

var n_slidemenuList = [];

(function($)
{
    $.fn.nestedSlidemenu = function(buttonToBind) 
	{
		var e = $(this);
		var nsmChildren = $(e).children();
		var id = $(e).attr('id');
		
		$(e).css('height', parseInt($(e).parent().outerHeight()) + 'px');
		$(e).css('width', 'auto');
		
		n_slidemenuList.push(
		{
			id: id,
			menu: $(e),
			first: $(e).children().first(),
			nestedChildren: $(e).children(),
			howManyOpen: 0,
			isAnimating: false
		});
		
		var nestedLen = $(e).children().length;
		
		$(e).children().each(function(ind, ele)
		{
			console.log('NSM: Autoconfig: ' + $(this).attr('id'));
			
			var child = $(this);
			
			$(this).css('width', '300px');
			$(this).css('height', parseInt($(this).parent().outerHeight()) + 'px');
			$(this).css('position', 'absolute');
			$(this).css('top', '0');
			$(this).css('left', '0');
			$(this).css('visibility', 'hidden');	
			$(this).css({ x: '-=' + (parseInt($(child).outerWidth()) + 25) });
			
			/*if(ind != nestedLen - 1)
			{*/
				var oButton = $(this).children('.nested_open_button');
				
				var p = $(oButton).length;
				
				$(oButton).each(function()
				{
					var b = $(this);
					
					$(b).css('position', 'absolute');
					$(b).css('top', (($(child).outerHeight() / 2 - $(b).outerHeight() / 2) - (p * $(b).outerHeight() + p * 10)) + 'px');
					$(b).css('background-color', '#16a085');
					$(b).css('width', '50px');
					$(b).css('height', '50px');
					$(b).css('left', $(child).outerWidth() - $(b).outerWidth() / 2);
					$(b).css('-webkit-border-radius', '50px');
					$(b).css('-moz-border-radius', '50px');
					$(b).css('border-radius', '50px');
					
					if($(b).data('linkedto') != undefined && $(b).data('linkedto') != "")
					{
						$(b).html($(b).data('linkedto').toString().toUpperCase());
					}
					else
					{
						$(b).html('*');
					}
					
					p--;
				});
			/*}
			else
			{
				var oButton = $(this).children('.nested_open_button');
				
				$(oButton).each(function()
				{
					$(this).remove();
				});
				
				console.log('NSM: Removed opening');
			}*/
			
			var cButton = $(this).children('.nested_close_button');
			
			//cButton.css('position', 'fixed');
			cButton.css('top', $(this).outerHeight() / 2 - cButton.outerHeight() / 2 + 30 + 'px');
			//cButton.css('background-color', '#16a085');
			//cButton.css('width', '50px');
			//cButton.css('height', '50px');
			cButton.css('left', $(this).outerWidth() - cButton.outerWidth() / 2);
			//cButton.css('-webkit-border-radius', '50px');
			//cButton.css('-moz-border-radius', '50px');
			//cButton.css('border-radius', '50px');
			
			$(cButton).on('click', function(e)
			{
				e.stopPropagation();
				
				// parent.insertAfter(parent.next('div'));
				if(!$(child).prevAll().isAnyOpen() && 
				!$(child).nextAll().isAnyOpen())
				{
					if(!nsmById(id).isAnimating)
					{
						nsmById(id).isAnimating = true;
					
						pushToBack($(child), $(child));
						
						$(child).transition(
						{
							x: '-' + $(child).customWidth(),
							complete: function()
							{
								$(child).css('visibility', 'visible');
								$(child).data('isOpen', false);
								nsmById(id).isAnimating = false;
							},
							duration: 500
						});
						console.log('NSM: prevAll & nextAll false');
					}
					else
					{
						console.log('NSM: Still animating');
					}
					
					//order();
				}
				else
				{
					if($(child).nextAll().isAnyOpen())
					{
						if(!nsmById(id).isAnimating)
						{
							nsmById(id).isAnimating = true;
							
							$(child).transition(
							{
								x: '-' + $(child).customWidth(),
								complete: function()
								{
									$(child).css('visibility', 'visible');
									$(child).data('isOpen', false);
								},
								duration: 500 + whichChild($(child)) * 100
							});
							
							$(child).nextAll().each(function()
							{
								if(isOpen($(this)))
								{	
									$(this).transition(
									{
										x: '-=' + ($(child).customWidth() - 25),
										complete: function()
										{
											//$(this).css('visibility', 'visible');
											//$($(this)).data('isOpen', false);
											nsmById(id).isAnimating = false;
										}
									});
								}
								else
								{
									//console.log('NSM: Ignored ' + $(this).attr('id') + ' when closing menu');
								}
							});
							
							setTimeout(function() { pushToBack($(child), $(child)) }, 500);
							
							//order();
						}
						else
						{
							console.log('NSM: Still animating');
						}
					}
					else
					{
						if(!nsmById(id).isAnimating)
						{
							nsmById(id).isAnimating = true;
							
							$(child).transition(
							{
								x: '-' + $(child).customWidth(),
								complete: function()
								{
									$(child).css('visibility', 'visible');
									$(child).data('isOpen', false);
									nsmById(id).isAnimating = false;
								},
								duration: 500 + whichChild($(child)) * 100
							});
						}
					}
				}
			});
			
			$(oButton).on('click', function(e)
			{
				e.stopPropagation();
				
				//var parent = $(child).closest('div');
				//parent.insertBefore(parent.next('div'));
				
				//console.log('NSM: Inserting ' + parent.attr('id') + ' after ' + parent.next('div').attr('id'));
				
				if($(this).data('linkedto') != undefined && $(this).data('linkedto') != "")
				{
					var linked = $(child).getLinkedSibling($(this).data('linkedto'));
					
					if(linked != undefined)
					{
						if(linked.length != undefined)
						{
							if(!isOpen(linked))
							{
								if(!nsmById(id).isAnimating)
								{
									nsmById(id).isAnimating = true;
									reorder($(this).parent(), linked);
									var z = $(linked).css('z-index');
									$(linked).css('z-index', '0');
									
									linked.transition(
									{
										x: '+=' + (linked.customWidth() + getTotalNsmWidth(id) - getTotalNestedOpen(id) * 25),
										complete: function()
										{
											linked.css('visibility', 'visible');
											$(linked).css('z-index', z);
											resolveNestedZ(id);
											nsmById(id).isAnimating = false;
										}
									});
									
									$(linked).data('isOpen', true);
									$(linked).data('p', (linked.customWidth() + getTotalNsmWidth(id) - getTotalNestedOpen(id) * 25));
									
									order();
								}
								else
								{
									console.log('NSM: Still animating');
								}
							}
							else
							{
								console.log('NSM: Next nested menu from ' + $(child).attr('id') + ' is already open');
							}
						}
						else
						{
							console.log('NSM: There is no next nested menu');
						}
					}
					else
					{
						console.log('NSM: Link leads to nothing');
					}
				}
				else
				{
					console.log('NSM: data-linkedto is undefined');
				}
			});
		});
		
		$(buttonToBind).on('click', function()
		{		
			if(!nsmById(id).nestedChildren.isAnyOpen())
			{
				if(!nsmById(id).isAnimating)
				{
					nsmById(id).isAnimating = true;
					$(nsmById(id).first).data('isOpen', true);
					
					$(nsmById(id).first).transition(
					{
						x: '+=' + $(nsmById(id).first).customWidth(),
						complete: function()
						{
							$(nsmById(id).first).css('visibility', 'visible');
							nsmById(id).isAnimating = false;
						}
					});
				}
				else
				{
					console.log('NSM: Still animating');
				}
			}
			else
			{
				console.log('NSM: Some child already open');
			}
		});
	}
}(jQuery));

(function($)
{
    $.fn.customWidth = function() 
	{	
		return (parseInt($(this).outerWidth()) + 25);
	}
}(jQuery));

(function($)
{
    $.fn.isAnyOpen = function() 
	{
		var somethingIsOpen = false;
		
		$(this).each(function()
		{
			if(isOpen($(this)))
			{
				somethingIsOpen = true;
			}
		});	
		return somethingIsOpen;
	}
}(jQuery));

(function($)
{
    $.fn.directedWidth = function() 
	{
		var w = 0;
		
		$(this).each(function()
		{
			if(isOpen($(this)))
			{
				w += (parseInt($(this).outerWidth()) + 25);
			}
		});
		
		return w;
	}
}(jQuery));

(function($)
{
    $.fn.getLinkedSibling = function(link) 
	{
		var sib = $(this).siblings();
		
		for(var i = 0; i < sib.length; i++)
		{
			if($(sib[i]).data('name') == link)
			{
				return $(sib[i]);
			}
			//console.log('NSM: ' + $(sib[i]).attr('id') + ' > ' + $(sib[i]).data('name'));
		}
		console.log('NSM: Couldn\'t find linked sibling of ' + $(this).attr('id'));
	}
}(jQuery));

function whichChild(child)
{
	var nm = n_slidemenuList[0].menu.children();
	
	for(var i = 0; i < nm.length; i++)
	{
		if($(nm[i]).is($(child)))
		{
			return i;
		}
		//console.log($(nm[i]).attr('id') + " -> " + $(child).attr('id'));
	}
}

function order()
{
	var o = "";

	n_slidemenuList[0].menu.children().each(function()
	{
		o += $(this).attr('id') + ' | ';
	});
	
	console.log('NSM: Order is now: ' + o);
}

function reorder(linker, linked)
{
	if(!$(linker).nextAll().isAnyOpen())
	{
		linked.insertAfter(linker);	
	}
	else
	{
		linked.insertAfter($(linker).siblings().last());
	}	
}

function pushToBack(linker, linked)
{
	linked.insertAfter($(linker).siblings().last());		
}

function nsmById(id)
{
	for(var i = 0; i < n_slidemenuList.length; i++)
	{
		if(id == n_slidemenuList[i].id)
		{
			return n_slidemenuList[i];
		}
	}
	return undefined;
}

function getTotalNsmWidth(id)
{
	for(var i = 0; i < n_slidemenuList.length; i++)
	{
		if(id == n_slidemenuList[i].id)
		{
			var w = 0;
			
			$(n_slidemenuList[i].nestedChildren).each(function()
			{
				if($(this).data('isOpen') != undefined && $(this).data('isOpen') != "")
				{
					w += parseInt($(this).customWidth());
				}
			});
			
			return w;
		}
	}
	return undefined;
}

function getTotalNestedOpen(id)
{
	for(var i = 0; i < n_slidemenuList.length; i++)
	{
		if(id == n_slidemenuList[i].id)
		{
			var o = 0;
			
			$(n_slidemenuList[i].nestedChildren).each(function()
			{
				if($(this).data('isOpen') != undefined && $(this).data('isOpen') != "")
				{
					o++;
				}
			});
			
			return o;
		}
	}
	return undefined;
}

function resolveNestedZ(id)
{
	for(var i = 0; i < n_slidemenuList.length; i++)
	{
		if(id == n_slidemenuList[i].id)
		{
			var z = 10000;
			
			$(n_slidemenuList[i].menu.children()).each(function()
			{
				$(this).css('z-index', z);
				z -= 100;
				//console.log('NSM: Z of ' + $(this).attr('id') + ' set to: ' + z);
			});
		}
	}
}

function isOpen(nested)
{
	if($(nested).data('isOpen') != undefined &&
	$(nested).data('isOpen') != "" && 
	$(nested).data('isOpen') == true)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function dom_force_reflow()
{
	//1. Create invisible div which exceeds document size
	//2. Delete the said div immedially
	//3. ???
	//4. Forced DOM reflow
	var hack = document.createElement("div");	
	hack.style.height = "101%";
	document.body.appendChild(hack);
	
	setTimeout(function()
	{
		document.body.removeChild(hack);
		hack = null;
	}, 0);
	
	//console.log('DOM reflow forced');
}