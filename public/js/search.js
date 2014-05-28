
$(document).ready(function(){


	$('form').submit(function(){
		if(parent.search($(this).serializeArray()))
			window.location = "result.html";
		return false;
	});
	var mode = 0;
	$('#mode').click(function(){
		if(mode==0){
			mode = 2;
			$(this).parent().find('input').css("display","none");
		}
		else{
			mode = 0;
			$(this).parent().find('input').css("display","block");
		}
		parent.changemode(mode);
		
		return false;
	});
//end    
});    

function initialize() {

  var input = (document.getElementById('inputEmail'));
  var autocomplete = new google.maps.places.Autocomplete(input);

}
google.maps.event.addDomListener(window, 'load', initialize);