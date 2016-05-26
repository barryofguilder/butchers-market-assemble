
var butcherApp = function ($, undefined) {
  'use strict';

  $(function () {
    setupMainNav();

    $(window).resize(function() {
      setupMainNav();
    });

    setupParallax();
  });

  function setupMainNav() {
    // Fix & unfix navbar based on the screen size
    if ($(document).width() < 768) {
      $('.main-nav').removeClass('navbar-fixed-top');
      $('body').css('margin-top','0');
    } else {
      $('.main-nav').addClass('navbar-fixed-top');
      $('body').css('margin-top','76px');
    }
  }

  function setupParallax() {
    // Background images scrolling parallax
    $(window).stellar({ horizontalScrolling: false });
  }

}(window.jQuery);
