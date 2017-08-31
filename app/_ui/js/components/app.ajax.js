$(function() {
	var $main = $('.js-main'),
  		changedPage = false,

	/* ----- Do this when a page loads ----- */
	init = function() {
		console.log("init ajax");
		// Change body class
		var newTitle = $('body').find('h1').text(),
			titleLower = newTitle.replace(/\s+/g, '-').toLowerCase(),
			depth = $(location).prop('pathname').split('/').length - 1;

		$('body').attr('class', '');
		$('body').addClass(titleLower);

		// APP.instantiations.init();
	},

	/* ----- Do this for ajax page loads ----- */
	ajaxLoad = function() {
		console.log("ajaxLoad");

		/* ----- Set the HTML title to the new page title ----- */
		var newTitle = $('body').find('h1').text();

		if (newTitle != "Princi") {
			document.title = newTitle + ' | Princi';
		} else {
			titleLower = 'homepage';
			document.title = newTitle;
		}

		/* ----- Used for popState event (back/forward browser buttons) ----- */
		changedPage = true;

		init();
	},

	loadPage = function(href) {
		console.log("loadPage");

		$('.loading-screen').addClass('active');

		console.log("wrap 1");
		$main.wrapInner('<div class="new-results-div" />');

		setTimeout(function(){
			if ($('#primary').hasClass('active')) {
				APP.nav.hideNav();
			}

			$main.css('opacity', '0');

			scroll(0,0);

			/* ----- Set height of $main to ensure the footer doesn't jump up -----  */
			var newResultsHeight = $('.new-results-div').outerHeight();
			$main.height(newResultsHeight);

		}, 250);

		$.ajax({
			xhr: function(){
				var xhr = new window.XMLHttpRequest();

				//Download progress
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
				console.log("success");

				setTimeout(function(){

					/* ----- Where the new content is added ----- */
					var pageContent = $('#content').html($(result).find('#content').html());
					$main.html(pageContent);

					/* ----- Wrap content in div so we can get it's height ----- */
					$main.wrapInner('<div class="new-results-div" />');

					/* ----- Get height of new container inside results container and set $main to it so there's no content jumpage -----  */
					var newResultsHeight = $('.new-results-div').outerHeight();
					$main.height(newResultsHeight);

					/* ----- Removes the temp height from $main ----- */
					$main.css('height', '');

					$main.css('opacity', '1');
					ajaxLoad();
				}, 500);

			},
			complete: function(){
				console.log("complete");

				setTimeout(function(){
					$('.loading-screen').removeClass('active');
					$('.progress').css('width', '0');
				}, 2000);
			},
			error: function(){
				console.log("error");
				location.reload();
			}//,
			// timeout: function() {
			// 	console.log("timeout");
			// },
			// statusCode: function(){
			// 	console.log("status code");
			// }
		});
	};

	/* ----- This runs on the first page load with no ajax ----- */
	init();

	$(window).on("popstate", function(e) {
		// -------------------------------------
		//   If there was an AJAX page transition already,
		//   then AJAX page load the requested page from the back or forwards button click.
		//   Variable initially set after the $main variable.
		// -------------------------------------
		console.log('popstate');
		console.log(e);
		if (changedPage) {
			var href = $(this).attr("href");

			loadPage(location.href);
			return false;
		}

	});

	$(document).on('click', 'a', function(event) {
		var href = $(this).attr("href");

		if ((href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) && href != '#') {
			history.pushState({}, '', href);
			loadPage(href);
			return false;
		}
	});
});
