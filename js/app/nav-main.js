//
// Main Navigation
// --------------------------------------------------
//

butcher.navMain = function ($, undefined) {

  // Things to do once the page has loaded.
  //
  $(function() {
    initialize();

    $(window).resize(function() {
      initialize();
    });
  });

  // Fix or unfix the main navigation based on the screen size
  //
  function initialize() {
    var nav = $('.main-nav');
    var body = $('body');

    if ($(document).width() < 768) {
      nav.removeClass('navbar-fixed-top');
      body.css('margin-top','0');
    } else {
      nav.addClass('navbar-fixed-top');
      body.css('margin-top','76px');
    }
  }

} (window.jQuery);
