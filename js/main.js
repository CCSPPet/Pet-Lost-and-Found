$(document).ready(function(){
    console.log("ready");

//張貼    
$('#post').click(function(){
    $('#form').removeClass('hide')
    $('#blackcover').removeClass('hide')
    console.log("show")
});

//取消    
$('#cancel').click(function(){
    $('#form').addClass('hide')
    $('#blackcover').addClass('hide')
    console.log('hide')
});








});