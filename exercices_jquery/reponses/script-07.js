//  Chemin relatif : reponses/script-08.js
//1 et 2
var box = $('.box');
$(document).keydown(function(e) {
    var LeftPos = box.offset().left;
    var TopPos=box.offset().top;
    if(e.which == 37 && e.shiftKey){
        console.log("SHIFT + left");
        box.offset({ left : LeftPos-5});
    }
    if(e.which == 38 && e.shiftKey){
        console.log("SHIFT + up");
        box.offset({ top : TopPos-5});
    }   
    if(e.which == 39 && e.shiftKey){
        console.log("SHIFT + right"); 
        box.offset({ left : LeftPos+5});
    }
    if(e.which == 40 && e.shiftKey){
        console.log("SHIFT + down");
        box.offset({ top : TopPos+5});
    }
  });









