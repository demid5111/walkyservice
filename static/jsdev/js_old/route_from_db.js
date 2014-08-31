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
	
	
	waypt = [];
	var start, end;

	alert("Got " + Object.keys(json_obj).length + " points");
	if (Object.keys(json_obj).length==0) return;

	pointsId = Object.keys(json_obj)
	
	alert("Got " + json_obj[pointsId[0]]["lat"] + " points");

	for (var i=0; i < pointsId.length;i++) {
		alert ("I: " + i)
		if (i == 0) {
			start = new google.maps.LatLng(json_obj[pointsId[i]]["lat"], json_obj[pointsId[i]]["lon"], true);
			alert ("Start " + start + i)
			console.log(start)
		}
		else if (i == pointsId.length -1)
		{
			end = new google.maps.LatLng(json_obj[pointsId[i]]["lat"], 	json_obj[pointsId[i]]["lon"], true);
			alert ("End " + end + i)
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
	
	//this is how to manipulate with google maps
	//we should construct such a request
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
    if (status == google.maps.DirectionsStatus.ZERO_RESULT) {
      alert("not able to build route")
    }
  });
 
 }
google.maps.event.addDomListener(window, 'load', initialize);