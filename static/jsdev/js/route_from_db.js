var map;
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	
	function initialize() {
    var NY = new google.maps.LatLng(40.739112,-73.785848);
    var mapOptions = {
        zoom: 16,
        center: NY,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

	directionsDisplay = new google.maps.DirectionsRenderer();
	 directionsDisplay.setMap(map);
	
  
	//moved to html in order to render
	//var json_obj = {{ obj_as_json|safe }};
	
	waypt = [];
	var start, end;
	//marker1.setPosition(json_obj['lat0'], json_obj['lon0']);
	alert("Got " + Object.keys(json_obj).length + " points");
	if (Object.keys(json_obj).length==0) return;
	//alert(Object.keys(json_obj));
	//alert(json_obj["point_1"]["lat"]);
	for (var i=0; i<Object.keys(json_obj).length; i++ ) {
		if (i==0)  
			start = new google.maps.LatLng(json_obj["point_"+i]["lat"], json_obj["point_"+i]["lon"], true);
		else if (i==Object.keys(json_obj).length-1)
			end = new google.maps.LatLng(json_obj["point_"+i]["lat"], json_obj["point_"+i]["lon"], true);
		else
			waypt.push({
				location: new google.maps.LatLng(json_obj["point_"+i]["lat"], json_obj["point_"+i]["lon"], true),
				stopover: true
			});
	}

	
	//waypt[0] = new google.maps.LatLng(json_obj["lat0"], json_obj["lon0"], true);
	//waypt[1] = new google.maps.LatLng(json_obj["lat1"], json_obj["lon1"], true);
	
	var request = {
    origin: start,
    destination: end,
	waypoints: waypt,
    travelMode: google.maps.TravelMode.WALKING
  };
  
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
 
 }
google.maps.event.addDomListener(window, 'load', initialize);