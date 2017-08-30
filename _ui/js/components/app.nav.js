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
    },
    hideNav: function () {
        // fn hideNav
        var self = this;

        $('#primary').removeClass('active');
        $('.trigger').removeClass('active');
    },
    showNav: function (menu) {
        // fn showNav
        var self = this;

        $('#primary').addClass('active');
        $('.trigger').addClass('active');
    }
};
