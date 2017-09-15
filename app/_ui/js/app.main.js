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

        self.events.parent = this;

		// INSTANTIATIONS
        // Init Components
        APP.nav.init();

		// Scrolling animations
		window.sr = ScrollReveal({
			distance: '0',
			duration: 750,
			scale: 1,
			mobile: true,
			container: document.querySelector('.parallax'),
			reset: true,
		});
		if ($('.reveal').length) { sr.reveal('.reveal'); }

		if ($('.sequence').length) {
			$('.sequence').each(function(){
				sr.reveal('#' + $(this).attr('id') + ' .seq', 500);
			})
		}

		// Button Animations
		$('.parallax').scroll(function (){
			$('.btn').each(function(){
				if (self.isScrolledIntoView(this) === true) {
					$(this).addClass('draw');
				}
			});

			$('.line').each(function(){
				if (self.isScrolledIntoView(this) === true) {
					$(this).addClass('draw');
				}
			});
		});

		if ($("#inline-video").length) {
			var video = document.getElementById('inline-video');

			video.addEventListener('loadeddata', function() {
				if (video.readyState >= 2) { video.play(); }
			});
		}
		// END: INSTANTIATIONS

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

            // if (event.width >= 700 && self.nav.isMobile) {
            //     self.nav.mobileOff();
            // } else if (event.width < 700 && !self.nav.isMobile) {
            //     self.nav.mobileOn();
            // }
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
 	isScrolledIntoView: function(elem) {
    	var docViewTop = $(window).scrollTop(),
    		docViewBottom = docViewTop + $(window).height(),
			elemTop = $(elem).offset().top,
	    	elemBottom = elemTop + $(elem).height();

    	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
};
