/*

    Main JavaScript
    VERSION 1.0.0
    AUTHORS: Nick Katarow

    DEPENDENCIES:
    - jQuery 1.7.2

	TO DO:
		- Find out why scrolling in iOS is triggering resize handler
			- Add instantiations back into resize after resolving
*/
var APP = window.APP || {};

$(document).ready(function(){
    APP.init();
});

window.APP = {
    init: function () {
        var self = this,
			ua = window.navigator.userAgent,
			msie = ua.indexOf("MSIE ");

		// Since new IE versions don't even accept conditional comment, we have to sniff if it's IE via JS
		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || ua.match(/Edge/i)) {
			$('body').append('<link rel="stylesheet" href="/_ui/dist/IE.css" media="all">');
            $('html').addClass('ie');
        }

        self.events.parent = this;

        // Init Components
        APP.nav.init();

		if (!$('.new-results-div').length) {
			$('.js-main').wrapInner('<div class="new-results-div" />');

			var newTitle = $('.new-results-div').find('h1').text();

			self.pageLoads.updatePageData(newTitle, metaDescription);
		}

        // EVENT DELEGATION
        $(window).bind('resize', function(event) {
            self.events.windowResize({width: self.getMediaWidth()});
        });

        $(window).triggerHandler('resize');
    },
    events: {
        windowResize: function (event) {
            var self = this.parent,
                i,
                ii;

			// APP.instantiations.init('default');
        }
    },
    getMediaWidth: function () {
        var self = this,
            width;

        if (typeof matchMedia !== 'undefined') {
            width = self.bruteForceMediaWidth();
        } else {
            width = window.innerWidth || document.documentElement.clientWidth;
        }

        return width;
    },
    bruteForceMediaWidth: function () {
        var i = 0,
            found = false;

        while (!found) {
            if (matchMedia('(width: ' + i + 'px)').matches) {
                found = true;
            } else {
                i++;
            }

            // Prevent infinite loop if something goes horribly wrong
            if (i === 9999) {
                break;
            }
        }

        return i;
    },
 	isScrolledIntoView: function(elem, scrollOffset) {
		if (scrollOffset == null) scrollOffset = 0;
    	var docViewTop = $(window).scrollTop(),
    		docViewBottom = docViewTop + $(window).height(),
			elemTop = $(elem).offset().top - scrollOffset,
	    	elemBottom = elemTop + $(elem).height() - scrollOffset;

    	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
};
