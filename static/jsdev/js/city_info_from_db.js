// appends recieved info from Cities db to list
$(document).ready (function(){



for (var i in Object.keys(json_obj)){

  
  var list = document.getElementById("list");
  var li = document.createElement("li");
  var liValue = document.createTextNode(json_obj[i]["city_name"]);  
  li.appendChild(liValue);
  list.appendChild(li);

}



});
// filters list onkeyup
function filter(element) {
        var value = $(element).val();

        $("#list > li").each(function() {
            if ($(this).text().search(value) > -1) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    }