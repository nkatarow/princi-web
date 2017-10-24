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

		document.title = "";
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

		// Add new content behind current
		$main.append('<div class="secondary-results-div">' + pageContent + '</div>');

		// Bring image to top
		if (APP.getMediaWidth() < 748.8) {
			animOffset = 48;
		} else {
			animOffset = 63;
		}

		$('.parallax').animate({
            scrollTop: link.offset().top + $('.parallax').scrollTop() - animOffset
        }, 500);

		$('.plus-box').css('opacity', '0');
		$(link).addClass('no-hover');
		$('.accent-header').addClass('hide');

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
			var newResultsHeight = $('.secondary-results-div').outerHeight();
			$main.height(newResultsHeight);
		}, 1750);

		setTimeout(function(){
			// Hide current / Show new
			$('.new-results-div').addClass('transition-out');

			// Remove current
			$('.new-results-div').remove();

			// Update new container class
			$('.secondary-results-div').addClass('new-results-div');
			$('.new-results-div').removeClass('secondary-results-div');

			// Slide in details
			$('.food-details').addClass('active');
			$('#zoom-btn').css('opacity', '1');
		}, 2000);
	},

	detailLoadOut: function($main, pageContent) {
		var self = this,
			title = $('body').find('h1').text(),
			titleLower = title.replace(/\s+/g, '-').toLowerCase(),
			offeringLocation = titleLower;

		// Add new content behind current
		$main.append('<div class="secondary-results-div">' + pageContent + '</div>');

		var newTitle = $('.secondary-results-div').find('h1').text();
		self.updatePageData(newTitle, metaDescription);

		/* ----- Set height of $main to ensure the footer doesn't jump up -----  */
		var newResultsHeight = $('.secondary-results-div').outerHeight();
		$main.height(newResultsHeight);

		// scroll(0,0);
		if (APP.getMediaWidth() < 748.8) {
			$('.parallax').animate({
	        	scrollTop: $('#' + offeringLocation).offset().top
	        });
		} else {
			$('.parallax').animate({
	        	scrollTop: ($('#' + offeringLocation).offset().top) + ($('#' + offeringLocation).height())
	        });
		}

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
