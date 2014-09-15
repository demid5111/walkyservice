jQuery(document).ready(function() {
	$("#save_route_button").click(function () {

		var $this = $(this);
		$this.addClass('disabled');
		//$this.popover('hide');
		
		route_points = new Array();
		for (var i=0; i<markers.length; i++){
			//saving_route.route_points[i].point_id = parseInt(markers[i].title.substring(1)); /* Route Point id parsed from Marker Title */
			var li_id = i+1;
			var li_el_id = "#point_"+li_id;
			route_points.push({
				point_id : i,
				point_lat : markers[i].getPosition().lat(),
				point_lng : markers[i].getPosition().lng(),
				/*** HARDCODED POINT NAME ***/
				
				point_name : $(li_el_id).find('.point_title').val(), 
				/*** HARDCODED DESCRIPTION ***/
				point_description : $(li_el_id).find('.point_description').val()
			});
		}

		var saving_route = new Array();
		saving_route.push({
			route_name : $('#route_name').val(),
			/*** HARDCODED USER NAME ***/
			user_name : "ADMIN",
			route_distance : (totalDistance / 1000).toString(), /* Distance in KM */
			route_duration : Math.round(totalDuration / 60), /* Duration in minutes */
			route_type : $('#selected_route_type').data('type'),
			route_points : route_points
		}); 
			

		var saving_route_json = JSON.stringify(saving_route); //Optional variable only for console
		console.log(saving_route_json);

		$.ajax ({
			url: "/jsdev/addNewRoute/",
			type: "POST",
			data: JSON.stringify(saving_route),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success : function(data) {
				alert("Route Saved");
				// REDIRECTION 
				//window.location.href = '/jsdev/';
			},
			error : function(data) {
				alert("Error. Route is NOT saved");
				$this.removeClass('disabled');
				//$this.popover('show');
			}

		});

	});
});