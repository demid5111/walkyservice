	var map;
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	
	function initialize() {
	    var NY = new google.maps.LatLng(40.739112,-73.785848);
	    var mapOptions = {
	    	minZoom: 2,
	        zoom: 10,
	        center: NY,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	    map = new google.maps.Map(document.getElementById('route_map'),mapOptions);

		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
		
		
		waypt = [];
		var start, end;

		//var route_json = JSON.parse(json_obj);
		alert("Got " + Object.keys(json_obj['route_points']).length + " points");
		if (Object.keys(json_obj['route_points']).length==0) return;

		var route_points = json_obj['route_points'];
		
		//alert("Got " + json_obj[pointsId[0]]["lat"] + " points");
		for (var p in route_points){
			//Check if point is first			
			if (route_points[p]['point_id']==0){
				start = new google.maps.LatLng(route_points[p]['point_lat'], route_points[p]['point_lng'], true);
				console.log(start);
			}
			//Check if point is last
			else if (route_points[p]['point_id']==route_points.length-1){
				end = new google.maps.LatLng(route_points[p]['point_lat'], route_points[p]['point_lng'], true);
				console.log(end);
			}
			else{
				waypt.push({
					location: new google.maps.LatLng(route_points[p]['point_lat'], route_points[p]['point_lng'], true),
					stopover: true
				});
			}
		}
		
		/*
		for (var i=0; i < pointsId.length;i++) {
			//alert ("I: " + i)
			if (i == 0) {
				start = new google.maps.LatLng(json_obj[pointsId[i]]["lat"], json_obj[pointsId[i]]["lon"], true);
				//alert ("Start " + start + i)
				console.log(start)
			}
			else if (i == pointsId.length -1)
			{
				end = new google.maps.LatLng(json_obj[pointsId[i]]["lat"], 	json_obj[pointsId[i]]["lon"], true);
				//alert ("End " + end + i)
			}
			else {
				waypt.push({
					location: new google.maps.LatLng(json_obj[pointsId[i]]["lat"], json_obj[pointsId[i]]["lon"], true),
					stopover: true
				});
			}
		}
		console.log(start)
		console.log(end)
		*/
		var route_type;
		if (json_obj['route_type']=="pedestrian"){
			route_type = google.maps.TravelMode.WALKING;
		} else if (json_obj['route_type']=="bicycle") {
			route_type = google.maps.TravelMode.BICYCLING;
		} else if (json_obj['route_type']=="car"){
			route_type = google.maps.TravelMode.DRIVING;
		}
		//this is how to manipulate with google maps
		//we should construct such a request
		var request = {
		    origin: start,
		    destination: end,
			waypoints: waypt,
		    travelMode: route_type
	  	};
	  
	  directionsService.route(request, function(result, status) {
	  	

	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(result);
	    }
	    if (status == google.maps.DirectionsStatus.ZERO_RESULT) {
	      alert("Error. Not able to build route (ZERO_RESULT)")
	    }
	  });
 
 }
google.maps.event.addDomListener(window, 'load', initialize);