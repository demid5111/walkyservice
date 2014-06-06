function signup() {


	var user_email = document.getElementById('user_email').value
	var user_password = document.getElementById('user_password').value

	alert(user_email + ", " + user_password);

	if(user_password==""){
		alert("Enter password");
		return;
	}
	if(user_email==""){
		alert("Enter email");
		return;
	}

	var user = {};
	user["user_email"] = user_email;
	user["user_password"] = user_password;


	jsonString = JSON.stringify(user);

	$.ajax ({
		url: "/jsdev/authUser/",
		type: "POST",
		data: jsonString,
		success : function(data) {
			//alert(data);
			if (data=="User Found") {
				alert("Now you are authentificated");
				window.location.href = '/jsdev/';
			}
			else {
				alert("User Not Found");
			}

			
		},
		error : function(data) {
			//alert(data);
			alert("Error");
			//window.location.href = '/jsdev/';
		}

	});


}
