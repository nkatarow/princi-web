$(function() {
	var $main = $('.js-main'),
		changedPage = false,

	/* ----- Return appropriate page transition ----- */
	assignTransitionType = function(linkClass, href, e, link) {
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
		APP.instantiations.init(pageTransitionType);
  	},

  	/* ----- Do this for ajax page loads ----- */
  	ajaxLoad = function(pageTransitionType) {
		/* ----- Used for popState event (back/forward browser buttons) ----- */
		changedPage = true;

		init(pageTransitionType);
  	},

  	loadPage = function(pageTransitionType, href, link) {
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
				error: function(){
					location.reload();
				}
			});
		}, 500);
  	};

  	/* ----- This runs on the first page load with no ajax ----- */
  	init();

  	$(window).on("popstate", function(e) {
		var linkClass = '';

    	// -------------------------------------
    	//   If there was an AJAX page transition already,
    	//   then AJAX page load the requested page from the back or forwards button click.
    	//   Variable initially set after the $main variable.
    	// -------------------------------------
		// if (changedPage) assignTransitionType(linkClass, location.href, e, $(this));
		assignTransitionType(linkClass, location.href, e, $(this));
  	});

  	$(document).on('click', 'a', function(e) {
    	var href = $(this).attr("href"),
			linkClass = '';

		if ($(this).hasClass('mask')) {
			linkClass = 'mask';
		} else {
			if ((!$(this).hasClass('food-type-toggle')) && (!$(this).hasClass('download')) && (!$(this).hasClass('trigger')) && ($(this).attr('target') != "_blank")) {
				$main.css('opacity', '0');
			}
		}

    	if ((href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) && ($(this).attr('target') != "_blank") && (!$(this).hasClass('download')) && href != '#') {
      		history.pushState({}, '', href);
			assignTransitionType(linkClass, href, e, $(this));
      		return false;
    	}
  	});
});
