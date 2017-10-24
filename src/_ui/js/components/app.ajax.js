$(function() {
	var $main = $('.js-main'),
		changedPage = false,

	/* ----- Return appropriate page transition ----- */
	assignTransitionType = function(linkClass, href, e, link) {
		// console.log("assignTransitionType");
		var pageTransitionType = 'default';

		if (linkClass == 'mask') {
			pageTransitionType = 'detailLoadIn';
		} else {
			if ($('.detail-page').length) {
				pageTransitionType = 'detailLoadOut';
			}
		}

		loadPage(pageTransitionType, href, link);
	},

  	/* ----- Do this when a page loads ----- */
  	init = function(pageTransitionType) {
		// console.log("init");

    	/* ----- This is where I would run any page specific functions ----- */
		setTimeout(function(){
			var trackingTitle = "",
				newTitle = $('body').find('h1').text(),
				titleLower = newTitle.replace(/\s+/g, '-').toLowerCase(),
				depth = $(location).prop('pathname').split('/').length - 1;

			console.log(newTitle);
			if (newTitle == 'Princi') {
				trackingTitle = "Homepage";
			} else if (newTitle == "Rocco Princi") {
				trackingTitle = "About"
			} else {
				trackingTitle = newTitle;
			}

			document.title = "";
			$('body').attr('class', '');
			$('body').attr('data-page-template', trackingTitle);
			$('body').addClass(' ' + titleLower);

			if (newTitle != "Princi") {
				document.title = newTitle + ' | Princi';
			} else {
				titleLower = 'homepage';
				document.title = newTitle;
			}
		}, 2000);

		APP.instantiations.init(pageTransitionType);
  	},

  	/* ----- Do this for ajax page loads ----- */
  	ajaxLoad = function(pageTransitionType) {
		/* ----- Used for popState event (back/forward browser buttons) ----- */
		changedPage = true;

		init(pageTransitionType);
  	},

  	loadPage = function(pageTransitionType, href, link) {
		// console.log("loadPage");

		setTimeout(function(){
			if (pageTransitionType == 'default') APP.pageLoads.defaultLoadIn($main);
			if ($('#primary').hasClass('active')) APP.nav.hideNav();

			$.ajax({
				xhr: function(){
					var xhr = new window.XMLHttpRequest();

					//Download progress TRY A NEW METHOD MAYBE?
	    			xhr.addEventListener("progress", function (evt) {
	        			if (evt.lengthComputable) {
	            			var percentComplete = evt.loaded / evt.total;
	            			// $('.progress').css({ width: percentComplete * 100 + '%' });
	        			} else {
	            			// $('.progress').css({ width: '100%' });
						}
	    			}, false);
	    			return xhr;
				},
				type: 'POST',
				url: href,
				async: true,
				data: {},
				success: function(result){
					var pageContent = $(result).find('#content').html();

					if (pageTransitionType == 'detailLoadIn') {
						APP.pageLoads.detailLoadIn($main, pageContent, link);
					} else if (pageTransitionType == 'detailLoadOut') {
						APP.pageLoads.detailLoadOut($main, pageContent);
					} else {
						APP.pageLoads.successfulLoadIn($main, pageContent);
					}

					ajaxLoad(pageTransitionType);
				},
				complete: function(){
					// console.log("complete");
				},
				error: function(){
					// console.log("error");
					location.reload();
				}
			});
		}, 500);
  	};

  	/* ----- This runs on the first page load with no ajax ----- */
  	init();

  	/* ----- This runs on the first page load with no ajax ----- */


  	$(window).on("popstate", function(e) {
		var linkClass = '';

		console.log("pop");
    	// -------------------------------------
    	//   If there was an AJAX page transition already,
    	//   then AJAX page load the requested page from the back or forwards button click.
    	//   Variable initially set after the $main variable.
    	// -------------------------------------
		// if (changedPage) assignTransitionType(linkClass, location.href, e, $(this));
		assignTransitionType(linkClass, location.href, e, $(this));
  	});

  	$(document).on('click', 'a', function(e) {
		// e.preventDefault();
		// console.log($(this));

    	var href = $(this).attr("href"),
			linkClass = '';

		if ($(this).hasClass('mask')) {
			linkClass = 'mask';
		} else {
			if ((!$(this).hasClass('food-type-toggle')) && (!$(this).hasClass('trigger'))) $main.css('opacity', '0');
		}

    	if ((href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) && href != '#') {
      		history.pushState({}, '', href);
			assignTransitionType(linkClass, href, e, $(this));
      		return false;
    	}
  	});
});
