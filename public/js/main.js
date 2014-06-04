$(document).ready(function(){


	$('form').submit(function(){
		parent.senddata($(this).serialize(),"loss");
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
	

//張貼    
$('#post').click(function(){
    $('#form').removeClass('hide')
    $('#blackcover').removeClass('hide')
    console.log("show")
});

//取消    
$('.cancel').click(function(){
    $('#form').addClass('hide')
    $('#blackcover').addClass('hide')
    console.log('hide')
});

//增加懸賞    
  $('#rewardBtn').click(function(){
      $('<div class="form-group"><label for="inputEmail" class="col-lg-2 control-label">懸賞</label><div class="col-lg-10"><input type="text" class="form-control" id="inputEmail" placeholder="金錢或物品" ></div></div>').appendTo($('fieldset')).find('input').focus()
      $('#rewardBtn').addClass('btn btn-info disabled')
      
      console.log('HEEE')
});  


$('#searchcancel').on('click',function(){
    $('#searchform').addClass('hide');
});









//end    
});    

function initialize() {

  var input = (document.getElementById('inputEmail'));
var autocomplete = new google.maps.places.Autocomplete(input);

}
google.maps.event.addDomListener(window, 'load', initialize);

