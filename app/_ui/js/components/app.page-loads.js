/*

    Page Loading
    VERSION 1.0.0
    AUTHORS: Nick Katarow

    DEPENDENCIES:
    - jQuery 1.11.1
    - APP.ajax.js

*/

APP.pageLoads = {
	initialLoadIn: function() {
		$('body').prepend(APP.initialLoadingScreen);
		$('.loading-screen').addClass('active');

		setTimeout(function(){
			$('.loading-screen').removeClass('active');
		}, 2500);
		setTimeout(function(){
			$('.loading-screen').remove();
		}, 3000);
	},

    defaultLoadIn: function($main, pageContent) {
		// console.log("function defaultLoadIn");

		// Attach and display default loading screen
		$('body').prepend(APP.loadingScreen);
		$('.top-bar').addClass('white');

		setTimeout(function(){
			$('.loading-screen').addClass('active');
		}, 250);

		setTimeout(function(){
			// If primary menu is open, close it
			if ($('#primary').hasClass('active')) {
				APP.nav.hideNav();
			}

			// Hide main content area and scroll to top
			// $main.css('opacity', '0');
			scroll(0,0);

			// Add new content & container, setting height for it
			$main.html(pageContent);
			$main.wrapInner('<div class="new-results-div" />');

			/* ----- Set height of $main to ensure the footer doesn't jump up -----  */
			var newResultsHeight = $('.new-results-div').outerHeight();
			$main.height(newResultsHeight);
		}, 500);
	},

	defaultLoadOut: function($main) {
		// console.log("function defaultLoadOut");
		// $main.css('opacity', '1');

		setTimeout(function(){
			$('.top-bar').removeClass('white');
			$('.loading-screen').removeClass('active');
			$('.progress').css('width', '0');
		}, 2000);

		setTimeout(function(){
			$('.loading-screen').remove();
		}, 3500);
	},

	detailLoadIn: function(e, $main, pageContent, link) {
		var self = this;
		// console.log("function imageLoadIn");
		// Animate image to cover full screen

		// scroll($(window).height(), 0);
        // $('html,body').animate({
        //     scrollTop: link.offset().top + link.outerHeight(true) - $(window).height()
        // }, 250);
		$(link).parent('.type').addClass('center-background');

		setTimeout(function(){
			$(link).parent('.type').css('background-attachment', 'fixed');
	        $('html,body').animate({
	            scrollTop: link.offset().top
	        }, 500);

			$(link).addClass('transition');
		}, 750);

		setTimeout(function(){
			// Add new content behind current
			$main.append('<div class="secondary-results-div">' + pageContent + '</div>');

			// Hide current and nav
			$('.new-results-div').addClass('transition-out');
			$('.top-bar').css('opacity', '0');
		}, 1250);

		setTimeout(function(){
			// Remove current
			$('.new-results-div').css('opacity', '0');
			$('.new-results-div').remove();

			// Update new container class
			$('.secondary-results-div').addClass('new-results-div');
			$('.new-results-div').removeClass('secondary-results-div');

			// Slide in details
			$('.food-details').addClass('active');
		}, 1750);
	},

	detailLoadOut: function($main, pageContent) {
		// Add new content behind current
		$main.append('<div class="secondary-results-div">' + pageContent + '</div>');

		// Slide out detail pane
		$('.food-details').removeClass('active');

		setTimeout(function(){
			// slide out background
			$('.food-type').removeClass('active');
			$('body').removeClass('food-details-page');
			$('.top-bar').removeAttr('style');
		}, 500);

		setTimeout(function(){
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

APP.loadingScreen = '<div class="loading-screen"><div class="progress"></div></div>';

APP.initialLoadingScreen = '<div class="initial loading-screen"><svg xmlns="http://www.w3.org/2000/svg" width="138.8px" height="66.1px" viewBox="0 0 138.8 66.1"><g id="p"><path class="line" d="M55.4,29.8v3.9l0.2,3.9c0,0,0.1,3.6,0.1,4.7c0.1,1.2,0.1,3.7,0.3,4.9c0.1,1.1,0.6,3.2,0.8,4.2c0.2,0.9,1.1,3.7,1.1,3.7s1,2.2,1.4,2.9c0.5,0.8,1.6,2.4,2.4,2.9c0.8,0.5,2.7,1.3,3.4,0.9c0.8-0.4,1.2-2.4,1.2-3.3c0-0.8-0.5-2.2-0.8-2.9c-0.3-0.7-1.5-2.8-1.5-2.8l-1.8-2.3l-2.8-2.5l-6.2-3.3l-3-0.9l-2.7-0.6L44,42.6l-3.7-0.4l-4-0.3l-4.8-0.2l-4.2,0l-3.2,0.1l-7,0.9l-3.9,0.9c0,0-3,0.5-4.1,0.6c-0.9,0.1-2.9,0.3-3.8,0.2c-0.7-0.1-2.4-0.2-2.7-0.8c-0.3-0.7,0.9-2.3,1.4-2.9c0.4-0.6,1.6-1.4,2.2-1.8c0.6-0.4,2.4-1.6,2.4-1.6l2.9-1.8l3-1.7l2.9-1.6l3.6-1.8l3.2-1.6l3.2-1.5l3.6-1.6l3.6-1.5l3.1-1.2l3.5-1.2l3.5-1.2l3.4-1.1l4-1.3l3.9-1.1l3.6-1.1l3.8-1l3.6-0.9l4.2-1.1l3.5-0.9l4.3-1.1l4.8-1.1l3.8-1l3.5-0.9L95,6.9l4.6-1L104,5l4.1-0.7l4.5-0.7l5.4-0.7l5.6-0.4c0,0,3.5-0.1,4.6,0c0.9,0.1,2.7,0.2,3.5,0.4c0.7,0.2,2.3,0.6,2.9,1.1c0.6,0.5,1.7,1.9,1.8,2.7c0.1,0.8-0.7,2.4-1.1,3.2c-0.4,0.7-1.4,1.8-2,2.3c-0.7,0.7-3.1,2.5-3.1,2.5l-3,2l-3.7,2.3l-3.5,2.1l-3.7,2.1l-3.8,2l-3.4,1.7l-3.6,1.6l-3.4,1.6l-3.6,1.6L95,33l-3.7,1.4l-3.6,1.2l-3.9,1.5l-10.6,3.2l-3.7,1.4L65,43.3l-4.1,1.4l-9.1,3.1l-3,1.1l-3.1,1l-3.1,0.9l-2.6,0.8L37,52.2l-3,0.6c0,0-2.8,0.5-3.7,0.5c-0.9,0.1-2.6,0.1-3.5,0c-0.8-0.1-2.4-0.3-3.2-0.5c-0.8-0.2-2.3-0.8-2.9-1.3c-0.6-0.4-1.5-1.6-1.8-2.2c-0.2-0.6-0.1-2,0-2.7c0.1-0.7,0.5-1.9,0.8-2.5c0.2-0.6,0.6-1.7,1-2.2c0.9-1.1,3.2-2.8,4.4-3.7c1-0.8,4.2-3,4.2-3l3.6-2.1l3.1-1.6l3.5-1.6l3.4-1.4l4.4-1.6l4-1.3l3.8-1l5.3-1.3l4.5-0.9l4.7-0.8l5.1-0.6l4.4-0.3c0,0,3,0,4,0.1c0.9,0.1,2.6,0.3,3.4,0.7c0.8,0.4,2.4,1.7,2.6,2.6c0.2,0.9-0.7,2.6-1.1,3.4c-0.4,0.8-2.3,2.8-2.3,2.8l-3,2.9L80,35.1l-3,3.1l-1.6,1.4"/></g><g id="ri"><path class="st3 line" d="M77,64.8c0.4-0.9,1.2-2.6,1.5-3.6c0.2-0.9,0.6-2.6,0.5-3.5c-0.1-1.5-1-4.5-2-5.6c-0.5-0.5-1.9-1.2-2.6-1.4c-0.6-0.1-1.9-0.4-2.3,0c-0.4,0.4-0.1,1.8,0.2,2.3c0.3,0.6,1.4,1.7,2,1.9c0.7,0.2,2.3,0.2,3,0c0.8-0.3,2.4-1.4,2.8-2.2c0.5-0.9,0.5-4.2,0.5-4.2s-0.3,3.6-0.2,4.8c0.1,1,0.1,3.3,0.8,4.1c0.8,0.7,3.2,1,4.2,0.6c0.9-0.3,2.2-1.9,2.6-2.8c0.6-1.5,1.4-6.3,1.4-6.3s-0.1,3.2,0.1,4.2c0.3,1.5,1.6,4.4,2.3,5.8"/></g><g id="nci"><path class="st4 line" d="M95.1,61.9c0.7-0.5,2.2-2.1,2.5-3c1-2.3,1.1-9.9,1.1-9.9s0.4,7.2,2,8.8c0.4,0.4,1.6,0.8,2.2,0.7c0.9-0.1,2.6-1.3,3.1-2c1.4-1.9,2.1-9.2,2.1-9.2s-0.8,3.8-0.7,5.1c0.2,1.3,1,4.2,2.1,4.9c0.8,0.6,3.1,0.4,4,0c1-0.5,2.6-2.5,2.8-3.7c0.2-1-0.7-2.9-0.5-3.9c0.2-1.1,1.3-3.2,2.2-4c0.6-0.6,2.1-1.9,3-1.7c0.8,0.2,1.4,2.1,1.4,2.9c0.1,0.8-0.2,2.9-1,3.2c-0.7,0.3-2.8-1.4-2.8-1.4s2,1.7,2.8,1.5c0.8-0.3,1.1-2.4,1-3.2c-0.1-0.8-0.7-2.7-1.4-2.9c-0.8-0.2-2.4,1.1-3,1.7c-0.7,0.9-2,2.9-2.1,4c-0.1,1,0.1,3,0.5,3.9c0.4,0.9,1.7,2.6,2.6,3c0.9,0.4,3,0.3,3.9,0c1.8-0.7,4.1-5.3,6-4.9c1.1,0.2,1.8,2.9,2.3,3.9c0.5,0.9,1.7,3.3,2.7,3.1c0.8-0.2,1-2.4,1-3.2"/></g><g id="dot"><path d="M88.1,45.7c0,0,0.1,0,0.1,0.1c0.7,0.4,1.7,0.3,2.2-0.3c0.9-0.8,0.9-2.2-0.2-2.9c-0.9-0.5-2.1-0.4-2.7,0.5C86.9,43.9,87.2,45.1,88.1,45.7z"/></g><g id="dot2"><path d="M128.8,44.5c0.2,0.1,0.3,0.1,0.5,0.1c1.1,0.1,2.1-0.7,2.3-1.8c0.2-1.3-0.8-2.5-2.2-2.5c-1.2,0-2.1,1-2,2.2C127.5,43.4,128,44.3,128.8,44.5z"/></g></svg></div>';
