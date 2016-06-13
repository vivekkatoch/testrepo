// Use jquery.ajax to perform action without reload a page.

(function($, Drupal)

// Implement Drupal.behaviors for using jQuery.
Drupal.behaviors.example_ajax = {
  attach: function(context, settings) {

    // This function is run when key is press and then release in textfield.
	  jQuery("#field").on('keyup', function() {
		  var text = jQuery(this).val();
      jQuery.ajax({
        url: Drupal.settings.basePath + 'querys',
        type: 'post',
        async: true,
        data: "id="+text,
        success: function (data) {
          jQuery(".auto_com").html('');
        	jQuery(".auto_com").hide();

          // Check if data has contain any value/
          if (data) {
            var count = 0;
            var res = jQuery.parseJSON(data);
            var sug = '';
            jQuery(res).each(function(k,v) {
              sug += '<div id = "link'+count+'" onClick="selectname('+count+')">' +v.name+ '</div>';
              count++;
            })
            jQuery(".auto_com").append(sug);
            jQuery(".auto_com").show();
          }
        }
      });
	  });
  } 
})(jQuery, Drupal);

// This function is run when when user select a particular value.  
function selectname(a) {	
	var text = jQuery("#link"+a).html();
	jQuery("#field").val(text);
	jQuery(".auto_com").hide();
}