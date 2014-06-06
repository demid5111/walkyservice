function register() {

	//alert(markers);
		
	var user_name = document.getElementById('user_name').value;
	var user_surname = document.getElementById('user_surname').value
	var user_email = document.getElementById('user_email').value

	var user_password = document.getElementById('user_password').value
	var user_password_confirm = document.getElementById('user_password_confirm').value

	alert(user_name + ", " + user_surname + ", " + user_email + ", " + user_password + ", " + user_password_confirm);

	if(user_password!=user_password_confirm){
		alert("Wrong confirm password");
		return;
	}
	if(user_name==""){
		alert("Enter your name");
		return;
	}

	var user = {};
	user["user_name"] = user_name;
	user["user_surname"] = user_surname;
	user["user_email"] = user_email;
	user["user_password"] = user_password;


	jsonString = JSON.stringify(user);

	$.ajax ({
		url: "/jsdev/addNewUser/",
		type: "POST",
		data: jsonString,
		success : function(data) {
			//alert(data);
			window.location.href = '/jsdev/';
		}

	});


}
