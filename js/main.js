$(document).ready(function(){
    console.log("ready");

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




//IE Joke    
function detectBrowser(){  
    var isIE = navigator.userAgent.search("MSIE") > -1;  
    if (isIE) {  
        browser = 'Seriously? You are still using IE?';  
    }  
    return browser;  
}  
  
// ===== 根據瀏覽器動態改變元素大小 ====== //  
var browser = detectBrowser();  
var isIE = navigator.userAgent.search("MSIE") > -1;  
if (isIE) {
alert(browser);      
}    


//End
});