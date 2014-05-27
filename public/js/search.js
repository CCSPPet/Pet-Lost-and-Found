
$(document).ready(function(){


	$('form').submit(function(){
		parent.search($(this).serializeArray());
		window.location = "result.html";
		return false;
	});
	
//end    
});    

function initialize() {

  var input = (document.getElementById('inputEmail'));
  var autocomplete = new google.maps.places.Autocomplete(input);

}
google.maps.event.addDomListener(window, 'load', initialize);