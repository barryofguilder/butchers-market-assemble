//
// Feedback Form
// --------------------------------------------------
//

butcher.feedback = function ($, undefined) {
  var FEEDBACK_MESSAGES = '#feedback-messages';
  var FEEDBACK_FORM = '#feedback-form';

  // Things to do once the page has loaded.
  //
  $(function() {
    handleSubmit();
    validateForm();
  });

  // Handles submitting the feedback form
  //
  function handleSubmit() {
    $(FEEDBACK_FORM).submit(function(e){
      // Prevent the form from doing it's default action
      e.preventDefault();

      var form = $(this);
      var formData = form.serialize();
      var isError = false;

      setSendingState(true);

      $.ajax({
        type: 'POST',
        url: 'assets/code/feedback.php',
        data: formData,
        success: function(response){
          var data = $.parseJSON(response);
          isError = data.error;

          setSendingState(false);

          if (isError) {
            showMessage(data.message, isError);
          } else {
            showMessage('Thank you for your feedback!', isError);
            clearForm();
          }
        },
        error: function(){
          setSendingState(false);

          isError = true;
          showMessage('Something went wrong trying to submit. Please try again later.', isError);
        }
      });
    });
  }

  // Validates the feedback form to make sure the required
  // fields have been provided
  //
  function validateForm() {
    $(FEEDBACK_FORM).validate({
      rules: {
        feedback_name: { required: true },
        feedback_email: { required: true, email: true },
        feedback_message: { required: true }
      },

      highlight: function(element) {
        $(element).closest('.form-group').removeClass('success').addClass('error');
      },

      success: function(element) {
        element.addClass('valid').closest('.form-group').removeClass('error').addClass('success');
      }
    });
  }

  // Sets the sending state of the form. If the form is sending,
  // the fields become disabled and the button text changes.
  //
  // @isSending - whether or not the feedback is sending
  //
  function setSendingState(isSending) {
    var button = $('.feedback-btn');
    var fields = $('.feedback-form .form-control');

    if (isSending) {
      fields.prop('disabled', true);
      button.prop('disabled', true);
      button.html('Sending...');
    } else {
      fields.prop('disabled', false);
      button.prop('disabled', false);
      button.html('Send');
    }
  }

  // Clears the form fields
  //
  function clearForm() {
    $('.feedback-form .form-control').val('');
  }

  // Shows a message to the user
  //
  // @message - the message to display
  // @isError - whether or not this is an error message or a success message
  //
  function showMessage(message, isError) {
    var container = $(FEEDBACK_MESSAGES);
    var alert = container.find('.alert');
    var SUCCESS = 'alert-success';
    var ERROR = 'alert-danger';

    // Apply the CSS classes based on whether this is an
    // error message or a success message.
    if (isError) {
      alert.addClass(ERROR);
      alert.removeClass(SUCCESS);
    } else {
      alert.addClass(SUCCESS);
      alert.removeClass(ERROR);
    }

    // Show the message
    alert.html(message);
    container.removeClass('hidden');
  }

} (window.jQuery);
