var page = 1;
$(document).ready(function(){
	
	$('#page>li').on('click',function(){
		page = $(this).text();
	});

	$('form').submit(function(){
		if(window.search($(this).serializeArray())){
			$('#searchform').addClass('hide');
			$('#blackcover').addClass('hide');
		}
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
	$('.close').click(function(){
		$(this).parent().addClass('hide');
	});
	$('tbody').find('td').each(
		function(i){
			$(this).mouseenter(function(){
				parent.changecolor(i,'#FFFFFF');
				$(this).css('background-color','red');
			});
			$(this).mouseleave(function(){
				parent.changecolor(i,'#000000');
				$(this).css('background-color','');
			});
			$(this).click(function(){
				updateinfo(i);
				$('#information').removeClass('hide');
			});
		}
	);
	//end    
});    
updateinfo = function(num){
	num = num+(page-1)*5;
	if(num>=parent.alldata.length){
		$('#information').find('h4').each(function(i){
			if(i==0)$(this).text("名字：");
			else if(i==1)$(this).text("種別：");
			else if(i==2)$(this).text("品種：");
			else if(i==3)$(this).text("走失地點：");
			else if(i==4)$(this).text("特徵：");
		});
	}
	else{
		$('#information').find('h4').each(function(i){
			if(i==0)$(this).text("名字："+parent.alldata[num].name);
			else if(i==1)$(this).text("種別："+parent.alldata[num].species);
			else if(i==2)$(this).text("品種："+parent.alldata[num].breed);
			else if(i==3)$(this).text("走失地點："+parent.alldata[num].loseplace);
			else if(i==4)$(this).text("特徵："+parent.alldata[num].feature);
		});
	}
	
}
update = function(){
	
	$('#result').find('.resultphoto').each(
		function(i){
			i = i+(page-1)*5;
			if(i<parent.alldata.length){
				
				$(this).html("<img src = \"" +parent.alldata[i].photo + "\" > ");
				if(parent.alldata[i].mouse==0){
					$(this).css('background-color','');
					parent.alldata[i].mouse = -1;
				}
				else if(parent.alldata[i].mouse==1){
					$(this).css('background-color','red');
					parent.alldata[i].mouse = -1;
				}
			}
			else $(this).html("");
			
		}
	);
	setTimeout(update,100);
}

function initialize() {

  var input = (document.getElementById('place'));
  var autocomplete = new google.maps.places.Autocomplete(input);
  var input2 = (document.getElementById('mapadd'));
  var autocomplete2 = new google.maps.places.Autocomplete(input2);
  update();
}
google.maps.event.addDomListener(window, 'load', initialize);