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
			animationContainer,
			scrollContainer;

		if ($('.parallax').length) {
			var perspectiveTest = window.getComputedStyle(document.querySelector('.parallax'),':before').getPropertyValue('content');
		}

		if (perspectiveTest) {
			animationContainer = ".parallax";
			scrollContainer = ".parallax";
		} else {
			animationContainer = "html";
			scrollContainer = window;
		}

		wow = new WOW({
      		scrollContainer: scrollContainer
		});
		wow.init();

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
			autoplaySpeed: 200,
			// animateIn: 'fadeIn',
			center: true,
			loop: true,
			dots: false,
			items: 1
		});

		// END: INSTANTIATIONS
	}
}
