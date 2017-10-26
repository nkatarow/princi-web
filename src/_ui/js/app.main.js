/*

    Main JavaScript
    VERSION 1.0.0
    AUTHORS: Nick Katarow

    DEPENDENCIES:
    - jQuery 1.7.2

*/
var APP = window.APP || {};

$(document).ready(function(){
    APP.init();
});

window.APP = {
    init: function () {
        var self = this,
			windowWidth = self.getMediaWidth();

        self.events.parent = this;

		console.log("init");

        // Init Components
		self.detectIE();
        APP.nav.init();

		if (!$('.new-results-div').length) {
			$('.js-main').wrapInner('<div class="new-results-div" />');

			var newTitle = $('.new-results-div').find('h1').text();

			self.pageLoads.updatePageData(newTitle, metaDescription);
		}

        // EVENT DELEGATION
        $(window).bind('resize', function(event) {
            self.events.windowResize({width: self.getMediaWidth()}, windowWidth);
        });

        $(window).triggerHandler('resize');
    },
    events: {
        windowResize: function (event, windowWidth) {
            var self = this.parent;

			if (event.width != windowWidth) {
				windowWidth = event.width;

				APP.instantiations.init('default');
			}
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
	},
	detectIE: function() {
		console.log("detectIE");
	    var ieV,
			ua = window.navigator.userAgent,
			msie = ua.indexOf('MSIE '),
			trident = ua.indexOf('Trident/'),
			edge = ua.indexOf('Edge/');

	    if (msie > 0) ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	    if (edge > 0) ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	    if (trident > 0) {
	        var rv = ua.indexOf('rv:');
			ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	    }


		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || ua.match(/Edge/i)) {
			$('body').append('<link rel="stylesheet" href="/_ui/ie/IE.css" media="all">');
        }

        $('html').addClass(' ie ie' + ieV);

	    // other browser
	    return false;
	}
};
