/**
 * Created by aziz on 03/12/2015.
 */

  var jqex = {};
  jqex.path = location.href;
  jqex.current = -1;
  jqex.$links = [];
  jqex.footer = function(){
      $('<div>' ).addClass('footer')
        .html("<span>A. DAAIF</span> - ENSET-M UH2 Casablanca")
        .appendTo(document.body);
  };
  jqex.navigate = function(index){
    var $this = this, currentPath;
    if($this.current == index || index < 0) return;
    var url = (index==0)
          ? 'interface/html/home.inc.html'
          : (index<10)
                ?  'exercices/exercice_0' + index + '.html'
                :  'exercices/exercice_' + index + '.html';
    var $container = $('#container' );
    //currentPath = '#' + url;
    $.get(url )
      .done(function(html){
        history.pushState({index: $this.current}, url);
        $container.html(html);
        var oldIndex = $this.current;
        $this.current = index;
        $container.trigger('page:change', {
          current : index,
          previous: oldIndex
        });
      } ).always(function(){

      });
  };
  jqex.init = function(){
    var $this = this;
    window.onpopstate = function(evt){
      var i = (evt.state) ? evt.state.index : -1;
      if(i > -1)
        $this.navigate(i);
    };
    $.get('interface/html/header.inc.html')
      .done(function(html){
        $('body' ).prepend(html);
        $this.footer();
        $this.navigate(0);
        $this.$links = [
            $('#home' ).click(function(evt){
              evt.preventDefault();
              $this.navigate(0);
            }),
            $('#previous' ).click(function(evt){
              evt.preventDefault();
              $this.navigate($this.current -1);
            }),
            $('#next' ).click(function(evt){
              evt.preventDefault();
              $this.navigate($this.current + 1);
            }),
            $('#response' ).click(function(evt){
              evt.preventDefault();
              $this.showResponse();
            }),
            $('#refresh' ).click(function(evt){
              evt.preventDefault();
              $this.refresh();
            }),
            $('#reset' ).click(function(evt){
              evt.preventDefault();
              $this.reload();
            })
          ];
        $('#container' ).on('page:change', function(e, evt){
          if (evt.current == 0) {
            $('.cmd li').hide(400);
          } else {
            $('.cmd li').show(400);
            // Display content of #ce
            $this.refresh();
            // Display script-xx.js
            $this.loadScript(evt.current);
            // Hide/show Description handler
            $this.showDescription();
          }
        })
      })
  };
  jqex.loadScript = function(index){
    var num = (index<10) ? '0' + index : index;
            var scriptUrl = 'reponses/script-' + num + '.js';
            $.get(scriptUrl).done(function(script){
              $('#reponse' ).text(script);
              Prism.highlightAll();
            });
  };
  jqex.refresh = function(){
    $code = $('.code code' ).text($('.markup' ).html());
      Prism.highlightElement($code.get(0));
  };
  jqex.reload = function(){
    var index = this.current;
    this.current = -1;
    this.navigate(index);
  };
  jqex.showDescription = function(){
    $sel = $('.enonce' ).children('h2' ).append(
      $('<span>' ).text('Cliquez pour masquer ou afficher l\'énoncé' )
    ).click(function(){
      $(this ).next().toggle(400);
    });
  };
  jqex.showResponse = function(){
    var ext = null; // = params.ext || '.png';
    var $this = this
      , num = (this.current<10) ? '0' + this.current : this.current
      , defaultUrl = 'apercus/default.png'
      , url = defaultUrl
      , $back
      , $img
      , $d1 = $.Deferred()
      , $d2 = $.Deferred()
      , $d3 = $.Deferred();
    $.ajax('apercus/exercice-' + num + '.png', {method: 'HEAD'} )
        .done(function(){ext = '.png'; })
        .always(function(){$d1.resolve();});
    $.ajax('apercus/exercice-' + num + '.gif', {method: 'HEAD'})
        .done(function(){ext = '.gif';})
        .always(function(){$d2.resolve();});
      $.ajax('apercus/exercice-' + num + '.jpg', {method: 'HEAD'})
        .done(function(){ext = '.jpg';})
        .always(function(){$d3.resolve();});
    $.when($d1, $d2, $d3).done(function(){
        url = ext != null ? 'apercus/exercice-' + num + ext : url;
        $this.zoomImage(url);
    });

  };
  jqex.zoomImage = function(url, cls){

    cls = cls || 'apercu';

    $img_loader = $('<img>' ).css({
      width: '10%',
      left: '45%'
    }).attr('src', 'interface/images/loader.gif');

    $back = $('<div>' )
          .addClass('apercu')
          .addClass(cls)
          .css('height', $('html' ).outerHeight())
          .append($img_loader)
          .appendTo($('body'));


    $($back).one('click',function(){
            $back.remove();
          } );
    $img = $('<img>' ).load(function(){
        $back.children('img' ).remove();
        $back.append(this);
      }).attr('src', url );
 };
  jqex.init();

