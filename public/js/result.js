$(document).ready(function(){
  $('tbody').find('td').each(
	function(i){
		if(i%4==1)
			$(this).text(parent.alldata[Math.floor(i/4)].name);
		else if(i%4==2)
			$(this).text(parent.alldata[Math.floor(i/4)].breed);
		else if(i%4==3){
			$(this).text(parent.alldata[Math.floor(i/4)].dis);
		}	
	}
  );
  
});    

