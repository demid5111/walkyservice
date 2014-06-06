var routesType = "pedestrian"


function logInClick()
{
	alert("Log In button pressed! ");
	window.location.href = '../jsdev/login';
}

function signupClick()
{
	alert("Sign Up button pressed! ");
	window.location.href = '../jsdev/signup';
}

//alert("My routes type = " + routesType)
function pedestrianOptionChecked()
{
	routesType = "pedestrian"
	alert("Pedestrian button pressed! " + routesType);


}


function carOptionChecked()
{
	routesType = "car"
	alert("Car button pressed! " + routesType);
}
function bicycleOptionChecked()
{
	routesType = "bicycle"
	alert("Bicycle button pressed! " + routesType);
}

function likesClicked (id){
	//alert("here!" + id)
	var catid;
    catid = $(this).attr("data-catid");
    alert(document.getElementById('likes').data-catid);
    catid =2;
     $.get('/jsdev/like_category/', {category_id: catid}, function(data){
               $('#like_count').html(data);
               $('#likes').hide();
           });
}

function addRoute(){
	alert("Add Route button pressed! " + routesType);
	//window.location.href = '../jsdev/mapsdraw';
	window.location.href = '../jsdev/add';
	/*$.ajax ({
		url: "/updt/",
		type: "POST",
		data: jsonString,
		success : function(data) {
		alert(data);
	}*/
}

function readMore(sender){
	var tr = sender.parentNode.parentNode;
	var parentid = tr.id;
	alert("id = " + parentid);
	alert("Read More button pressed! ");	
	var url = '../jsdev/map_from_db/#' + parentid;
	window.location.href = url;
}