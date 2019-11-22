jQuery(function($){
  
  levels = phpVars.levels;

  if(getUrlParam('floor', false)){
    var currentLevel = parseInt(getUrlParam('floor', false));
    for(var i = 0; i < levels.length; i++){
      if(levels[i] == currentLevel){
        currentLevelPosition = i;
        break;
      }
    }
  }else{
    currentLevel = parseInt(levels[0]);
    currentLevelPosition = 0;
  }
    
  hideArrows();
          
  $menuSelect = new Dropkick($('.salon-maps__select-level')[0]);
  
  $('.salon-maps__maps-track').magnificPopup({
    type: 'image',
    delegate: '.salon-maps__map-outer a',
    gallery: {
      enabled: true,
      tCounter: '%curr% ' + phpVars.i18n.of + ' %total%',
    }
  })
  
  $('.salon-maps__select-level').on('change', function(){
    var $select = $(this);
    currentLevelPosition = $select.prop('selectedIndex');
    changeFloor($select.val());
  });
  
  $('.salon-maps__up').on('click', function(){
    
    if(currentLevelPosition + 1 < levels.length){
      currentLevelPosition++;
      changeFloor(levels[currentLevelPosition]);
    }      
  });
  
  $('.salon-maps__down').on('click', function(){
    
    if(currentLevelPosition - 1 >= 0){
      currentLevelPosition--;
      changeFloor(levels[currentLevelPosition]);
    }      
  });
  
  $('.salon-maps__dot').on('click', function(){
    var $dot = $(this);
    if(!$dot.hasClass('current')){
      currentLevelPosition = $dot.data('index');
      changeFloor($dot.data('level'));
    }
  });
  
  function switchDot(){
    
    $('.salon-maps__dot.current').removeClass('current');
    $('.salon-maps__dot').eq(currentLevelPosition).addClass('current');
  }
  
  function hideArrows(){
    if(currentLevelPosition == 0){
      $('.salon-maps__down').css({opacity: 0.33});
    }else{
      $('.salon-maps__down').css({opacity: 1});
    }
    if(currentLevelPosition >= levels.length - 1){
      $('.salon-maps__up').css({opacity: 0.33});
    }else{
      $('.salon-maps__up').css({opacity: 1});
    }
  }
  
  function switchSelect(floor){
    $('.salon-maps__select-level').val(floor);
    $menuSelect.refresh();
  }
  
  function changeFloor(floor){
      
    const $currentMap = $('.salon-maps__map-outer.current');
    const $targetMap = $('.salon-maps__map-outer[data-level='+floor+']');
    const currentPosition = $currentMap.data('level');
    
    if(currentPosition < floor){
      var movement = '60px';
    }else{
      var movement = '-60px';
    }
    
    $currentMap.removeClass('current').stop(true,false).animate({top: '+='+movement}, 500, function(){
      $(this).css({top: 0});
    });
    $targetMap.addClass('current').removeClass('invisible').css({top: '-='+movement}).stop(true,false).animate({top: '+='+movement}, 500);
    
    const $currentDescription = $('.salon-maps__level-description-outer.current');
    const $targetDescription = $('.salon-maps__level-description-outer[data-level='+floor+']');
    
    $currentDescription.removeClass('current');
    $targetDescription.addClass('current').removeClass('invisible')
    
    const $currentExhibitors = $('.map-exhibitors__list.current');
    const $targetExhibitors = $('.map-exhibitors__list[data-level='+floor+']');
    
    $currentExhibitors.removeClass('current');
    $targetExhibitors.addClass('current').removeClass('invisible')
    
    setTimeout(function(){
      if(!$currentMap.hasClass('current')){
        $currentMap.addClass('invisible');
        $currentDescription.addClass('invisible');
        $currentExhibitors.addClass('invisible');
      }
    },500);
            
    hideArrows();
    switchDot();
    switchSelect(floor);
      
  }
      
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }
  
  function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
  }
});