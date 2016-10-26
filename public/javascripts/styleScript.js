 var height;
 var width ;
var resizeScreen = 0;
var nameEntered = false;
var socket = io();

// This function is defined to center anything

jQuery.fn.middle = function (){
   
    var substract=0;
    
     if((width < 400) &&(resizeScreen != 1)){
        
        substract = 126;
    
    }else if((width < 400) &&(resizeScreen == 1)){
        
        substract = 8;
    
    }else if((width < 600) &&(resizeScreen != 1)){
        
        substract = 120;
    
    }else if((width < 600) &&(resizeScreen == 1)){
    
        substract = 70;
   
    }else if((width < 900)&&(resizeScreen != 1)){
    
        substract = 90;
   
    }else if((width < 900)&&(resizeScreen == 1)){
    
        substract = 0;
   
    }else if(width < 900){
    
        substract = 60;
   
    }else{
     
        substract=0;
    }
     width = ((width * 50)/100);
    
     var center = this.width();
     center = ((center * 50)/100);
       
    this.css({
        'position' : 'relative',
        'left' : (width-center-substract) +'px',
        'margin-left' : -$('.className').outerWidth()/2,
        'margin-top' : -$('.className').outerHeight()/2
    });
    }

window.onload = function(){
    
        if (nameEntered == false){
        
        populatePopup();
        nameEntered=true;
        
        }
     
     
    
    height = window.innerHeight;
     width = screen.width;
    
    $("#chatBox").middle();
  
    document.getElementById("chatBox").style.minWidth = 300+"px";
    document.getElementById("chatBox").style.maxHeight = ((height*60)/100)+"px";
    document.getElementById("messages").style.maxHeight = (((height*(60-20))/100))+"px";
    document.getElementById("chatBox").style.minHeight = 500+"px";
    document.getElementById("messages").style.minHeight = 420+"px";
    
    height = $("#chatBox").height();
    $("#content").css({
        'position': 'absolute',
          'top':($("#chatBox").height() + 40) +'px'
        
   });
  

}



$(window).resize(function(){
   resizeScreen = 1;
 
    width = window.innerWidth;

$("#chatBox").middle();
    
    var resizeHeight = window.innerHeight;
    var currentHeight = (resizeHeight/100)*60;
    var messageBoxHeight =(resizeHeight/(100+20))*60;
    currentHeight =parseFloat(Math.round(currentHeight * 100) / 100).toFixed(0);

 
    $( "#chatBox" ).animate({
        height: currentHeight+"px",
        maxHeight: currentHeight+"px",
  }, 0 );
    
    $( "#messages" ).animate({
        height: messageBoxHeight+"px",
        maxHeight: messageBoxHeight+"px",
  }, 0 );
    
    height = $("#chatBox").height();
    $("#content").css({
        'position': 'absolute',
          'top':($("#chatBox").height() + 40) +'px'
        
   });
});

// This bit of code is to show overlay and to get the user name

    
   

function populatePopup(){   
               
    $("#chat, #connectStatus, #send").css({
        "display": "none"
    });
        
    
       $("#chatBox").css({
              "background-color" : "rgba(0, 0, 0, 0.7)",
          
          });  

       $("#userName").css({
              
                "margin": "70px auto",
                "padding": "20px",
                "background": "#fff",
                "border-radius":" 5px",
                "width": "30%",
                'margin-left': -$("#userName").outerWidth() / 2 + 'px',
                'margin-top': -$("#userName").outerHeight() / 2 + 'px',
                "position": "absolute",
                "top": "50%",
                "left": "50%",
                "display": "block"
        
          });
  
    
}

function removePopup(){
    
         $("#chat, #connectStatus, #send").css({
        "display": ""
    });
        
    
       $("#chatBox").css({
              "background-color" : "",
          
          });  

       $("#userName").css({
              
                "margin": "",
                "padding": "",
                "background": "",
                "border-radius":"",
                "width": "",
                'margin-left': '',
                'margin-top': '',
                "position": '',
                "top": '',
                "left": '',
                "display": ''
        
          });
  
        
        
}


// input to take username from popup

   

    $("#userName").keypress(function(event){
     
        var userName='';
        
    if((event.which == 13)&&($("#userName").val() != '')){
        
        userName= $("#userName").val();
        $("#userName").val('');
        removePopup();
        
        // Send the user name to the Server
        
        socket.emit("newUser", {
            
            message: userName,
            user : '/#'+socket.id
        });
    }
      
});
  
