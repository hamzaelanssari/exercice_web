//  Chemin relatif : reponses/script-05.js
//1 et 2
var tablerows = $('table > tbody > tr').length;
var total = $('table > tbody > tr:nth-child('+tablerows+') > td:nth-child(2)');
total.text(0);
$('table > tbody > tr').each(function ( i ) {
    if(i > 0 && i < tablerows){
        var subtotal = 0;
        subtotal = Number($(':nth-child(2)', this).text()*$(':nth-child(3)', this).text());
        total.text(subtotal+ Number(total.text()));
        $(':nth-child(4)', this).text(subtotal);  
    }
});
//format number








