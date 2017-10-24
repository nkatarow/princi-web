/*

    Navigation Component
    VERSION 1.0.0
    AUTHORS: Nick Katarow

    DEPENDENCIES:
    - jQuery 1.11.1
    - APP.main.js

*/

APP.nav = {
    init: function () {
        var self = this;

        // EVENT DELEGATION
        $('.trigger').click(function (event) {
            event.preventDefault();

            if (!$(this).hasClass('active')) {
                self.showNav();
            } else {
                self.hideNav();
            }
        });

		$('#main a').hover(function(){
			if ($('#primary').hasClass('active')) {
				var target = this.text,
					target = target.replace(' ', '-');
					target = target.toLowerCase();

				$('.nav-hover .img.' + target).toggleClass('active');
			}
		});
    },
    hideNav: function () {
        var self = this;

        $('#primary').removeClass('active');
		$('.trigger').removeClass('active');
    	$('.top-bar').removeClass('white');

		setTimeout(function(){
    		$('.top-bar').removeClass('active');
		}, 500);
    },
    showNav: function (menu) {
        var self = this;

		$('#primary').addClass('active');
		$('.trigger').addClass('active');
    	$('.top-bar').addClass('active');
    	$('.top-bar').addClass('white');
    }
};
