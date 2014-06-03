
$(document).ready(function(){


	$('form').submit(function(){
		if(window.search($(this).serializeArray()));
			//window.location = "result.html";
		return false;
	});
	var mode = 0;
	
	$('#mode').click(function(){
		if(mode==0){
			mode = 2;
			$(this).parent().find('input').css("display","none");
            $(this).text('切換成輸入地址');
			$('#searchform').addClass('hide');
			$('#blackcover').addClass('hide');
			$('#mapenter').removeClass('hide');
		}else{
			mode = 0;
			$('#position').text("");
			$(this).parent().find('input').css("display","block");
            $(this).text('在地圖上點選');
            $('#mode').addClass('btn-success');
		}
		parent.changemode(mode);
		return false;
	});
	$('#mapenter').click(function(){
		$('#position').text(parent.getposition());
		$('#searchform').removeClass('hide');
		$('#blackcover').removeClass('hide');
		$('#mapenter').addClass('hide');
		return false;
	});
	//end    
});    

function initialize() {

  var input = (document.getElementById('place'));
  var autocomplete = new google.maps.places.Autocomplete(input);
  var input2 = (document.getElementById('mapadd'));
  var autocomplete2 = new google.maps.places.Autocomplete(input2);

}
google.maps.event.addDomListener(window, 'load', initialize);