/**
 * jQuery plugin for uploading files via AJAX request
 *
 * @author James Cryer <james.cryer@boxuk.com
 * @version 0.1
 */
(function ($) {
	$.AjaxFileUploader = function (el, options) {

		var form     = $(el),
			input    = $(options.input, form),
			formData = new FormData(),
			upload   = function() {
				$.ajax({
					url: form.attr('action'),
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: options.onSuccess,
					error: options.onFailure
				});
			};
		
		// Hide button to handle upload on file change
		if(options.hideButton) {
			$(options.buttons, form).hide();
		}
		else {
			// Handle ajax upload on submit
			form.submit(function(e) {
				upload();
				e.preventDefault();
			});
		}
			
		// When input changes, add it to the form data
		input.live("change", function (e) {
			var i   = 0,
				len = e.target.files.length, img, reader, file;
			
			$.each(e.target.files, function(i, file) {
				formData.append(input.attr('name') + '[]', file);
			});

			if(options.hideButton) {
				upload();
			}
		});
	};

	// Options
	$.AjaxFileUploader.defaults = {
		hideButton: false,
		input: "#files",
        onSuccess: function(result) {},
        onFailure: function(result) {},
        buttons: 'input[type="submit"], input[type="image"], button[type="submit"]'
    };

    $.fn.ajaxFileUploader = function (options) {
		
		if(!window.FormData) {
			return false;
		}
		options = $.extend({}, $.AjaxFileUploader.defaults, options);

        return this.each(function () {
            (new $.AjaxFileUploader(this, options));
        });
    };
})(jQuery);