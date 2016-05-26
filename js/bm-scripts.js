
var butcherApp = function ($, undefined) {
  'use strict';

  $(function () {
    setupMainNav();

    $(window).resize(function() {
      setupMainNav();
    });
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

}(window.jQuery);
