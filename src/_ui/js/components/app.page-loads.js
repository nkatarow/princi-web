/*

    Page Loading
    VERSION 1.0.0
    AUTHORS: Nick Katarow

    DEPENDENCIES:
    - jQuery 1.11.1
    - APP.ajax.js

*/

APP.pageLoads = {
	updatePageData: function(newTitle, newDescription) {
		var trackingTitle = "",
			depth = $(location).prop('pathname').split('/').length - 1,
			titleLower = newTitle.replace(/\s+/g, '-').toLowerCase(),
			offeringLocation = titleLower;

		if (newTitle == 'Princi') {
			trackingTitle = "Homepage";
		} else if (newTitle == "Rocco Princi") {
			trackingTitle = "About"
		} else {
			trackingTitle = newTitle;
		}

		document.title = " ";
		$('body').attr('class', ' ');
		$('body').attr('data-page-template', trackingTitle);
		$('body').addClass(titleLower);

		if (newTitle != "Princi") {
			document.title = newTitle + ' | Princi';
		} else {
			titleLower = 'homepage';
			document.title = newTitle;
		}

    	$('meta[name=description]').attr('content', newDescription);
    	$('meta[property="og:description"]').attr('content', newDescription);
    	$('meta[name="twitter:description"]').attr('content', newDescription);
	},

    defaultLoadIn: function($main) {
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
		var self = this;

		/* ----- Where the new content is added ----- */
		$main.html(pageContent);

		var newTitle = $main.find('h1').text();

		self.updatePageData(newTitle, metaDescription);

		/* ----- Removes the temp height from $main ----- */
		$main.css('height', '');

		setTimeout(function(){
			$main.css('opacity', '1');
		}, 1000);
	},

	detailLoadIn: function($main, pageContent, link) {
		var self = this,
			animOffset;

		// Add new content behind currentf
		$main.append('<div class="secondary-results-div">' + pageContent + '</div>');

		// Bring image to top
		if (APP.getMediaWidth() < 748.8) {
			$('html,body').animate({
	            scrollTop: link.offset().top  + $('.parallax').scrollTop()
	        }, 500);
		} else {
			$('.parallax').animate({
	            scrollTop: link.offset().top + $('.parallax').scrollTop()
	        }, 500);
		}

		$('.top-bar').addClass('hidden');
		$('.plus-box').css('opacity', '0');
		$(link).addClass('no-hover');
		$('.foods .accent-header').addClass('hide');

		setTimeout(function(){
			// Animate image to cover full screen - 1s
			$(link).parent('.type').addClass('center-background');

			$(link).addClass('transition'); //.5s
		}, 500);

		setTimeout(function(){
			$('.secondary-results-div').addClass('transition-in'); // 250ms

			var newTitle = $('.secondary-results-div').find('h1').text();
			self.updatePageData(newTitle, metaDescription);

			/* ----- Set height of $main to ensure the footer doesn't jump up -----  */
			// var newResultsHeight = $('.secondary-results-div').outerHeight();
			// $main.height(newResultsHeight);
		}, 1750);

		setTimeout(function(){
			// Hide current / Show new
			$('.new-results-div').addClass('transition-out');

			// Remove current
			$(link).removeClass('transition'); //.5s

			// Update new container class
			$('.center-background').removeClass('center-background');

			// Slide in details
			$('.food-details').addClass('active');
			$('#zoom-btn').css('opacity', '1');
		}, 2000);
	},

	detailLoadOut: function($main, pageContent) {
		var self = this,
			freshLoad = false;
			title = $('body').find('h1').text(),
			titleLower = title.replace(/\s+/g, '-').toLowerCase(),
			offeringLocation = titleLower;

		if(($('.new-results-div').length) && (!$('.secondary-results-div').length)) {
			freshLoad = true;
			// Add new content behind current
			$main.append('<div class="secondary-results-div">' + pageContent + '</div>');
		}

		var newTitle = $('.secondary-results-div').find('h1').text();
		self.updatePageData('Offerings', metaDescription);

		/* ----- Set height of $main to ensure the footer doesn't jump up -----  */
		// var newResultsHeight = $('.secondary-results-div').outerHeight();
		// $main.height(newResultsHeight);

		// Slide out detail pane
		$('.food-details').removeClass('active');

		setTimeout(function(){
			// slide out background
			$('.food-type').removeClass('active');
		}, 500);

		setTimeout(function(){
			if(freshLoad) {
				$('.food-type').remove();
				$('.new-results-div').remove();
				$('.secondary-results-div').addClass('new-results-div');
				$('.new-results-div').removeClass('secondary-results-div');
			} else {
				$('.accent-header').removeClass('hide');
				$('.plus-box').css('opacity', '1');
				$('.new-results-div').removeClass('transition-out');
				if ($('.top-bar').hasClass('hidden')) $('.top-bar').removeClass('hidden');
				$('.secondary-results-div').remove();
				if ($('.top-bar').hasClass('hidden')) $('.top-bar').removeClass('hidden');
			}
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
