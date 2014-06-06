
function getCheckedRadioValue(radioGroupName) {
   var rads = document.getElementsByName(radioGroupName),
       i;
   for (i=0; i < rads.length; i++)
      if (rads[i].checked)
          return rads[i].value;
   return null; // or undefined, or your preferred default for none checked
}

function addRoute() {

	//alert(markers);
		
	var route_name = document.getElementById('route_name').value;
	var route_type = getCheckedRadioValue("route_type");
	var route_likes = document.getElementById('route_likes').value
	var route_city = document.getElementById('route_city').value
	var route_length = document.getElementById('route_length').value
	var route_duration = document.getElementById('route_duration').value

	alert(route_name + ", " + route_type + ", " + route_likes + ", " + route_city + ", " + route_length + ", " + route_duration);

	var route = {};
	route["route_name"] = route_name;
	route["route_type"] = route_type;
	route["route_likes"] = route_likes;
	route["route_city"] = route_city;
	route["route_length"] = route_length;
	route["route_duration"] = route_duration;
/*
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
*/
	if (markers.length > 1) 
	{
		//alert('clicked!');
		var startpoint = {start: markers[0].getPosition()};

		var points = {};
		for(var i = 0; i < markers.length; i++) {
			var obj = {};
			obj['lat'] = markers[i].getPosition().lat();
			obj['lon'] = markers[i].getPosition().lng();
			//newData.push(obj);
			points["point_"+i.toString()] = obj;
		}
		route["points"]=points;
		jsonString = JSON.stringify(route);
			
		$.ajax ({
			url: "/jsdev/addNewRoute/", //url для отправки маркеров
			type: "POST",
			data: jsonString,
			success : function(data) {
				//alert(data);
				window.location.href = '/jsdev/';			
				},
			
		});
		
		/* $.getJSON('/url/to/ajax/view/', {foo: 'bar'}, function(data, jqXHR){
			// do something with response
		}); */
	}
	else{
		alert("Add more points!");
	}

}
