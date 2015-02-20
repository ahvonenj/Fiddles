var pageController =
{
	pages:
	{
		login:
		{
			id: "login",
			data: "page/login.htm"
		},
		register:
		{
			id: "register",
			data: "page/register.htm"
		}
	},
	
	loadPage: function(page)
	{
		if(this.pages[page] != undefined)
		{
			var request = $.ajax(
			{
				url: this.pages[page].data,
				type: "GET"
			});

			request.done(function(data) 
			{
				$("#main").hide().html(data).fadeIn("fast");
			});

			request.fail(function(jqXHR, textStatus) 
			{
				console.log("Ajax failed: " + textStatus);
			});
		}
		else
		{
			console.log("Page does not exist");
		}
	}
};