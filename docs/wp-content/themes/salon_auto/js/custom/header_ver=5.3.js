jQuery(function($){
  $('.header-bar__toggle').on('click', function(){
    var $toggle = $(this);
    if(!$toggle.hasClass('active')){
      $toggle.addClass('active');
      $('.menu-panel').stop(true,false).slideDown(500, function(){
        bodyScrollLock.disableBodyScroll($('.menu-panel')[0]);
      });
    }else{
      $toggle.removeClass('active');
      $('.menu-panel').stop(true,false).slideUp(500, function(){
        bodyScrollLock.enableBodyScroll($('.menu-panel')[0]);
      });
    }
  });
  
  $('.mobile-menu__arrow').on('click', function(e){
    e.preventDefault();
    var $arrow = $(this)
    var $submenu = $arrow.parent('a').siblings('ul.sub-menu');
    
    if(!$arrow.hasClass('active')){
      $('.mobile-menu__arrow.active').removeClass('active').parent('a').siblings('ul.sub-menu').stop(true,false).slideUp();
      $arrow.addClass('active');
      $submenu.stop(true,false).slideDown();
    }else{
      $arrow.removeClass('active');
      $submenu.stop(true,false).slideUp();
    }
    
  });
  
  $('.mobile-header__toggle').on('click', function(){
    var $toggle = $(this);
    if(!$toggle.hasClass('close')){
      $toggle.addClass('close');
      $('.mobile-menu').css({left: 0});
      bodyScrollLock.disableBodyScroll($('.mobile-menu')[0]);
    }else{
      $toggle.removeClass('close');
      $('.mobile-menu').css({left: '-100%'});
      bodyScrollLock.enableBodyScroll($('.mobile-menu')[0]);
    }
  });
  
  $('.mobile-menu__menu .sub-menu a').on('click', function(e){
    var $anchor = $(this);
    var href = $anchor.attr('href');
    var explode = href.split('/');
    if(explode[explode.length - 1][0] == '#'){
      e.preventDefault();
      window.location = href;
      $('.mobile-header__toggle').removeClass('close');
      $('.mobile-menu').css({left: '-100%'});
      bodyScrollLock.enableBodyScroll($('.mobile-menu')[0]);
    }
    
  });
  
  $('.standard-text a').has('.button').css({textDecoration: 'none'});
  
});