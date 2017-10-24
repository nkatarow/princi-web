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
		var self = this,
			prev = 0,
			wowContainer,
			scrollContainer;

		if ($('.parallax').length) {
			var perspectiveTest = window.getComputedStyle(document.querySelector('.parallax'),':before').getPropertyValue('content');
		}

		if (perspectiveTest) {
			scrollContainer = ".parallax";
			wowContainer = ".parallax";
		} else {
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
					$('#zoom-btn').css('opacity', '1');
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

		if ($("#inline-video").length) {
			var video = document.getElementById('inline-video'),
				windowHeight = $(window).height(),
				videoOffset = $(video).offset().top * 2,
				videoHeight = (windowHeight - videoOffset) * .85;

			$('.video-text').css('height', videoHeight);

			setTimeout(function(){
				video.play();
			}, 1000);
		}

		// Carousel
		$('.owl-carousel').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			autoplay: true,
			autoplayTimeout: 2500,
			mouseDrag: false,
			center: true,
			loop: true,
			dots: false,
			nav: true,
			items: 1
		});

		$("#zoom-btn").click(function(){
			$(this).toggleClass('active');
			$('.food-details').toggleClass('active');
		});

	}
}
