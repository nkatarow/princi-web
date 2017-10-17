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
    init: function(pageTransitionType) {
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


		if (pageTransitionType != 'detailLoadIn') {
			wow = new WOW({
	      		scrollContainer: wowContainer
			});
			wow.init();

			if (($('.food-details').length) && !($('.food-details').hasClass('active'))) {
				$('body').addClass('food-details-page');

				setTimeout(function(){
					$('.food-details').addClass('active');
				}, 500);
			}
		}

		// Scrolling animations
		$(scrollContainer).on('scroll', function(){
			//sneaky nav
			var scrollTop = $(scrollContainer).scrollTop();

			if (prev > 100) {
				$('.top-bar').toggleClass('hidden', scrollTop > prev);
			}

			prev = scrollTop;

			// buttons
			$('.btn').each(function(){
				if (APP.isScrolledIntoView(this) === true) {
					$(this).addClass('draw');
				}
			});
			$('.plus-box .plus').each(function(){
				if (APP.isScrolledIntoView(this) === true) {
					$(this).addClass('animate');
				}
			});

			// lines
			$('.line').each(function(){
				if (APP.isScrolledIntoView(this) === true) {
					$(this).addClass('draw');
				}
			});

			// masks
			$('.mask').each(function(){
				if (APP.isScrolledIntoView(this, '200') === true) {
					$(this).addClass('reveal');
				}
			});

			// hero parallax
			if ($('#intro').length) {
			    var scrolled = $('.parallax').scrollTop();
			    $('.hero').css('top', -(scrolled * 0.2) + 'px');
			}
			if ($('.food-hero').length) {
			    var scrolled = $('.parallax').scrollTop();
			    $('.owl-carousel').css('top', -(scrolled * 0.2) + 'px');
			}
			if ($('#heritage-hero').length) {
			    var scrolled = $('.parallax').scrollTop();
			    $('#heritage-hero .img').css('top', -(scrolled * 0.2) + 'px');
			}
		});

		// if ($("#inline-video").length) {
		// 	var video = document.getElementById('inline-video');
		//
		// 	video.addEventListener('loadeddata', function() {
		// 		console.log(video.readyState);
		// 		if (video.readyState > 2) { video.play(); }
		// 	});
		// }

		// Carousel
		$('.owl-carousel').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			autoplay: true,
			autoplayTimeout: 3000,
			mouseDrag: false,
			center: true,
			loop: true,
			dots: false,
			nav: true,
			items: 1
		});
	}
}
