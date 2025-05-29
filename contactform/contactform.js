jQuery(document).ready(function($) {
  "use strict";

  // Contact Form Submission
  $('form.contactForm').submit(function() {
    var form = $(this),
      formGroups = form.find('.form-group'),
      error = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    formGroups.find('input').each(function() {
      var input = $(this),
        rule = input.attr('data-rule');

      if (rule !== undefined) {
        var inputError = false,
          pos = rule.indexOf(':'),
          exp = (pos >= 0) ? rule.substr(pos + 1) : '';

        rule = (pos >= 0) ? rule.substr(0, pos) : rule;

        switch (rule) {
          case 'required':
            if (input.val() === '') {
              error = inputError = true;
            }
            break;

          case 'minlen':
            if (input.val().length < parseInt(exp)) {
              error = inputError = true;
            }
            break;

          case 'email':
            if (!emailExp.test(input.val())) {
              error = inputError = true;
            }
            break;

          case 'checked':
            if (!input.is(':checked')) {
              error = inputError = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(input.val())) {
              error = inputError = true;
            }
            break;
        }

        input.next('.validation').html((inputError ? (input.attr('data-msg') || 'Wrong Input') : '')).show('blind');
      }
    });

    formGroups.find('textarea').each(function() {
      var textarea = $(this),
        rule = textarea.attr('data-rule');

      if (rule !== undefined) {
        var textareaError = false,
          pos = rule.indexOf(':'),
          exp = (pos >= 0) ? rule.substr(pos + 1) : '';

        rule = (pos >= 0) ? rule.substr(0, pos) : rule;

        switch (rule) {
          case 'required':
            if (textarea.val() === '') {
              error = textareaError = true;
            }
            break;

          case 'minlen':
            if (textarea.val().length < parseInt(exp)) {
              error = textareaError = true;
            }
            break;
        }

        textarea.next('.validation').html((textareaError ? (textarea.attr('data-msg') || 'Wrong Input') : '')).show('blind');
      }
    });

    if (error) {
      return false;
    } else {
      var formData = form.serialize();
      var action = form.attr('action') || 'contactform/contactform.php';

      $.ajax({
        type: "POST",
        url: action,
        data: formData,
        success: function(msg) {
          if (msg === 'OK') {
            $("#sendmessage").addClass("show");
            $("#errormessage").removeClass("show");
            form.find("input, textarea").val("");
          } else {
            $("#sendmessage").removeClass("show");
            $("#errormessage").addClass("show");
            $('#errormessage').html(msg);
          }
        }
      });

      return false;
    }
  });

});
