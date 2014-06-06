var map;
var markers = [];
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var path = new google.maps.MVCArray();


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
	
    google.maps.event.addListener(map, 'click', function(event) {
                addMarker(event.latLng);
    });

	    
}

function addMarker(location) {

/* 	alert("works");
 */	
    var marker = new google.maps.Marker({
		animation: google.maps.Animation.DROP,
		draggable: true,
        position: location,
        map: map
		
    });
    //удаление маркера по правой кнопке
	google.maps.event.addListener(marker, 'rightclick', function(event) {
                marker.setMap(null);
				
				for (var i=0; i<markers.length; i++){
					if (markers[i].getPosition() == marker.getPosition())
					{
						markers.splice(i,1);
						//showRoute(markers);
					}
				}
				//if (markers.length != 0)
					//<!-- alert(markers.toString()); -->
    });
	var tempPosition;
	// google.maps.event.addListener(marker,'drag',function(event) {        document.getElementById('lat').value = event.latLng.lat();        document.getElementById('lng').value = event.latLng.lng();		tempPosition = event.latLng;		 alert(tempPosition.toString());    }); -->
    // google.maps.event.addListener(marker,'dragend',function(event) {        document.getElementById('lat').value = event.latLng.lat();        document.getElementById('lng').value = event.latLng.lng();		for (var i=0; i<markers.length; i++){			if (markers[i].getPosition() == tempPosition)			{				markers[i].setPosition(event.latLng);				alert(markers[i].getPosition().toString()); 			}		}    }); -->
	
    markers.push(marker);
	//<!-- alert(markers); -->
	//showRoute(markers);

}

function showRoute(markersArray){
	if (markersArray.length>1) {
	//<!-- var start = markersArray[0].getPosition(); -->
	//<!-- var end = markersArray[markersArray.length-1].getPosition(); -->
	var waypts = [];	
	var start = markersArray[0].getPosition();
	var end = markersArray[markersArray.length-1].getPosition();
	
	for (var i=1; i<markersArray.length-1; i++){
	waypts.push({
            location:  markersArray[i].getPosition(),
            stopover:true
        });
	}
	var request = {
    origin:start,
    destination:end,
	waypoints: waypts,
    travelMode: google.maps.TravelMode.WALKING
  };
  
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
  
}

}

function buildRoute(markersArray){
	
	//Intialize the Path Array
    //var path = new google.maps.MVCArray();
 
    //Intialize the Direction Service
    var service = new google.maps.DirectionsService();
 
    //Set the Path Stroke Color
    var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

	for (var i = 0; i < markers.length; i++) {
            if ((i + 1) < markers.length) { //<!-- markers.length > 2 -->
                var src = markers[i].getPosition();
                var des = markers[i + 1].getPosition();
                path.push(src);
                poly.setPath(path);
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
            }
        }
	
}

google.maps.event.addDomListener(window, 'load', initialize);

function ololo(){
	xmlhttp.open("POST", "ajax_test.asp", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("i2=demid&name=priora");
}

function sendPoints(){
	
	if (markers.length > 1) 
	{
		//alert('clicked!');
		var startpoint = {start: markers[0].getPosition()};
		//jsonString = JSON.stringify(startpoint);
		//jsonString = formatData(markers);
		var points = {};
		for(var i = 0; i < markers.length; i++) {
			var obj = {};
			obj['lat'] = markers[i].getPosition().lat();
			obj['lon'] = markers[i].getPosition().lng();
			//newData.push(obj);
			points["point_"+i.toString()] = obj;
		}
		jsonString = JSON.stringify(points);
			
		$.ajax ({
			url: "/jsdev/send_points/", //url для отправки маркеров
			type: "POST",
			data: jsonString,
			success : function(data) {
				alert(data);
				
				},
			
		});
		
		/* $.getJSON('/url/to/ajax/view/', {foo: 'bar'}, function(data, jqXHR){
			// do something with response
		}); */
	}
	else{
		alert("Only one point!");
	}
}

function clearMap() { //deletes all points on the map
	//alert('You are going to clear the map');
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
	directionsDisplay.setMap(null);
	directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	directionsDisplay.setMap(map);
}

function clearDB() {
	alert('You are deleting all data in DB');
	var message = {};
	message["action"] = "clearDB";
	jsonString = JSON.stringify(message);
	alert(jsonString);
	
	$.ajax ({
			url: "/cleardb/",
			type: "POST",
			data: jsonString,
			success : function(data) {
				alert(data);
				},
			
		});

}

function formatData(data) { //Converts LatLng array to JSON
    //data is an array of many LatLng objects

    newData = [];
	var points;

    for(var i = 0; i < data.length; i++) {
        var obj = new Object();
        obj['lat'] = data[i].lat();
        obj['lon'] = data[i].lng();
        newData.push(obj);
		points[i.toString()] = obj;
    }

    return JSON.stringify(points);     
}