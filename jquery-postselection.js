(function( $ ){
  $.fn.postSelection = function(options) {
      var settings = $.extend( {
        'url' : '',
      }, options);
    
      get = function(){
        if(window.getSelection){
          return window.getSelection();
        }else if(document.getSelection){
          return document.getSelection();
        }else if(document.selection){
          return document.selection.createRange().text;
        }
      }
      
      send = function(){
        var text = get();
        if(text !=''){
          try {
            var text = text.toString();
            
            $.post(settings.url, {"data" : text}, function(data) {
              console.log("success")
            })
            
            .error(function(error) { console.log(error.status +  " " + error.statusText) });
            
          } catch(error)  {
            console.log("error " + error)
          }
        }
      }

      $(this).bind("mouseup", send)
      return true;
  };
})( jQuery );



$(function(){
  var url = "<URL>";
  $("<HTML ELEMENT>").postSelection({ url : url});
})
