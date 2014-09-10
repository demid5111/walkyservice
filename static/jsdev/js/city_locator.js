$(document).ready(function () {

  // test for presence of geolocation
  if(navigator && navigator.geolocation) {
    // make the request for the user's position
    navigator.geolocation.getCurrentPosition(geo_success, geo_error);
  } else {
    // use freegeoip.net IP to location REST API
    $.getJSON( "http://freegeoip.net/json/", function( data ) {
      if (data.city != ""){
        $("#city_name").fadeOut(function() {
          $(this).text(data.city).fadeIn();
        })       
      }else{
        error("Error, please turn on geolocation services and allow browser to get your position");
      }
    });
    //printAddress(geoip_latitude(), geoip_longitude(), true);
  }
  
});
 
function geo_success(position) {
  printAddress(position.coords.latitude, position.coords.longitude);
}
 
function geo_error(err) {
  showBrowserGeoError(err);
  // instead of displaying an error, fall back to freegeoip.net REST API
  $.getJSON( "http://freegeoip.net/json/", function( data ) {
      //console.log(data);
      if (data.city != ""){
        $("#city_name").fadeOut(function() {
          $(this).text(data.city).fadeIn();
        })       
      }else{
        error("Error, please turn on geolocation services and allow browser to get your position");
      }
    });
  //printAddress(geoip_latitude(), geoip_longitude(), true);
}
 
// use Google Maps API to reverse geocode our location
function printAddress(latitude, longitude) {
  // set up the Geocoder object
  var geocoder = new google.maps.Geocoder();
 
  // turn coordinates into an object
  var yourLocation = new google.maps.LatLng(latitude, longitude);
 
  // find out info about our location
  geocoder.geocode({ "latLng": yourLocation }, function (results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      if(results[0]) {
        $("#city_name").fadeOut(function() {
          $(this).text(results[0].formatted_address).fadeIn();
        })
      } else {
        error("Google did not return any results.");
      }
    } else {
      error("Reverse Geocoding failed due to: " + status);
    }
  });
 
}
 
function error(msg) {
  alert(msg);
}

function showBrowserGeoError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred");
            break;
    }
}