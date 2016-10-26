
io= require('socket.io');

exports.tictactoeServer = function(tictactoeserver){
    
    io = io.listen(tictactoeserver);

    
  var players ={};
  var firstTurn =[];
  var buttonClick = false;
  var turn ='';
  var oppTurn='';
  var box=[];
  var sorted=[];
  var numOfPlayer = 0;
  var chose ='';
  var isaWinner = false;
    
io.on("connection", function(socket) {

     if(numOfPlayer != 2){
             socket.on('players',function(message){
        
        isaWinner = false;
        numOfPlayer++;
       
                 if(players.X){
                    
                     players['O'] = socket.id; // This saves the chosen X or O with unique id's
                
                 }else if (players.O){
                     
                     players['X'] = socket.id; // This saves the chosen X or O with unique id's
                
                 }else{
                     
                      players[message.player] = socket.id; // This saves the chosen X or O with unique id's

                 }
        
  
         var count =0;
        
        for (var key in players){
            
            if(firstTurn[count] != key){ // this is to count  number of players stored in array and in an object
             
                firstTurn.push(key);  
            }
           count++ ;
        }
        
        if(firstTurn.length == 2){   // when there are two people joinded it chooses who goes first!
            var randomPl = Math.floor((Math.random()*2)+0);
            
           turn = firstTurn[randomPl];
           
            // This condition looks for the id to determine who takes the first turn
            
            io.emit('turn',  {
                turn: turn,
                socketId: players[turn],
            });      
            if(turn == "X" || turn == "x" ){
                
                oppTurn = 'O';
            
            }else{
                
                oppTurn = 'X';
            }
            
            console.log(turn);
            
         
        }
        
        
        
       
    });
    
    
      
    
    socket.on('buttonClick', function(message) {
       if(buttonClick != true){
           
            io.emit('click', {
            turn : turn,
            button: message.button,
            id: message.id
        });
           
           buttonClick = true;  
           io.emit('turn',  {
               turn: oppTurn,
               socketId: players[oppTurn],
           });
           
       }else{
           
            io.emit('click', {
            turn : oppTurn,
            button: message.button,
            id: message.id  
        });
           
           io.emit('turn',  {
               turn: turn,
               socketId: players[turn],
            });
           
           buttonClick = false; 
       }

     
    });
    
    socket.on('btnProperty', function(message){
       
         tictactoeLogic( message.id , message.content);

});
                
 
    console.log(numOfPlayer);
     // This is where the number of player counting ends
}else{
    
    socket.emit('overflow', {
          
        message:"Sorry maximum user connected for this room!",
        message1:"Refresh the browser till waiting for players shows up! Thanks!",

    });
    

}   
    
   
});




function tictactoeLogic(x , y){
    
  
    box.push({ button: x, value: y});

box.sort(function(a, b) {
  var nameA = a.button.toUpperCase(); // ignore upper and lowercase
  var nameB = b.button.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
    
  for(var key in box){
    
      if(box[key].button == 'button1'){
          sorted[0] = box[key]; 
      }else if(box[key].button == 'button2'){
          sorted[1] = box[key];
      }else if(box[key].button == 'button3'){
          sorted[2] = box[key];
      }else if(box[key].button == 'button4'){
          sorted[3] = box[key];
      }else if(box[key].button == 'button5'){
          sorted[4] = box[key];
      }else if(box[key].button == 'button6'){
          sorted[5] = box[key];
      }else if(box[key].button == 'button7'){
          sorted[6] = box[key];
      }else if(box[key].button == 'button8'){
          sorted[7] = box[key];
      }else if(box[key].button == 'button9'){
          sorted[8] = box[key];
      }
      
  }

    
    winner();

}


function winner(){
    
    if(sorted[0] !== undefined && sorted[1] !== undefined && sorted[2] !== undefined&&
       sorted[0].value === sorted[1].value && sorted[0].value === sorted[2].value
      ){
         io.emit('winner', "Winner is: "+sorted[0].value); numOfPlayer=0; isaWinner = true;turn ='';oppTurn='';firstTurn.length = 0;for (var member in players) delete players[member];buttonClick = false;for (var key in box) delete box[key];for (var items in sorted) delete sorted[items];
    }else if   (sorted[3] !== undefined && sorted[4] !== undefined && sorted[5] !== undefined&&
       sorted[3].value === sorted[4].value && sorted[5].value === sorted[4].value
      ){
         io.emit('winner', "Winner is: "+sorted[4].value); numOfPlayer=0;isaWinner = true;turn ='';oppTurn='';firstTurn.length = 0;for (var member in players) delete players[member];buttonClick = false;for (var key in box) delete box[key];for (var items in sorted) delete sorted[items];
    }else if   (sorted[6] !== undefined && sorted[7] !== undefined && sorted[8] !== undefined&&
       sorted[6].value === sorted[8].value && sorted[7].value === sorted[6].value
      ){
         io.emit('winner', "Winner is: "+sorted[8]); numOfPlayer=0;isaWinner = true;turn ='';oppTurn='';firstTurn.length = 0;for (var member in players) delete players[member];buttonClick = false;for (var key in box) delete box[key];for (var items in sorted) delete sorted[items];
    }else if (sorted[0] !== undefined && sorted[3] !== undefined && sorted[6] !== undefined&&
       sorted[0].value === sorted[3].value && sorted[3].value === sorted[6].value
      ){
         io.emit('winner', "Winner is: "+sorted[3].value); numOfPlayer=0;isaWinner = true;turn ='';oppTurn='';firstTurn.length = 0;for (var member in players) delete players[member];buttonClick = false;for (var key in box) delete box[key];for (var items in sorted) delete sorted[items];
    }else if   (sorted[1] !== undefined && sorted[4] !== undefined && sorted[7] !== undefined&&
       sorted[4].value === sorted[1].value && sorted[4].value === sorted[7].value
      ){
         io.emit('winner', "Winner is: "+sorted[1].value); numOfPlayer=0;isaWinner = true;turn ='';oppTurn='';firstTurn.length = 0;for (var member in players) delete players[member];buttonClick = false;for (var key in box) delete box[key];for (var items in sorted) delete sorted[items];
    }else if  (sorted[2] !== undefined && sorted[5] !== undefined && sorted[8] !== undefined&&
       sorted[2].value === sorted[5].value && sorted[5].value === sorted[8].value
      ){
         io.emit('winner', "Winner is: "+sorted[5].value); numOfPlayer=0;isaWinner = true;turn ='';oppTurn='';firstTurn.length = 0;for (var member in players) delete players[member];buttonClick = false;for (var key in box) delete box[key];for (var items in sorted) delete sorted[items];
    }else if  (sorted[0] !== undefined && sorted[4] !== undefined && sorted[8] !== undefined&&
       sorted[0].value === sorted[8].value && sorted[4].value === sorted[8].value
      ){
         io.emit('winner', "Winner is: "+sorted[8].value); numOfPlayer=0;isaWinner = true;turn ='';oppTurn='';firstTurn.length = 0;for (var member in players) delete players[member];buttonClick = false;for (var key in box) delete box[key];for (var items in sorted) delete sorted[items];
    }else if  (sorted[2] !== undefined && sorted[4] !== undefined && sorted[6] !== undefined&&
       sorted[2].value === sorted[4].value && sorted[4].value === sorted[6].value
      ){
         io.emit('winner', "Winner is: "+sorted[4].value);numOfPlayer=0;isaWinner = true;turn ='';oppTurn='';firstTurn.length = 0;for (var member in players) delete players[member];for (var key in box) delete box[key];for (var items in sorted) delete sorted[items];
    }else if(sorted[0] !== undefined && sorted[1] !== undefined && sorted[2] !== undefined &&
             sorted[3] !== undefined && sorted[4] !== undefined && sorted[5] !== undefined &&
             sorted[6] !== undefined && sorted[7] !== undefined && sorted[8] !== undefined && isaWinner == false){
        io.emit('winner', "Oop! it's a draw");isaWinner = false; turn ='';oppTurn='';firstTurn.length = 0;for (var member in players) delete players[member];buttonClick = false;for (var key in box) delete box[key];for (var items in sorted) delete sorted[items];numOfPlayer=0;
    }
    

}


};