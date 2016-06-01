
var butcherApp = function ($, undefined) {
  'use strict';

  $(function () {
    setupMainNav();

    $(window).resize(function() {
      setupMainNav();
    });

    setupParallax();
    setupNewsletter();
    setupFeedback();
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

  function setupNewsletter() {
    $('.newsletter-form').submit(function() {
      var str = $(this).serialize();

      $.ajax({
        type: 'POST',
        url: 'assets/newsletter.php',
        data: str,
        success: function(response) {
          if (response == 'PRINYAL') {
            // Success Message
            result = '<div class="alert alert-success">Well done! You\'re singned up!</div>';
            setTimeout(function () {
              location.reload(true);
            }, 5000);
          } else {
            result = response;
          }

          $('#newsletter-messages').html(result);
        }
      });

      return false;
    });
  }

  function setupFeedback() {
    $('.feedback-form').submit(function() {
      var str = $(this).serialize();

      $.ajax({
        type: 'POST',
        url: 'assets/feedback.php',
        data: str,
        success: function(response) {
          if (response == 'PRINYAL') {
            // Success message
            result = '<div class="alert alert-success">Thank you! We will answer you soon!</div>';
            setTimeout(function () {
              location.reload(true);
            }, 5000);
          } else {
            result = response;
          }

          $('#feedback_messages').html(result);
        }
      });

      return false;
    });

    // Feedback form validate
    $('.feedback-form').validate({
      rules: {
        name:       {required: true},
        email:      {required: true, email: true },
        message:    {required: true}
      },

      highlight: function(element) {
        $(element).closest('.form-group').removeClass('success').addClass('error');
      },

      success: function(element) {
        element
          .addClass('valid')
          .closest('.form-group').removeClass('error').addClass('success');
      }
    });
  }

}(window.jQuery);
