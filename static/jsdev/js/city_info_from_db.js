alert(jQuery.fn.jquery);
$(document).ready (function(){
alert('ok');
var $select = $('#mySelectID');

for (var i in Object.keys(json_obj)){

console.log(json_obj[i]["city_name"]);
var $option = $("<option/>").attr("value", json_obj[i]["city_id"]).text(json_obj[i]["city_name"]);
$select.append($option);

}
});