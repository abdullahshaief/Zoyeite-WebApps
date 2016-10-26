
var socket = io();

socket.on("disconnect", function() {
	
    $("#connectionStatus").html("Oops! Disconnected!");

});

socket.on("connect", function() {
	
    $("#connectionStatus").html("Connected!");
 
});

socket.on('winner',  function(message){
    
    $('button').attr('disabled', true);
    alert(message);
    
    setTimeout(function(){location.reload();}, 1000);
});

socket.on('overflow', function(message){
    
    $('#turnIndicator').html(message.message);
    $('#para').html(message.message1);
    io.emit('end');
} );

socket.on('turn', function(message){
    
    if(('/#'+socket.id) == message.socketId){
        
        setTurn("it's your turn");
        
        $("#gameCanvas").find('button:empty').removeAttr('disabled');
        
        $("button").click(function(){   
            
           $("#gameCanvas").find('button').attr('disabled', true);
        });
        
    }else{
        
        setTurn("it's "+ message.turn +" turn");
      
        $("#gameCanvas").find('button').attr('disabled', true);
    }


});

socket.on('click', function(message){
     
    message.button = '#' + message.button;
    $(message.button).html(message.turn);

    $(message.button).attr('disabled', true);
 
});

$(document).ready(function(){

// To get the id of the button that has been pressed

    $("button").click(function() {
    
  
        socket.emit('buttonClick',{
       turn: $(this).html(),
        button: this.id
          });

    });
    
      $("button").click(function() {
          var tt="#"+this.id;
  $(tt).fadeOut(700).delay(10).fadeIn(10).queue(function(){

            socket.emit("btnProperty", {
              id: this.id,
            content: $(this).html(),
               });

});
});
});
   



// To set the title
function setTurn(title) {
   $("#turnIndicator").html(title);
   
}



    
