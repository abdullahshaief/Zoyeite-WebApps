var io = require('socket.io');

exports.chatServer = function(server){
 
    var trackUser = {};
    var numUser = 0;
    
io = io.listen(server);
    
io.on("connection", function(socket){
   
    var addedUser = false;
        
    console.log("A user connected");

  socket.on("chat", function(message){
      
        socket.broadcast.emit("chat",{
           
            message: message.message,
            user: trackUser[message.user]
        
        });
    });
 
    socket.on("typeStat", function(message){
      
       socket.broadcast.emit("typeMsg",{
          
           message: message.message,
            user: trackUser[message.user]
       
       }); 
   });
    
    // From this on these code tracks the user
    //To cout number of object
    
    
    socket.on("newUser", function(userName){
       
        if(userName != 'transport close'){
        
            for(key in trackUser) {
                numUser++;
            }
 
    io.emit("serverMessage", "<" + numUser+ ">&nbsp;&nbsp&nbsp&nbspConnected to server!");   
            
            numUser = 0;
            
        socket.broadcast.emit("newUser", "User "+ userName.message +" joined");

            trackUser[userName.user] = userName.message;
            console.log(trackUser);
            
       }
      });
    
     socket.on("disconnect", function(user){

            
        socket.broadcast.emit("newUser", " "+trackUser[socket.id]+" user left");
   
          delete trackUser[socket.id];
         console.log(trackUser);
         
            for(key in trackUser) {
                numUser++;
            }
         
    io.emit("serverMessage", "<" + (numUser - 1) + ">&nbsp;&nbsp&nbsp&nbspConnected to server!");
         
          numUser = 0;
    });
    

    
   // This is Where the track users end    
});


};