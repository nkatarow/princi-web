$(function() {
	var $main = $('.js-main'),
		changedPage = false,

	/* ----- Return appropriate page transition ----- */
	assignTransitionType = function(linkClass, href, e) {
		// console.log("assignTransitionType");
		var pageTransitionType = 'default';

		if (linkClass == 'img-link') {
			pageTransitionType = 'detailLoadIn';
		} else {
			if ($('.detail-page').length) {
				pageTransitionType = 'detailLoadOut';
			}
		}

		// console.log("pageTransitionType = " + pageTransitionType + " href = " + href);
		loadPage(pageTransitionType, href, e);
	},

  	/* ----- Do this when a page loads ----- */
  	init = function() {
		// console.log("init");
    	/* ----- This is where I would run any page specific functions ----- */

		var newTitle = $('body').find('h1').text(),
			titleLower = newTitle.replace(/\s+/g, '-').toLowerCase(),
			depth = $(location).prop('pathname').split('/').length - 1;

		$('body').attr('class', 'body');
		$('body').addClass(titleLower);

		if (!$('.new-results-div').length) {
			$main.wrapInner('<div class="new-results-div" />');
		}

		if ($('.food-details').length) {
			$('body').addClass('food-details-page');

			setTimeout(function(){
				$('.food-details').addClass('active');
			}, 500);
		}
  	},

  	/* ----- Do this for ajax page loads ----- */
  	ajaxLoad = function(html) {
		// console.log("ajaxLoad");
		init();

		// CHECK THIS
		var newTitle = $('body').find('h1').text();

		if (newTitle != "Princi") {
			document.title = newTitle + ' | Princi';
		} else {
			titleLower = 'homepage';
			document.title = newTitle;
		}

		/* ----- Used for popState event (back/forward browser buttons) ----- */
		changedPage = true;
  	},

  	loadPage = function(pageTransitionType, href, e) {
		// console.log("loadPage");

		$.ajax({
			xhr: function(){
				var xhr = new window.XMLHttpRequest();

				//Download progress TRY A NEW METHOD MAYBE?
    			xhr.addEventListener("progress", function (evt) {
        			if (evt.lengthComputable) {
            			var percentComplete = evt.loaded / evt.total;
            			$('.progress').css({ width: percentComplete * 100 + '%' });
        			} else {
            			$('.progress').css({ width: '100%' });
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
					APP.pageLoads.detailLoadIn(e, $main, pageContent);
				} else if (pageTransitionType == 'detailLoadOut') {
					APP.pageLoads.detailLoadOut($main, pageContent);
				} else {
					APP.pageLoads.defaultLoadIn($main, pageContent, false);

					APP.pageLoads.defaultLoadOut($main);
				}
			},
			complete: function(){
				// console.log("complete");
				ajaxLoad();
			},
			error: function(){
				// console.log("error");
				location.reload();
			}
		});
  	};

  	/* ----- This runs on the first page load with no ajax ----- */
  	init();
	APP.pageLoads.initialLoadIn();

  	/* ----- This runs on the first page load with no ajax ----- */


  	$(window).on("popstate", function(e) {
		//  	console.log("popstate");
		var linkClass = '';
    	// -------------------------------------
    	//   If there was an AJAX page transition already,
    	//   then AJAX page load the requested page from the back or forwards button click.
    	//   Variable initially set after the $main variable.
    	// -------------------------------------
		if (changedPage) assignTransitionType(linkClass, location.href);
  	});

  	$(document).on('click', 'a', function(e) {
		e.preventDefault();
    	var href = $(this).attr("href"),
			linkClass = '';

		if ($(this).hasClass('img-link')) {
			linkClass = 'img-link';
		}

    	if ((href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) && href != '#') {
      		history.pushState({}, '', href);
			assignTransitionType(linkClass, href, e);
      		return false;
    	}
  	});
});
