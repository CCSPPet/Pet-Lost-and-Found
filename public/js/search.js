
$(document).ready(function(){


	$('form').submit(function(){
		if(parent.search($(this).serializeArray(),"find"))
			window.location = "result.html";
		return false;
	});
	var mode = 0;
	
	$('#mode').click(function(){
		
        if(mode==0){
			mode = 2;
			$(this).parent().find('input').css("display","none");
            $(this).text('切換成輸入地址');
            $('#mode').removeClass('btn-success');
		}
		else{
			mode = 0;
			$(this).parent().find('input').css("display","block");
            $(this).text('切換成地圖點選');
            $('#mode').addClass('btn-success');
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