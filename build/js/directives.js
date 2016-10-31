(function(){
  angular.module('perroAgave.directives', [])

  .directive('headerTop', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/header-top.html',
      controller: function($document){

        $('.submenu').slideUp(0);

        $('.menu-nav-li .cont-image').click(function(){ $('.submenu').slideDown(250); });

        $('.submenu .cont-image').click(function(){ $('.submenu').slideUp(250); });

        $('.menu-nav-li').hover(function(){
          $(this).css({'background':'#FFF'});
          $('.cont-image-selected img', this).attr('src','./src/images/icon-04.png');
        }, function(){
          $(this).css({'background':'none'});
          $('.cont-image-selected img', this).attr('src','./src/images/icon-03.png');
        });

      }
    }
  })

  .directive('menuSocial', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/menu-social.html',
      controller: function($document){

        var menuOpen = true;
        $('.close-open-element').click(function(){
          var tam = ($('.menu-social-fixed').width()/3)*2;
          if(menuOpen){
            $('.menu-social-fixed').css({'margin-left':'-'+tam+'px'});
            $('.close-open-element div img').attr('src', './src/images/sicon-02.png');
          }else{
            $('.menu-social-fixed').css({'margin-left':'0px'});
            $('.close-open-element div img').attr('src', './src/images/sicon-01.png');
          }
          menuOpen = !menuOpen;
        });

      }
    }
  })

  .directive('introHome', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/intro-home.html',
      controller: function($document){
        $('.goDown').click(function(){
          var position = $('.container-us').offset().top;
          $('body, html').animate({
            scrollTop : position - 50
          }, 500);
        });
      }
    }
  })

  .directive('nosotrosHome', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/nosotros-home.html'
    }
  })

  .directive('serviciosHome', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/servicios-home.html',
      controller: function($document){

        $(window).resize(function(){
          var tam_width = $(window).width();
          if(tam_width>623){
            $('.click-left, .click-right').css({'display':'block'});
            $('.right-service').css({'position':'absolute'});
          }
        });

        $('.service-item .title-service').hover(function(){
          $('span', this).css({'font-weight' : '800', 'border-bottom' : '2px solid #FFF'});
        }, function(){
          $('span', this).css({'font-weight' : 'normal', 'border-bottom' : '0px solid #FFF'});
        });

        $('.general-desc .title').hover(function(){
          $(this).css({'opacity':'0'});
        }, function(){
          $(this).css({'opacity':'1'});
        });

        $('.click-left').click(function(){
          var tam_width = $(window).width();
          if(tam_width<=623){
            $('.click-left, .click-right').css({'display':'none'});
            $('.left-service').css({'position':'relative'});
          }else{
            $('.click-left, .click-right').css({'display':'block'});
            $('.left-service').css({'position':'absolute'});
          }
          $('.left-service').css({'margin-left':'0%'});
          var position = $('.container-services').offset().top;
          $('body, html').animate({
            scrollTop : position - 110
          }, 500);
        });

        $('.left-service .close-service').click(function(){
          var tam_width = $(window).width();
          if(tam_width<=623){
            $('.click-left, .click-right').css({'display':'block'});
            $('.left-service').css({'position':'absolute'});
          }else{
            $('.click-left, .click-right').css({'display':'block'});
            $('.left-service').css({'position':'absolute'});
          }
          $('.left-service').css({'margin-left':'-100%'});
        });

        $('.click-right').click(function(){
          var tam_width = $(window).width();
          if(tam_width<=623){
            $('.click-left, .click-right').css({'display':'none'});
            $('.right-service').css({'position':'relative'});
          }else{
            $('.click-left, .click-right').css({'display':'block'});
            $('.right-service').css({'position':'absolute'});
          }
          $('.right-service').css({'margin-left':'0%'});
          var position = $('.container-services').offset().top;
          $('body, html').animate({
            scrollTop : position - 110
          }, 500);
        });

        $('.right-service .close-service').click(function(){
          var tam_width = $(window).width();
          if(tam_width<=623){
            $('.click-left, .click-right').css({'display':'block'});
            $('.right-service').css({'position':'absolute'});
          }else{
            $('.click-left, .click-right').css({'display':'block'});
            $('.right-service').css({'position':'absolute'});
          }
          $('.right-service').css({'margin-left':'100%'});
        });

      }
    }
  })

  .directive('eventosHome', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/eventos-home.html'
    }
  })

  .directive('gridCarruselGallery', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/grid-carrusel-gallery.html',
      controller: function($document){
        $('.partial-container .container-gen').each(function(){
          var tam = $('.container-carrusel .group-items', this).length;
          $('.container-carrusel', this).css({'width': 100*tam+'%', 'margin-left':'0'});
          $('.container-carrusel .group-items', this).css({'width': 100/tam+'%'});
          if(tam<=1)
          $('.displace', this).css({'display':'none'});
        });
        $('.proximos .right-displace').click(function(){
          var pos = parseInt($(this).siblings('.container-carrusel').attr('data-pos'));
          var elements = $(this).siblings('.container-carrusel').children('.group-items').length;
          if(pos<elements) $(this).siblings('.container-carrusel').attr('data-pos', pos+1);
          else $(this).siblings('.container-carrusel').attr('data-pos', 1);
          pos = parseInt($(this).siblings('.container-carrusel').attr('data-pos'));
          $(this).siblings('.container-carrusel').css({'margin-left':"-"+((pos-1)*100)+"%"});
        });
        $('.proximos .left-displace').click(function(){
          var pos = parseInt($(this).siblings('.container-carrusel').attr('data-pos'));
          var elements = $(this).siblings('.container-carrusel').children('.group-items').length;
          if(pos==1) $(this).siblings('.container-carrusel').attr('data-pos', elements);
          else $(this).siblings('.container-carrusel').attr('data-pos', pos-1);
          pos = parseInt($(this).siblings('.container-carrusel').attr('data-pos'));
          $(this).siblings('.container-carrusel').css({'margin-left':"-"+((pos-1)*100)+"%"});
        });
        $('.proximos .group-items').click(function(){
          var element = $(this);
          var position = $(this).parent().parent().offset().top;
          element.parent().parent().siblings('.info-event').css({'top':'0%'});
          element.parent().parent().css({'opacity':'0'});
          $('body, html').animate({
            scrollTop : position - 250
          }, 1000, function(){
            element.parent().parent().siblings('.info-event').css({'position': 'relative'});
            element.parent().parent().css({'display' : 'none'});
            element.parent().parent().parent().css({'overflow':'inherit'});
          });
        });
        $('.close-view').click(function(){
          $(this).parent().parent().parent().parent().css({'position': 'absolute'});
          $(this).parent().parent().parent().parent().css({'top':'-150%'});
          $(this).parent().parent().parent().parent().siblings('.container-gen').css({'opacity':'1'});
          $(this).parent().parent().parent().parent().siblings('.container-gen').css({'display':'block'});
          $(this).parent().parent().parent().parent().parent().css({'overflow':'hidden'});
        });
      }
    }
  })

  .directive('gridCarruselEvent', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/grid-carrusel-event.html',
      controller: function($document){

        $(window).resize(function(){
          var h_event = $('.info-event .gallery .preview').height();
          $('.info-event .gallery .list-gallery-images').css({'height':h_event+'px'});
        });

        $('.partial-container .container-gen').each(function(){
          var tam = $('.container-carrusel .group-items', this).length;
          $('.container-carrusel', this).css({'width': 100*tam+'%', 'margin-left':'0'});
          $('.container-carrusel .group-items', this).css({'width': 100/tam+'%'});
          if(tam<=1)
          $('.displace',this).css({'display':'none'});
        });

        $('.eventos .right-displace').click(function(){
          var pos = parseInt($(this).siblings('.container-carrusel').attr('data-pos'));
          var elements = $(this).siblings('.container-carrusel').children('.group-items').length;
          if(pos<elements) $(this).siblings('.container-carrusel').attr('data-pos', pos+1);
          else $(this).siblings('.container-carrusel').attr('data-pos', 1);
          pos = parseInt($(this).siblings('.container-carrusel').attr('data-pos'));
          $(this).siblings('.container-carrusel').css({'margin-left':"-"+((pos-1)*100)+"%"});
        });

        $('.eventos .left-displace').click(function(){
          var pos = parseInt($(this).siblings('.container-carrusel').attr('data-pos'));
          var elements = $(this).siblings('.container-carrusel').children('.group-items').length;
          if(pos==1) $(this).siblings('.container-carrusel').attr('data-pos', elements);
          else $(this).siblings('.container-carrusel').attr('data-pos', pos-1);
          pos = parseInt($(this).siblings('.container-carrusel').attr('data-pos'));
          $(this).siblings('.container-carrusel').css({'margin-left':"-"+((pos-1)*100)+"%"});
        });

        $('.eventos .group-items').click(function(){
          var element = $(this);
          var position = $(this).parent().parent().offset().top;
          element.parent().parent().siblings('.info-event').css({'top':'0%'});
          element.parent().parent().css({'opacity':'0'});
          element.parent().parent().parent().css({'overflow':'inherit'});
          var h_event = $('.info-event .gallery .preview').height();
          $('.info-event .gallery .list-gallery-images').css({'height':h_event+'px'});
          $('body, html').animate({
            scrollTop : position - 250
          }, 1000, function(){
            element.parent().parent().siblings('.info-event').css({'position': 'relative'});
            element.parent().parent().css({'display' : 'none'});
          });
        });

        $('.close-view').click(function(){
          $(this).parent().parent().parent().parent().css({'position': 'absolute'});
          $(this).parent().parent().parent().parent().css({'top':'-150%'});
          $(this).parent().parent().parent().parent().siblings('.container-gen').css({'opacity':'1'});
          $(this).parent().parent().parent().parent().siblings('.container-gen').css({'display':'block'});
          $(this).parent().parent().parent().parent().parent().css({'overflow':'hidden'});
        });
        var h_ul_gallery = $('.list-gallery-images ul').height();

        $('.gotopicon').on('mouseover', function(){
          var h_ul_gallery = $('.list-gallery-images ul').height();
          var position = parseInt($('.list-gallery-images ul').css('margin-top').replace(/[^-\d\.]/g, ''));
          if(position<0)
          $('.list-gallery-images ul').css({'margin-top':(position+150)+'px'});
        });

        $('.godownicon').on('mouseover', function(){
          var h_ul_gallery = $('.list-gallery-images ul').height();
          var h_event = $('.info-event .gallery .preview').height();
          var position = parseInt($('.list-gallery-images ul').css('margin-top').replace(/[^-\d\.]/g, ''));
          if(((position*-1))<h_event)
          $('.list-gallery-images ul').css({'margin-top':(position-150)+'px'});
        });

        $('.list-gallery-images ul li').click(function(){
          var getImage = $('img', this).attr('src');
          $('.preview img').attr('src',getImage);
        });

      }
    }
  })

  .directive('shopCarrusel', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/shop-carrusel.html',
      controller: function($document){

        $('.container-guide').slideUp(0);

        $('.openGuide').click(function(){
          $('.container-guide').slideDown(500);
        });

        $('.partial-container .container-shop').each(function(){
          var tam = $('.container-carrusel .group-items', this).length;
          $('.container-carrusel', this).css({'width': 100*tam+'%', 'margin-left':'0'});
          $('.container-carrusel .group-items', this).css({'width': 100/tam+'%'});
          if(tam<=1)
          $('.displace', this).css({'display':'none'});
        });

        $('li .view-most').click(function(){
          $(this).siblings('.information-bottle').css({'top':'0%'});
        });

        $('.close-info-bottle').click(function(){
          $(this).parent().css({'top':'-100%'});
        });

        $('.container-gall-shop-list .vmr').click(function(){
          var pos = parseInt($(this).siblings('.carrusel-shop-container').children('.container-carrusel').attr('data-pos'));
          var elements = $(this).siblings('.carrusel-shop-container').children('.container-carrusel').children('.group-items').length;
          if(pos<elements) $(this).siblings('.carrusel-shop-container').children('.container-carrusel').attr('data-pos', pos+1);
          else $(this).siblings('.carrusel-shop-container').children('.container-carrusel').attr('data-pos', 1);
          pos = parseInt($(this).siblings('.carrusel-shop-container').children('.container-carrusel').attr('data-pos'));
          $(this).siblings('.carrusel-shop-container').children('.container-carrusel').css({'margin-left':"-"+((pos-1)*100)+"%"});
        });

        $('.container-gall-shop-list .vml').click(function(){
          var pos = parseInt($(this).siblings('.carrusel-shop-container').children('.container-carrusel').attr('data-pos'));
          var elements = $(this).siblings('.carrusel-shop-container').children('.container-carrusel').children('.group-items').length;
          if(pos==1) $(this).siblings('.carrusel-shop-container').children('.container-carrusel').attr('data-pos', elements);
          else $(this).siblings('.carrusel-shop-container').children('.container-carrusel').attr('data-pos', pos-1);
          pos = parseInt($(this).siblings('.carrusel-shop-container').children('.container-carrusel').attr('data-pos'));
          $(this).siblings('.carrusel-shop-container').children('.container-carrusel').css({'margin-left':"-"+((pos-1)*100)+"%"});
        });

      }
    }
  })

  .directive('sliderBottles', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/slider-bottles.html',
      controller: function($document){

        setTimeout(function(){
          var swiper = new Swiper('.swiper-container', {
              slidesPerView: 5,
            	initialSlide: 2,
              paginationClickable: true,
            	centeredSlides: true,
      	      keyboardControl: true,
              slideToClickedSlide: true,
              nextButton: '.swiper-button-next',
              prevButton: '.swiper-button-prev',
              breakpoints: {
                 1024: {
                   slidesPerView: 3,
                   spaceBetweenSlides: 10
                 },
                 768: {
                   slidesPerView: 1,
                   spaceBetweenSlides: 10
                 }
               }
          })
          $('.swiper-button-prev').on('click', function(e){
            swiper.swipePrev()
          })
          $('.swiper-button-next').on('click', function(e){
            swiper.swipeNext()
          });
        },150);

        $( "span.name-bottle" ).click(function() {
          //cambiar a modal abierto
          $('.swiper-modal').removeClass('modal-close');
          $('.swiper-modal').addClass('modal-open');

          //ocultar botellas
          if ($(window).width() <= 970){$('.swiper-container.swiper-container-horizontal').css('display','none');}

          //adicionalmente, ocultar botellas si hacen resize
          $(window).resize(function(){
            if ($(window).width() <= 970){
              console.log('ayy');
              $('.swiper-container.swiper-container-horizontal').css('display','none');
            }
          });
        });

        $( ".arrow-close" ).click(function() {
          //cambiar a modal cerrado
          $('.swiper-modal').removeClass('modal-open');
          $('.swiper-modal').addClass('modal-close');

          //mostrar botellas
          if ($(window).width() <= 970){ $('.swiper-container.swiper-container-horizontal').css('display','flex'); }

          //adicionalmente, mostrar botellas si hacen resize
          $(window).resize(function(){
            if ($(window).width() <= 970){
              $('.swiper-container.swiper-container-horizontal').css('display','flex');
            }
          });
        });

      }
    }
  })

  .directive('contactForm', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/contact-form.html',
      controller: function($document){
        $('.msgSendend').slideUp(0);
        $('.buttom-sm').click(function(){
          $('#subbuttom').trigger('click');
        });
        $('.container-contact form').submit(function(){
          $(this)[0].reset();
          $('.msgSendend').slideDown(500);
        });
      }
    }
  })

  .directive('bottomSite', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/bottom-site.html',
      controller: function($document){
        $('.msgSendend').slideUp(0);
        $('.buttom-sm').click(function(){
          $('#subbuttom').trigger('click');
        });
        $('.container-contact form').submit(function(){
          $(this)[0].reset();
          $('.msgSendend').slideDown(500);
        });
      }
    }
  })

  .directive('profileView', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/profile.html',
      controller: function($document){

      //ABRIR CAMPOS PARA EDITAR PERFIL
      $('.edit-button.edit-data').click(function(){
        $('input.profile-input').removeAttr('readonly');
        $('.edit-button.edit-data').toggleClass( 'save-changes');
        $('.edit-button.edit-mail,.edit-button.edit-passwd').toggleClass('hide-button show-button');
        $('input.profile-input').css('border','1px solid gray');
      });

      //GUARDA CAMBIOS DE PERFIL
      $('.edit-button.edit-data.show-button.save-changes').click(function(){
        $('input.profile-input').attr('readonly', true);
        $('input.profile-input').css('border','0');
      });

      //ABRIR MODAL EDITAR EMAIL
      $('.edit-mail').click(function(){
        $('.profile-modal').css('display','flex');
        $('input.send-info-pass-email').removeClass('modal-edit-passwd');
        $('input.send-info-pass-email').addClass('modal-edit-mail');
        $('input.send-info-pass-email').attr('id','email');
      });

      //ABRIR MODAL EDITAR CONTRASEÑA//
      $('.edit-passwd').click(function(){
        $('.profile-modal').css('display','flex');
        $('input.send-info-pass-email').removeClass('modal-edit-mail');
        $('input.send-info-pass-email').addClass('modal-edit-passwd');
        $('input.send-info-pass-email').attr('id','passwd');
      });

      //EDITAR EMAIL//
      $('input.send-info-pass-email.modal-edit-mail').click(function(){
        //SI LA CONTRASEÑA NO ES CORRECTA
        $('span.wrong-pass').css('display','block');
        setTimeout(function(){
          $('span.wrong-pass').css('display','none');
        }, 3500);

        //SI LA CONTRASEÑA ES CORRECTA
        $('span.change-mail-pass.change-mail-email').css('display','block');
        $('input.modal-pass.check-pass').css('display','block');
      });

      //EDITAR CONTRASEÑA//
      $('.modal-edit-passwd').click(function(){
        //SI LA CONTRASEÑA NO ES CORRECTA
        $('span.wrong-pass').css('display','block');
        setTimeout(function(){
          $('span.wrong-pass').css('display','none');
        }, 3500);

        //SI LA CONTRASEÑA ES CORRECTA
        $('span.change-mail-pass.change-passwd').css('display','block');
        $('input.modal-pass.check-pass').css('display','block');
      });

      //CERRAR MODAL//
      $('span.close-icon,.close-modal-bg').click(function(){
        $('.profile-modal').css('display','none');
        $('span.change-mail-pass.change-mail-email,span.change-mail-pass.change-passwd').css('display','none');
        $('input.modal-pass.check-pass').css('display','none');
      });

      }
    }
  })

  .directive('popUpInfo', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/pop-up-info.html'
    }
  })

  .directive('formLogin', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/form-login.html',
      controller: function($document){

      }
    }
  })

  .directive('formRegister', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/form-register.html',
      controller: function($document){

      }
    }
  })

  .directive('introSite', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/intro-site.html'
    }
  })

  .directive('compra', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/compra.html',
      controller: function($document){
      }
    }
  })

  .directive('instagramPhotos', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/instagram-photos.html',
      controller: function($document){
      }
    }
  })

})();
