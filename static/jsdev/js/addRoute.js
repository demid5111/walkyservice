
function addRoute() {
	
var route_name = document.getElementById('route_name').value;
var route_likes = document.getElementById('route_likes').value
var route_city = document.getElementById('route_city').value
var route_length = document.getElementById('route_length').value
var route_duration = document.getElementById('route_duration').value

alert(route_name + ", " + route_likes + ", " + route_city + ", " + route_length + ", " + route_duration);

var route = {};
route["route_name"] = route_name;
route["route_likes"] = route_likes;
route["route_city"] = route_city;
route["route_length"] = route_length;
route["route_duration"] = route_duration;

jsonString = JSON.stringify(route);

$.ajax ({
url: "/jsdev/addNewRoute/",
type: "POST",
data: jsonString,
success : function(data) {
//alert(data);
window.location.href = '/jsdev/';
}

});

}
