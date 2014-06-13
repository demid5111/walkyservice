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





google.maps.event.addDomListener(window, 'load', initialize);





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



