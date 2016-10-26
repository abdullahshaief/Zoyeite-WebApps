
var socket = io();

socket.on("serverMessage", function(message) {
	
    $("#connectStatus").html(message);

});

socket.on("disconnect", function(message) {

    $("#connectStatus").html("Oops! disconnected!");
    socket.broadcast.emit("newUser", "User "+ userName +" left")

});

socket.on("chat", function(message){
    
    $("#messages").append("<p id='userMessages'>"+ message.user + ": "+ message.message +"</p>");

});


$("#send").click(function(){
    
     $("#messages").append("<p id='myMessages'>"+ $('#chat').val() +"</p>");
        
    socket.emit("chat",{
        
        message:  $('#chat').val(),
        user: '/#'+socket.id
    });
   
    $('#chat').val('');
    $('#chat').attr("placeholder", "");
});

$('#chat').keypress(function(event){
   
    if(event.which == 13){
        
        event.preventDefault();
        
        $("#send").click();
    }
});


$('#chat').keydown(function(){
   
    var message = 'typing......';
    socket.emit("typeStat", {
        message: message,
        user: '/#'+socket.id
    });
// This is to scroll down the chat messges automatically
    var elem = document.getElementById('messages');
   elem.scrollTop = elem.scrollHeight;
    
});

$('#chat').keyup(function(){
   
    var message = '';
   
    function holdType(){
        socket.emit("typeStat", message);
    }
    setTimeout(holdType, 1000);

});

$('#chat').focusout(function(){
   
      var message = '';
   
    function holdType(){
        socket.emit("typeStat", message);
    }
    setTimeout(holdType, 1000);
});

socket.on("typeMsg", function(message){
    
    $('#chat').attr("placeholder", message.user+" is "+ message.message);
 
    if((message.user== undefined) && (message.message == undefined)){
       $('#chat').attr("placeholder", ""); 
    }
});

socket.on("newUser", function(message){
    $("#messages").append("<p id='newUserMessage'>"+ message +"</p>");
});
   
 