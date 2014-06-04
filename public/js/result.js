var page = 1;
$(document).ready(function(){
  $('#page>li').on('click',function(){
	page = $(this).text();
  });
  $("#backsearch").on('click',function(){
	parent.changemode(0);
  });
  $('tbody').find('td').each(
		function(i){
			$(this).on('click',function(){
				if(Math.floor((i+(page-1)*12)/4)<parent.alldata.length)
					parent.showinfo(Math.floor((i+(page-1)*12)/4));
			});
		}
	)
  $('#page>li').on('click',function(){
	page = $(this).text();
  });
  update();
});    
update = function(){
	$('tbody').find('td').each(
		function(i){
			i = i+(page-1)*12;
			if(i%4==0){
				$(this).text(Math.floor(i/4)+1);
				if(Math.floor(i/4)<parent.alldata.length){
					if(parent.alldata[Math.floor(i/4)].mouse)
						$(this).css('background-color','red');
					else
						$(this).css('background-color','');
				}
			}
			else if(Math.floor(i/4)<parent.alldata.length){
				if(i%4==1)
					$(this).text(parent.alldata[Math.floor(i/4)].name);
				else if(i%4==2)
					$(this).text(parent.alldata[Math.floor(i/4)].breed);
				else if(i%4==3){
					$(this).text(parent.alldata[Math.floor(i/4)].dis);
				}
				if(parent.alldata[Math.floor(i/4)].mouse)
					$(this).css('background-color','red');
				else
					$(this).css('background-color','');
			}
			else
				$(this).text("");
			//console.log(parent.alldata[Math.floor(i/4)].mouse);
			
		}
	);
	setTimeout(update,100);
}
