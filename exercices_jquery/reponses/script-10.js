//  Chemin relatif : ../reponses/script-10.js
console.log();
var position = $('#imgsrc').offset();
console.log(position);

var width = $('#imgsrc').width();
var height = $('#imgsrc').height();
var positionX,positionY;
$("#imgsrc").on('mousemove',function(event){
    positionX = (event.clientX - position.left+24) * 100 / width; 
    positionY = (event.clientY - position.top+10)* 100 / height; 
    if(positionX > 100) positionX = 100;
    if(positionY > 100) positionY = 100;
    $('.box').css("background-position", "top " + parseInt(positionY) + "%" + " left " + parseInt(positionX) + "%");   
});










