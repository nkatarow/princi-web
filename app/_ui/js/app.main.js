/*

    Main JavaScript
    VERSION 1.0.0
    AUTHORS: Nick Katarow, Gavin Suntop

    DEPENDENCIES:
    - jQuery 1.7.2

*/
var APP = window.APP || {};

$(document).ready(function(){
    APP.init();
});

window.APP = {
    init: function () {
        var self = this;

        // self.events.parent = this;

        // Init Components
        APP.nav.init();

		if (!$('.new-results-div').length) {
			$('.js-main').wrapInner('<div class="new-results-div" />');
		}

		// if ($('.food-copy').length && (self.getMediaWidth() >= 800)) {
		// 	self.re
		// }
        // EVENT DELEGATION
        // $(window).bind('resize', function(event) {
        //     self.events.windowResize({width: self.getMediaWidth()});
        // });
		//
        // $(window).triggerHandler('resize');
    },
    // events: {
    //     windowResize: function (event) {
    //         var self = this.parent,
    //             i,
    //             ii;
    //     }
    // },
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
 	isScrolledIntoView: function(elem) {
    	var docViewTop = $(window).scrollTop(),
    		docViewBottom = docViewTop + $(window).height(),
			elemTop = $(elem).offset().top,
	    	elemBottom = elemTop + $(elem).height();

    	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
};
