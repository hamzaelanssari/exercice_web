//  chemin relatif : reponses/script-01.js
//
$('#ce div').first().css("color", "red"); //1
//2
$('#ce div').first().clone(true).appendTo('#ce'); //2
$('#ce div:last-child').prependTo("#ce"); //3
//4
var counter = $("#ce > div").length;
var counterElement = $('<div class="counter"></div>').text(counter).appendTo('#ce');
//5
$('#ce div').each(function(index){
   $(this).addClass("n"+index);
});