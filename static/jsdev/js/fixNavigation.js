/*
Created: 0:00 0.0.0
Author: Tarkan Y.
Last modified: 15:55 31.08.14
Author: Demidovskij A.
*/
function sticky_relocate() {
	//var $navigationBar = $('#navigation');
	//var $navigationBarClone = $navigationBar.clone().addClass('hide');

    var window_top = $(window).scrollTop();
    var div_top = $('#navigation-anchor').offset().top;
	var navbarHeight = $('#navigation').height();
	var navbarWidth = $('#navigation').width();
    if (window_top > div_top) {
    	//$navigationBar.addClass('hide');
        $('#navigation').css("height", navbarHeight);
		$('#navigation').css("width", navbarWidth);
		$('#navigation').addClass('fix');
		//$navigationBarClone.removeClass('hide').addClass('fix', 600);
		
    } else {
    	//$navigationBar.removeClass('hide');
        //$navigationBarClone.addClass('hide').removeClass('fix');
        $('#navigation').removeClass('fix');

    }
}

$(function () {

    $(window).scroll(sticky_relocate);
    sticky_relocate();
});


jQuery(document).ready(function() {
	var offset = 200;
	var duration = 500;
	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() > offset) {
			jQuery('.scroll-to-top').fadeIn(duration);
		} else {
			jQuery('.scroll-to-top').fadeOut(duration);
		}
	});

	jQuery('.scroll-to-top').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: 0}, duration);
		return false;
	});
});

//****  ROUTE TYPE ANIMATION
//function gets the chosen route type by its div id and makes 
// "get" query, the response is the rendered in template django
var selectType = function (event) {
    
    event.preventDefault();	
    $selected_types = $('#route_type').find('.selected');
    //If nothing selected
    if($selected_types.length == 0 ){
    	$(this).animate({
    		'left': 0
    	}, 400);
    	$(this).addClass("selected");
    }else{
    	$selected_types.removeClass('selected').animate({
    		'left': -36
    	}, 400);
    	$(this).animate({
    		'left': 0
    	}, 400);
    	$(this).addClass("selected");
    }  
    var classList = this.className.split(' ')
    var type = "pedestrian"
    if (classList.indexOf("type_pedestrian") > -1  ){
        // alert("pedestrian call")
        type = "pedestrian"
    }
    else if (classList.indexOf("type_bicycle") > -1  ){
        // alert("bicycle")
        type = "bicycle"
    }
    else if (classList.indexOf("type_car") > -1  ){
        // alert("car")
        type = "car"
    }
    $.ajax({
      type: "get",
      url: type
      success : function(data, status, xhr){
               $('#mapbox').html(data);
             }
    })

}

$(document).on('click', '.type_btn', selectType);
// $(document).on('click', 'cssmenu', selectType);


var selectCategoty = function(event) {
    event.preventDefault(); 
    alert("Category chosen!")
    // $selected_types = $('#category_menu').find('.selected');

}