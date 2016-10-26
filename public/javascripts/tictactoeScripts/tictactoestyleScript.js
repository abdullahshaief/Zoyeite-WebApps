var socket = io();

$(document).ready(function(){
    
   $("body").css({
       'background-color':"rgba(0, 0, 0, 0.7)",
       'top': '0',
       'bottom': '0',
       'left': '0',
       'right': '0'
       
   }).animate({

       opacity: 0.0
       
   },0, function(){
       
       $("body").css({
       'opacity': '1',
       });
       
       $("#gameCanvas").css({
           'visibility': "hidden ",
       });
       
       $("#popup").css({
          'visibility': "visible "
       });
   });
    
    $("#send").click(function(){
        
       $("#para").toggle(function(){
           
        if(($("#user").val()!= '') && ($("#player").val() == 'X' || $("#player").val() == 'O') ){
    
            socket.emit('players', {
                name: $("#user").val(),
                player: $("#player").val()
            });
        // To diable all the buttons untill another player enters
            $('button').attr('disabled', true);
            // To set the fields to null
            $("#user").val('');
           $("#player").val('') ;
    
            // To make visible body after valid entiries
            $("#para").html("dsf");
      $("#gameCanvas").css({
           'visibility': "visible ",
       });
       
      $("body").css({
          
          'background-color':"rgba(0, 0, 0, 0.0)",
      });
            
       $("#popup").css({
          'visibility': "hidden "
       });
    $("#turnIndicator").html("Waiting for another player! Please wait!");  
        }else if(($("#user").val()!= '') && ($("#player").val() == 'x' || $("#player").val() == 'o') ){
    $("#turnIndicator").html("Waiting for another player! Please wait!");     
            socket.emit('players', {
                name: $("#user").val().toUpperCase(),
                player: $("#player").val().toUpperCase(),
            });
            
            // To diable all the buttons untill another player enters
            
            $('button').attr('disabled', true);
            
            // To set the fields to null
            $("#user").val('');
           $("#player").val(''),
    
            // To make visible body after valid entiries
            
             
      $("body").css({
          
          'background-color':"rgba(0, 0, 0, 0.0)",
      });
            
        $("#gameCanvas").css({
           'visibility': "visible ",
       });
       
       $("#popup").css({
          'visibility': "hidden "
       });
             
        }else{
            
            alert("Ooops! Enter again!");
        }
    });
  });
    

});
