jQuery(function($){
  $('.gallery').each(function(){
    var $gallery = $(this);
    $gallery.magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
        enabled: true,
        tCounter: '%curr% ' + i18n.of + ' %total%',
      },
      callbacks: {
        elementParse: function(item) {
          // the class name
          if($(item.el.context).hasClass('video-link')) {
            item.type = 'iframe';
          } else {
            item.type = 'image';
          }
        }
      },
    })
  });
});