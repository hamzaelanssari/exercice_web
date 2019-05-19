//  chemin relatif : reponses/script-02.js
$('#ce .box').each(function ( i ) {
    //$(this).delay( i * 400 ).fadeOut(500);
    $(this).delay(100*(i++)).animate({
        height: '-=100',
        width:'-=100',
        opacity: "-=1"
    }, 200).animate({
        height: '+=100',
        width: '+=100',
        opacity: "+=1"
    }, 300);
});
    



