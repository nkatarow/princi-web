/*

    FILE: app.instantiations.js
    DESCRIPTION:
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - jQuery 1.9.1
    - app.main.js

    TO DO:

*/

APP.instantiations = {
    init: function() {
		// console.log('instantiations');
		var self = this,
			prev = 0,
			wowContainer,
			scrollContainer;

		if ($('.parallax').length) {
			var perspectiveTest = window.getComputedStyle(document.querySelector('.parallax'),':before').getPropertyValue('content');
		}

		if (perspectiveTest) {
			// animationContainer = ".parallax";
			scrollContainer = ".parallax";
			wowContainer = ".parallax";
		} else {
			// animationContainer = "html";
			scrollContainer = window;
			wowContainer = null;
		}

		wow = new WOW({
      		scrollContainer: wowContainer,
			mobile: false
		});
		wow.init();

		offerwow = new WOW({
			boxClass: 'offerwow',
      		scrollContainer: wowContainer,
			mobile: false,
			offset: -50
		});
		offerwow.init();

		// Scrolling animations
		$(scrollContainer).on('scroll', function(){
			//sneaky nav
			var scrollTop = $(scrollContainer).scrollTop();

			if (prev > 0) {
				$('.top-bar').toggleClass('hidden', scrollTop > prev);
			}

			prev = scrollTop;

			// buttons
			$('.btn').each(function(){
				if (APP.isScrolledIntoView(this) === true) {
					$(this).addClass('draw');
				}
			});

			// lines
			$('.line').each(function(){
				if (APP.isScrolledIntoView(this) === true) {
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

		// Carousel
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
			autoplay: true,
			autoplaySpeed: 130,
			mouseDrag: false,
			center: true,
			loop: true,
			dots: false,
			nav: true,
			items: 1
		});

		// END: INSTANTIATIONS
	}
}
