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
		console.log('instantiations');
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
			$('.split-pic').each(function(){
				if (APP.isScrolledIntoView(this) === true) {
					$(this).children('.copy').addClass('draw');
				}
			});
		});

		if ($('#heritage-hero').length) {
			if (APP.isScrolledIntoView($('#heritage-hero')) === true) {
				$('#heritage-hero p').addClass('draw');
			}
		}

		window.sr = ScrollReveal({
			distance: '0',
			duration: 700,
			scale: 1,
			mobile: true,
			container: document.querySelector(animationContainer),
			reset: true,
			viewFactor: 0.2,
		});
		if ($('.reveal').length) { sr.reveal('.reveal'); }

		if ($('.sequence').length) {
			$('.sequence').each(function(){
				sr.reveal('#' + $(this).attr('id') + ' .seq', 500);
			})
		}

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
			autoplaySpeed: 500,
			// animateIn: 'fadeIn',
			center: true,
			loop: true,
			dots: false,
			items: 1
		});

		// END: INSTANTIATIONS
	}
}
