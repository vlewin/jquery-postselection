(function( $ ){
  $.fn.postSelection = function(options) {
      var settings = $.extend( {
        'url' : '',
        'text' : 'send selection'
        
      }, options);
      
      get = function(){
        var selection = window.getSelection();
        var range =  window.getSelection().getRangeAt(0);
        
        var $firstElement = $(window.getSelection().getRangeAt(0).startContainer.parentNode);
        var $lastElement = $(window.getSelection().getRangeAt(0).endContainer.parentNode);
        var $parentElement =   $(range.commonAncestorContainer);
        
        var selectedText = range.toString().replace(/(\r\n|\n|\r)/gm,"").replace(/[ \t\r]+/g," ");

        var left = $firstElement.offset().left;
        var top = $firstElement.offset().top;

        var dialog = '<div id="selectionDialog"><a id="sendSelection" href="#" onclick="send()">' + settings.text + '</a><a id="removeSendSelection" href="#">x</a></div>';
        
        if(selectedText != '') {
          if($parentElement.has("#selectionDialog").length == 0) { 
            $parentElement.append(dialog);
          }
        } else {
          $("#selectionDialog").remove();
        }
        
        $("#selectionDialog").css({
            "position":"absolute", 
            "top": 0, 
            "left": ($(window).width()/2)-80,
            "width" : "160px",
            "color" : "#fff",
            "border" : "1px solid #222",
            "border-radius": "0px 0px 5px 5px",
            "text-shadow":"0px 0px 1px #000",
            "padding" : "5px 0px",
            "text-align" : "center",
            "text-decoration" : "none",
            "font-weight": "bold",
            "background" : "#444"
            
        });        
        
        $("#sendSelection").css({
            "color" : "#fff",
            "text-shadow":"0px 0px 1px #000",
            "text-decoration" : "none",
            "margin-right" : "5px"
        });
        
        $("#removeSendSelection").css({
            "color" : "red",
            "padding" : "0px 5px",
            "text-decoration" : "none",
            "margin-left" : "5px",
            "background" : "#222"
            
        });
        
        return {"firstElement" : $firstElement.attr('class'), "lastElement" : $lastElement.attr('class'), "text" : selectedText}
      }
      
      remove = function() {
        if(!$('body').has("#selectionDialog").length == 0) { 
          $("#selectionDialog").remove()
        }
      
      }
      
      send = function(text){
        var text = get();
        $("#selectionDialog").remove()

        if(text !=''){ $.post(settings.url, {"data" : text}, function(data) { }) }
      }

      $(this).bind("mouseup", get);
      $("#removeSendSelection").live("click", remove);
      return true;
  };
})( jQuery );


$(function(){
  var host = "http://localhost:3000";
  $("#ol").postSelection({ url : host});
})

