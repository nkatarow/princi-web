$(function() {
	var $main = $('.js-main'),
  		changedPage = false;

	/* ----- Do this when a page loads ----- */
	init = function() {
		// console.log("init ajax");
		// Change body class
		var newTitle = $('body').find('h1').text(),
			titleLower = newTitle.replace(/\s+/g, '-').toLowerCase(),
			depth = $(location).prop('pathname').split('/').length - 1;

		$('body').attr('class', '');
		$('body').addClass(titleLower);

		if (!$('.new-results-div').length) {
			$main.wrapInner('<div class="new-results-div" />');
		}

		if ($('.food-details')) {
			setTimeout(function(){
				$('.food-details').addClass('active');
			}, 500);
		}
		// APP.instantiations.init();
	},

	/* ----- Do this for ajax page loads ----- */
	ajaxLoad = function() {
		init();

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
	},

	loadPage = function(e, href, imageLoad) {
		console.log("loadPage");

		if (!imageLoad) {
			APP.pageLoads.defaultLoadIn($main);
		} else {
			APP.pageLoads.imageLoadIn(e);
		}

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

				// HERE IS WHERE WE NEED TO LOAD BEHIND INSTEAD OF REPLACING WHEN IMAGE LOAD

				setTimeout(function(){
					if (!imageLoad) {
							/* ----- Where the new content is added ----- */
							var pageContent = $(result).find('#content').html();
							// var pageContent = $('#content').html($(result).find('#content').html());
							$main.html(pageContent);

							/* ----- Wrap content in div so we can get it's height ----- */
							$main.wrapInner('<div class="new-results-div" />');

							/* ----- Get height of new container inside results container and set $main to it so there's no content jumpage -----  */
							var newResultsHeight = $('.new-results-div').outerHeight();
							$main.height(newResultsHeight);

							/* ----- Removes the temp height from $main ----- */
							$main.css('height', '');

							ajaxLoad();
					} else {
						console.log("NOT");

						var pageContent = $(result).find('#content').html();

						$main.append(
							'<div class="secondary-results-div">' +
								pageContent +
							'</div>'
						);
					}
				}, 500);
			},
			complete: function(){
				setTimeout(function(){
					console.log("complete" + imageLoad);

					if (!imageLoad) {
						APP.pageLoads.defaultLoadOut($main);
					} else {
						APP.pageLoads.imageLoadOut();
					}
				}, 1000);
			},
			error: function(){
				console.log("error");
				location.reload();
			}
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
		console.log(e.target.location.href);
		console.log(changedPage);

		// if (changedPage) {
			var href = $(this).attr("href");

			loadPage(e, e.target.location.href, false);
			return false;
		// }
	});

	$(document).on('click', 'a', function(e) {
		e.preventDefault();

		var href = $(this).attr("href"),
			imageLoad = false;

		if ($(this).hasClass('img-link')) {
			imageLoad = true;
		}

		if ((href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) && href != '#') {
			history.pushState({}, '', href);
			loadPage(e, href, imageLoad);
			return false;
		}
	});
});
