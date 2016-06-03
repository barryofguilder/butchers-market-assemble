//
// Parallax
// --------------------------------------------------
//

butcher.parallax = function ($, undefined) {

  // Things to do once the page has loaded.
  //
  $(function() {
    // Background images scrolling parallax
    $(window).stellar({ horizontalScrolling: false });
  });

} (window.jQuery);
