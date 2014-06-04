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
  $("#backsearch").on('click',function(){
	parent.changemode(0);
  });
  $('tbody').find('td').each(
		function(i){
			$(this).on('click',function(){
				if(Math.floor((i+(page-1)*25)/4)<parent.alldata.length)
					parent.showinfo(Math.floor((i+(page-1)*25)/4));
			});
		}
	)
  update();
});    
update = function(){
	$('tbody').find('td').each(
		function(i){
			
			i = i+(page-1)*25;
			/*if(i%5==0){
				$(this).text(Math.floor(i/5)+1);
				if(Math.floor(i/5)<parent.alldata.length){
					if(parent.alldata[Math.floor(i/5)].mouse)
						$(this).css('background-color','#ecf0f1');
					else
						$(this).css('background-color','');
				}
			}*/
			if(Math.floor(i/4)<parent.alldata.length){
				if(i%4==0)
					$(this).css('background-image','url('+parent.alldata[i].photo+')');
					//$(this).html("<img src=\""+parent.alldata[Math.floor(i/5)].photo+"\">");
				else if(i%4==1)
					$(this).text(parent.alldata[Math.floor(i/4)].breed);
				else if(i%4==2)
					$(this).text(parent.alldata[Math.floor(i/4)].feature);
				else if(i%4==3)
					$(this).text(parent.alldata[Math.floor(i/4)].phone);
				
				if(parent.alldata[Math.floor(i/4)].mouse)
					$(this).css('background-color','#ecf0f1');
				else
					$(this).css('background-color','');
			}
			else{
				$(this).text("");
				$(this).css('background-image','');
			}
			//console.log(parent.alldata[Math.floor(i/4)].mouse);
			
		}
	);
	setTimeout(update,100);
}
