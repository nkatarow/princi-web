/*

    Page Loading
    VERSION 1.0.0
    AUTHORS: Nick Katarow

    DEPENDENCIES:
    - jQuery 1.11.1
    - APP.ajax.js

*/

APP.pageLoads = {
    defaultLoadIn: function($main) {
		console.log("function defaultLoadIn");

		if ($('.top-bar').hasClass('hidden')) $('.top-bar').removeClass('hidden');

		setTimeout(function(){
			/* ----- Wrap content in div so we can get it's height ----- */
			$main.wrapInner('<div class="new-results-div" />');

			/* ----- Set height of $main to ensure the footer doesn't jump up -----  */
			var newResultsHeight = $('.new-results-div').outerHeight();
			$main.height(newResultsHeight);

			scroll(0,0);
		}, 500);
	},

	successfulLoadIn: function($main, pageContent) {
		console.log("successfulLoadIn");

		/* ----- Where the new content is added ----- */
		$main.html(pageContent);

		/* ----- Removes the temp height from $main ----- */
		$main.css('height', '');

		setTimeout(function(){
			$main.css('opacity', '1');
		}, 1000);
	},

	detailLoadIn: function($main, pageContent, link) {
		var self = this;

		// Add new content behind current
		$main.append('<div class="secondary-results-div">' + pageContent + '</div>');

		// Bring image to top
		if (APP.getMediaWidth() < 800) {
			$('html,body').animate({
	            scrollTop: link.offset().top
	        }, 500);
		} else {
			$('.parallax').animate({
	            scrollTop: link.offset().top + 1 + $('.parallax').scrollTop()
			}, 500);
		}

		setTimeout(function(){
			// Animate image to cover full screen - 1s
			$(link).parent('.type').addClass('center-background');

			$(link).addClass('transition'); //.5s
		}, 500);

		setTimeout(function(){
			$('.secondary-results-div').addClass('transition-in'); // 250ms

			/* ----- Set height of $main to ensure the footer doesn't jump up -----  */
			var newResultsHeight = $('.secondary-results-div').outerHeight();
			$main.height(newResultsHeight);

			// ?
			// scroll(0,0);
		}, 1750);

		setTimeout(function(){
			// Hide current / Show new
			$('.new-results-div').addClass('transition-out');
		}, 2000);

		setTimeout(function(){
			// Remove current
			$('.new-results-div').remove();

			// Update new container class
			$('.secondary-results-div').addClass('new-results-div');
			$('.new-results-div').removeClass('secondary-results-div');

			// Slide in details
			$('.food-details').addClass('active');
		}, 2000);
	},

	detailLoadOut: function($main, pageContent) {
		// Add new content behind current
		$main.append('<div class="secondary-results-div">' + pageContent + '</div>');

		/* ----- Set height of $main to ensure the footer doesn't jump up -----  */
		var newResultsHeight = $('.secondary-results-div').outerHeight();
		$main.height(newResultsHeight);

		scroll(0,0);

		// Slide out detail pane
		$('.food-details').removeClass('active');

		setTimeout(function(){
			// slide out background
			$('.food-type').removeClass('active');
		}, 500);

		setTimeout(function(){
			if ($('.top-bar').hasClass('hidden')) $('.top-bar').removeClass('hidden');
			$('.food-type').remove();
			$('.new-results-div').remove();
			$('.secondary-results-div').addClass('new-results-div');
			$('.new-results-div').removeClass('secondary-results-div');
		}, 1000);
	},

	getElemDistance: function(elem) {
	    var location = 0;
	    if (elem.offsetParent) {
	        do {
	            location += elem.offsetTop;
	            elem = elem.offsetParent;
	        } while (elem);
	    }
	    return location >= 0 ? location : 0;
	}
};
