$(document).ready(function() {

	//get all link with class panel
	$('#continue_button').click(function () {

                //reset and highlight the clicked link
		$('a.panel').removeClass('selected');
		$(this).addClass('selected');
		
		//grab the current item, to be used in resize function
		current = $(this);
		
                //scroll it to the destination
		$('#step_slider_wrapper').scrollTo($(this).attr('href'), 800);		
		
                //cancel the link default behavior
		return false;
	});


	//resize all the items according to the new browser size
	$(window).resize(function () {
		
		//call the resizePanel function
		resizePanel();
	});
	
});

function resizePanel() {

	//get the browser width and height
	width = $(window).width();
	height = $(window).height();

	//get the mask width: width * total of items
	mask_width = width * $('.step_item').length;
		
	//set the dimension	
	$('#step_slider_wrapper, .step_item').css({width: width, height: height});
	$('#mask').css({width: mask_width, height: height});
	
	//if the item is displayed incorrectly, set it to the corrent pos
	$('#step_slider_wrapper').scrollTo($('a.selected').attr('href'), 0);
		
}