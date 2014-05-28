$(document).ready(function(){


	$('form').submit(function(){
		parent.senddata($(this).serialize());
	});
	var mode = 0;
		
	$('#circle').click(function(){
		if(mode==0){
			mode = 1;
			$(this).parent().find('input').css("display","none");
		}
		else{
			mode = 0;
			$(this).parent().find('input').css("display","block");
		}
		parent.changemode(mode);
		return false;
	});
    $('#address').click(function(){
		parent.setAddress($('#inputEmail').val());
		return false;
	});
	
//end    
});    

function initialize() {

  var input = (document.getElementById('inputEmail'));
var autocomplete = new google.maps.places.Autocomplete(input);

}
google.maps.event.addDomListener(window, 'load', initialize);