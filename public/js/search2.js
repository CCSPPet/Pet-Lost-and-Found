var page = 1;
$(document).ready(function(){
	
	$('#page>li').on('click',function(){
		if($(this).text()=='«')
			page--;
		else if($(this).text()=='»')
			page++;
		else page = $(this).text();
		if(page==0)page = 1;
		$('#page>li').each(function(i){
			if(i==0||i==6)return;
			var num = parseInt(page);
			if(num<3)num=3;
			num = num+i-3;
			$(this).find('a').text(num);
			if(num==page)$(this).addClass('disabled');
			else $(this).removeClass('disabled');
		});
	});

	$('#searchform').find('form').submit(function(){
		if(window.search($(this).serializeArray(),"loss")){
			$('#searchform').addClass('hide');
			$('#blackcover').addClass('hide');
			$('#result').removeClass('hide');
		}
			//window.location = "result.html";
		return false;
	});
	$('#form').find('form').submit(function(){
		console.log($(this).html());
		if(parent.senddata($(this).serialize(),"find")){
			$(this).addClass('hide');
			$('#blackcover').addClass('hide');
		}
		return false;
	});
	var mode = 0;
	
	$('#searchbutton').click(function(){
		mode=0;
		parent.changemode(mode);
		$('#searchform').removeClass('hide');
		$('#blackcover').removeClass('hide');
		$('#mapenter').addClass('hide');
	});
	$('#searchcancel').click(function(){
		mode=0;
		parent.changemode(mode);
		$('#searchform').addClass('hide');
		$('#blackcover').addClass('hide');
	});
	$('#postbutton').click(function(){
		mode=0;
		parent.changemode(mode);
		$('#form').removeClass('hide');
		$('#blackcover').removeClass('hide');
		$('#mapenter').addClass('hide');
	});
	$('#postcancel').click(function(){
		mode=0;
		parent.changemode(mode);
		$('#form').addClass('hide');
		$('#blackcover').addClass('hide');
	});
	var nowform = null;
	$('#mode').click(function(){
		if(mode==0){
			mode = 2;
			nowform = $('#searchform');
			$(this).parent().find('input').css("display","none");
            $(this).text('切換成輸入地址');
			$('#searchform').addClass('hide');
			$('#blackcover').addClass('hide');
			$('#mapenter').removeClass('hide');
		}else{
			mode = 0;
			$(this).parent().find('.position').text("");
			$(this).parent().find('input').css("display","block");
            $(this).text('在地圖上點選');
            $('#mode').addClass('btn-success');
		}
		parent.changemode(mode);
		return false;
	});
	$('#mode2').click(function(){
		if(mode==0){
			mode = 2;
			nowform = $('#form');
			$(this).parent().find('input').css("display","none");
            $(this).text('切換成輸入地址');
			$('#form').addClass('hide');
			$('#blackcover').addClass('hide');
			$('#mapenter').removeClass('hide');
		}else{
			mode = 0;
			$(this).parent().find('.position').text("");
			$(this).parent().find('input').css("display","block");
            $(this).text('在地圖上點選');
            $('#mode2').addClass('btn-success');
		}
		parent.changemode(mode);
		return false;
	});
	$('#mapenter').click(function(){
		nowform.find('.position').text(parent.getposition());
		nowform.removeClass('hide');
		$('#blackcover').removeClass('hide');
		$('#mapenter').addClass('hide');
		return false;
	});
	$('.close').click(function(){
		$(this).parent().addClass('hide');
	});
	$('tbody').find('td').each(
		function(i){
			//i = i+(page-1)*5;
			//if(i>=parent.alldata.length)return;
			$(this).mouseenter(function(){
				parent.changecolor(i+(page-1)*5,'#FFFFFF');
				$(this).css('background-color','red');
			});
			$(this).mouseleave(function(){
				parent.changecolor(i+(page-1)*5,'#000000');
				$(this).css('background-color','');
			});
			$(this).click(function(){
				if(i+(page-1)*5<parent.alldata.length){
					updateinfo(i+(page-1)*5);
					parent.showinfo(i+(page-1)*5);
					$('#information').removeClass('hide');
				}
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
			else if(i==3)$(this).text("特徵：");
			else if(i==4)$(this).text("聯絡電話：");
		});
	}
	else{
		$('#information').find('h4').each(function(i){
			if(i==0)$(this).text("名字："+parent.alldata[num].name);
			else if(i==1)$(this).text("種別："+parent.alldata[num].species);
			else if(i==2)$(this).text("品種："+parent.alldata[num].breed);
			else if(i==3)$(this).text("特徵："+parent.alldata[num].feature);
			else if(i==4)$(this).text("聯絡電話："+parent.alldata[num].phone);
		});
	}
	
}
update = function(){
	
	$('#result').find('.resultphoto').each(
		function(i){
			i = i+(page-1)*5;
			if(i<parent.alldata.length){
				$(this).css('background-image','url('+parent.alldata[i].photo+')');
				
				//$(this).html("<img src = \"" +parent.alldata[i].photo + "\" > ");
				if(parent.alldata[i].click== true){
					updateinfo(i);
					$('#information').removeClass('hide');
					parent.alldata[i].click = false;
				}
				if(parent.alldata[i].mouse==1){
					$(this).trigger("mouseenter");
					parent.alldata[i].mouse = -1;
				}
				else if(parent.alldata[i].mouse==0){
					$(this).trigger("mouseleave");
					parent.alldata[i].mouse = -1;
				}
			}
			else $(this).css('background-image','');
			
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