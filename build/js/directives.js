(function(){
  angular.module('perroAgave.directives', [])
  .directive('compra', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/compra.html',
      controller: function($document){
        //
        $('.spaceinputcupon').slideUp();
        $('.mensajeaddcupon').click(function(){
          $('.spaceinputcupon').slideDown();
        });
        //VALIDACIONES//
        $(document).on('change', '.envio-wrapper .right-side-data input[name=name]', function(){
          var expresion = new RegExp("^[a-zA-Zñáéíóú]* ?[a-zA-Zñáéíóú]* ?[a-zA-Zñáéíóú]* ?[a-zA-Zñáéíóú]*$");
          if(expresion.test($(this).val())){
            $(this).css({"border":"2px solid #3ADF00"});
            $(this).attr("data-status", "acepted");
            $(this).siblings('.msgError').text('');
          }else{
            $(this).attr("data-status", "denied");
            $(this).css({"border":"2px solid #DF0101"});
            $(this).siblings('.msgError').text('Campo inválido');
            $('.returnlevel').trigger('click');
          }
        });
        $(document).on('change', '.envio-wrapper .right-side-data input[name=phone], .envio-wrapper .right-side-data input[name=address], .envio-wrapper .right-side-data input[name=addressdescription]', function(){
          if($(this).val().length > 6){
            $(this).css({"border":"2px solid #3ADF00"});
            $(this).attr("data-status", "acepted");
            $(this).siblings('.msgError').text('');
          }else{
            $(this).attr("data-status", "denied");
            $(this).css({"border":"2px solid #DF0101"});
            $(this).siblings('.msgError').text('Campo muy corto');
            $('.returnlevel').trigger('click');
          }
        });
        $(document).on('change', '.envio-wrapper .right-side-data select[name=city], .envio-wrapper .right-side-data select[name=state]', function(){
          $(this).css({"border":"2px solid #3ADF00"});
          $(this).attr("data-status", "acepted");
          $(this).siblings('.msgError').text('');
        });
        $(document).on('change', '.envio-wrapper .right-side-data input[name=postalcode]', function(){
          var expresion = new RegExp("^[a-zA-Zñáéíóú0-9]{4,7}$");
          if(expresion.test($(this).val())){
            $(this).css({"border":"2px solid #3ADF00"});
            $(this).attr("data-status", "acepted");
            $(this).siblings('.msgError').text('');
          }else{
            $(this).attr("data-status", "denied");
            $(this).css({"border":"2px solid #DF0101"});
            $(this).siblings('.msgError').text('Campo inválido');
            $('.returnlevel').trigger('click');
          }
        });
        //VERIFY
        $('.envio-wrapper .validSendData').click(function(){  
          var nameStatus = $('.envio-wrapper .right-side-data input[name=name]').attr('data-status');
          var phoneStatus = $('.envio-wrapper .right-side-data input[name=phone]').attr('data-status');
          var stateStatus = $('.envio-wrapper .right-side-data select[name=state]').attr('data-status');
          var cityStatus = $('.envio-wrapper .right-side-data select[name=city]').attr('data-status');
          var addressStatus = $('.envio-wrapper .right-side-data input[name=address]').attr('data-status');
          var addressDescriptionStatus = $('.envio-wrapper .right-side-data input[name=addressdescription]').attr('data-status');
          var postalCodeStatus = $('.envio-wrapper .right-side-data input[name=postalcode]').attr('data-status');
          if(nameStatus == 'acepted' && phoneStatus == 'acepted' && stateStatus == 'acepted' && cityStatus == 'acepted' && addressStatus == 'acepted' && addressDescriptionStatus == 'acepted' && postalCodeStatus == 'acepted'){
            $.ajax({
              url: './php/functions.php',
              type: 'POST',
              data: {
                namefunction : 'addDirectiontoCart',
                name: $('.envio-wrapper .right-side-data input[name=name]').val(),
                phone: $('.envio-wrapper .right-side-data input[name=phone]').val(),
                state: $('.envio-wrapper .right-side-data select[name=state]').val(),
                city: $('.envio-wrapper .right-side-data select[name=city]').val(),
                address: $('.envio-wrapper .right-side-data input[name=address]').val(),
                addressdescription: $('.envio-wrapper .right-side-data input[name=addressdescription]').val(),
                postalcode: $('.envio-wrapper .right-side-data input[name=postalcode]').val()
              },
              success: function(result){
                if(result == '-1'){
                  $('.returnlevel').trigger('click');
                  $('.errorForm').css({'display':'block'});
                  setTimeout(function(){
                    $('.errorForm').css({'display':'none'});
                  },2000);
                }else{
                  $('.ocultednextstep').trigger('click');
                  $('.right-side-data input, .right-side-data select').css({"border":"2px solid #e5e5e5"});
                }
              },
              error: function(error){
                alert(error);
              },
              timeout: 10000
            });
            //
          }else{
            $('.returnlevel').trigger('click');
            $('.errorForm').css({'display':'block'});
            setTimeout(function(){
              $('.errorForm').css({'display':'none'});
            },2000);
          }
        });
      }
    }
  })
  .directive('headerTop', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/header-top.html',
      controller: function($document){

        setTimeout(function(){
          $('.submenu').slideUp(500);
        },500);

        $(document).on('click', '.menu-nav-li .cont-image', function(){ $('.submenu').slideDown(250); });

        $(document).on('click', '.submenu .cont-image', function(){ $('.submenu').slideUp(250); });

        $('.menu-nav-li').hover(function(){
          $(this).css({'background':'#FFF'});
          $('.cont-image-selected img', this).attr('src','./src/images/icon-04.png');
        }, function(){
          $(this).css({'background':'none'});
          $('.cont-image-selected img', this).attr('src','./src/images/icon-03.png');
        });

        $(document).on('click', '.ancla-top-url', function(e){
          e.preventDefault();
          var link = $(this).attr('href');
          $('html, body').animate({
            scrollTop: $(link).offset().top-100
          }, 1000);
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
        $(document).on('click', '.proximos .group-items ul li', function(){
          var element = $(this).parent().parent();
          var position = $(this).parent().parent().offset().top;
          var idevent = $(this).attr('data-id');
          $.ajax({
            url: './php/services.php',
            type: 'GET',
            data: "namefunction=getEvent&idevent="+idevent,
            success: function(result){
              var data = JSON.parse(result);;
              var eventCover = data.eventCover;
              var eventname = data.eventname.toUpperCase();
              var eventdescription = data.eventdescription;
              var eventscheduledescription = data.eventscheduledescription;
              var eventaddress = data.eventaddress;
              var eventcity = data.eventcity;
              var eventstate = data.eventstate;
              var eventneighborhood = data.eventneighborhood;
              var eventzipcode = data.eventzipcode;
              var eventphonenumer = data.eventphonenumer;
              var eventurl = data.eventurl;
              var eventdate = data.eventdate;
              var arraydate = eventdate.split("-");
              var day = arraydate[2];
              switch (arraydate[1]) {
                case '1': var month = "ENE"; break;
                case '2': var month = "FEB"; break;
                case '3': var month = "MAR"; break;
                case '4': var month = "ABR"; break;
                case '5': var month = "MAY"; break;
                case '6': var month = "JUN"; break;
                case '7': var month = "JUL"; break;
                case '8': var month = "AGO"; break;
                case '9': var month = "SEP"; break;
                case '10': var month = "OCT"; break;
                case '11': var month = "NOV"; break;
                case '12': var month = "DIC"; break;
              }
              $('.info-event .image-event img').attr('./admin/src/images/'+eventCover);
              $('.info-event .desc-event .date .day').text(day);
              $('.info-event .desc-event .date .month').text(month);
              $('.info-event .desc-event .title').text(eventname);
              $('.info-event .desc-event .actions li[name="saveevent"]').attr('data-id', idevent);
              $('.info-event .desc-event .actions li[name="shareevent"]').attr('data-url', eventurl);
              $('.info-event .desc-event .description .gen').text(eventdescription);
              $('.info-event .desc-event .description .info .eventscheduledescription').text(eventscheduledescription);
              $('.info-event .desc-event .description .info .phonenumber').text("Tel: "+eventphonenumer);
              $('.info-event .desc-event .description .info .address').text(eventcity+", "+eventstate+", "+eventaddress+", Col: "+eventneighborhood+", : "+eventzipcode);
              element.parent().parent().siblings('.info-event').css({'top':'0%'});
              element.parent().parent().css({'opacity':'0'});
              $('body, html').animate({
                scrollTop : position - 250
              }, 1000, function(){
                element.parent().parent().siblings('.info-event').css({'position': 'relative'});
                element.parent().parent().css({'display' : 'none'});
                element.parent().parent().parent().css({'overflow':'inherit'});
              });
            },
            error: function(error){
            },
            timeout: 10000
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
        setTimeout(function(){
          $(window).resize(function(){
            var h_event = $('.info-event .gallery .preview').height();
            $('.info-event .gallery .list-gallery-images').css({'height':h_event+'px'});
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
          $(document).on('click', '.eventos .group-items ul li', function(){
            var element = $(this).parent().parent();
            var position = $(this).parent().parent().parent().parent().offset().top;
            element.parent().parent().siblings('.info-event').css({'top':'0%'});
            element.parent().parent().css({'opacity':'0'});
            element.parent().parent().parent().css({'overflow':'inherit'});
            setTimeout(function(){
              var h_event = $('.info-event .gallery .preview').height();
              $('.info-event .gallery .list-gallery-images').css({'height':h_event+'px'});
              $('body, html').animate({
                scrollTop : position - 250
              }, 1000, function(){
                element.parent().parent().siblings('.info-event').css({'position': 'relative'});
                element.parent().parent().css({'display' : 'none'});
              });
            },500);
          });
          $(document).on('click', '.close-view', function(){
            $(this).parent().parent().parent().parent().css({'position': 'absolute'});
            $(this).parent().parent().parent().parent().css({'top':'-150%'});
            $(this).parent().parent().parent().parent().siblings('.container-gen').css({'opacity':'1'});
            $(this).parent().parent().parent().parent().siblings('.container-gen').css({'display':'block'});
            $(this).parent().parent().parent().parent().parent().css({'overflow':'hidden'});
          });
          var h_ul_gallery = $('.list-gallery-images ul').height();
          $(document).on('mouseover', '.gotopicon', function(){
            var h_ul_gallery = $('.list-gallery-images ul').height();
            var position = parseInt($('.list-gallery-images ul').css('margin-top').replace(/[^-\d\.]/g, ''));
            if(position<0)
            $('.list-gallery-images ul').css({'margin-top':(position+150)+'px'});
          });
          $(document).on('mouseover', '.godownicon', function(){
            var h_ul_gallery = $('.list-gallery-images ul').height();
            var h_event = $('.info-event .gallery .preview').height();
            var position = parseInt($('.list-gallery-images ul').css('margin-top').replace(/[^-\d\.]/g, ''));
            if(((position*-1))<h_event)
            $('.list-gallery-images ul').css({'margin-top':(position-150)+'px'});
          });
          $(document).on('click', '.list-gallery-images ul li', function(){
            var getImage = $('img', this).attr('src');
            $('.preview img').attr('src',getImage);
          });
          $(document).on('click', '.sharefacebook', function(){
            var url = window.location.pathname;
            var host = window.location.host;
            url = host+url+"#/event/"+$(this).attr('data-url');
            var left  = ($(window).width()/2)-(550/2),
                top   = ($(window).height()/2)-(550/2),
                popup = window.open ('https://www.facebook.com/sharer/sharer.php?u='+url, "popup", "width=550, height=550, top="+top+", left="+left);
          });
        },1000);
      }
    }
  })
  .directive('loadGridCarrusel', function(){
    return function(){
      $('.partial-container .container-gen').each(function(){
        var tam = $('.container-carrusel .group-items', this).length;
        $('.container-carrusel', this).css({'width': 100*tam+'%', 'margin-left':'0'});
        $('.container-carrusel .group-items', this).css({'width': 100/tam+'%'});
        if(tam<=1)
        $('.displace', this).css({'display':'none'});
      });
    }
  })
  .directive('shopCarrusel', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/shop-carrusel.html',
      controller: function($document){
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
  .directive('loadShopCarrusel', function(){
    return function(){
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
      $(document).on('click', 'li .view-most', function(){
        $(this).siblings('.information-bottle').css({'top':'0%'});
      });
      $(document).on('click', '.close-info-bottle', function(){
        $(this).parent().css({'top':'-100%'});
      });
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
        $.ajax({
          url : './php/enviar.php',
          type : 'POST',
          data : {
            data : $(this).serializeArray()
          },
          success: function(){
            $('.msgSendend').slideUp(0);
            $('.buttom-sm').click(function(){
              $('#subbuttom').trigger('click');
            });
            $('.container-contact form').submit(function(){
              $(this)[0].reset();
              $('.msgSendend').slideDown(500);
            });
          },
          error: function(error){
            alert(error)
          }
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
        $(document).on('click', '.ancla-url', function(e){
          e.preventDefault();
          var link = $(this).attr('href');
          $('html, body').animate({
            scrollTop: $(link).offset().top-100
          }, 1000);
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
        $(document).on('click', '.edit-button.edit-data', function(){
          $('.profile-input').removeAttr('readonly');
          $('.profile-input').removeAttr('disabled');
          // $('.edit-button.edit-data').toggleClass( 'save-changes');
          $('.edit-button.edit-data').addClass('hide-button');
          $('.save-data').removeClass('hide-button');
          $('.edit-button.edit-mail,.edit-button.edit-passwd').toggleClass('hide-button show-button');
          $('.profile-input').css('border','2px solid #e5e5e5');
        });
        //GUARDA CAMBIOS DE PERFIL
        $(document).on('click', '.save-data', function(){
          var status_name = $('.right-side-data input[name=name]').attr('data-status');
          var status_lastname = $('.right-side-data input[name=lastname]').attr('data-status');
          var status_email = $('.right-side-data input[name=email]').attr('data-status');
          var status_phone = $('.right-side-data input[name=phone]').attr('data-status');
          var status_state = $('.right-side-data select[name=state]').attr('data-status');
          var status_city = $('.right-side-data select[name=city]').attr('data-status');
          var status_address = $('.right-side-data input[name=address]').attr('data-status');
          var status_CP = $('.right-side-data input[name=postalcode]').attr('data-status');
          if(status_name == 'acepted' && status_lastname == 'acepted' &&  status_email == 'acepted' && status_phone == 'acepted' && status_state == 'acepted' && status_city == 'acepted' && status_address == 'acepted' && status_CP == 'acepted' ){
            $.ajax({
              url : './php/functions.php',
              type: 'POST',
              data: {
                name : $('.right-side-data input[name=name]').val(),
                lastname : $('.right-side-data input[name=lastname]').val(),
                email : $('.right-side-data input[name=email]').val(),
                phone : $('.right-side-data input[name=phone]').val(),
                state : $('.right-side-data select[name=state] option:selected').val(),
                city : $('.right-side-data select[name=city] option:selected').val(),
                address : $('.right-side-data input[name=address]').val(),
                postalcode : $('.right-side-data input[name=postalcode]').val(),
                id : $(this).attr('data-id-user'),
                namefunction: 'editUserData'
              },
              success: function(result){
                console.log(result);
              },
              error: function(error){alert(error)},
              timeout: 10000
            });
            $('.edit-button.edit-data').removeClass('hide-button');
            $('.save-data').addClass('hide-button');
            $('.profile-input').attr('readonly', 'true');
            $('.profile-input').attr('disabled', 'true');
            $('.edit-button.edit-mail,.edit-button.edit-passwd').toggleClass('hide-button show-button');
            $('.profile-input').css('border','2px solid #FFF');
          }else{
            $('.msgeErrorForm').text('Favor de verificar todos los campos.');
            setTimeout(function(){
              $('.msgeErrorForm').text('');
            },2000);
          }
        });
        //ABRIR MODAL EDITAR CONTRASEÑA//
        $(document).on('click', '.edit-passwd', function(){
          $('.profile-modal').css('display','flex');
          $('input.send-info-pass-email').removeClass('modal-edit-mail');
          $('input.send-info-pass-email').addClass('modal-edit-passwd');
          $('input.send-info-pass-email').attr('id','passwd');
        });
        //COMPROBAR CONTRASEÑA ACTUAL//
        $(document).on('click', '.modal-edit-passwd', function(){
          var password = $('form input[name=password-recovery]').val();
          var iduser = $('form input[name=password-recovery]').attr('data-id-user');
          if(password.length > 0){
            $.ajax({
              url : './php/functions.php',
              type : 'POST',
              data : {
                password : password,
                iduser : iduser,
                namefunction : 'verifyPassword'
              },
              success: function(result){
                if(result=='1'){
                  //SI LA CONTRASEÑA ES CORRECTA
                  $('.current-password').css({'display':'none'});
                  $('.new-password').css({'display':'block'});
                }else{
                  // //SI LA CONTRASEÑA NO ES CORRECTA
                  $('span.wrong-pass').css('display','block');
                  $('input[name=password-recovery]').css({'border-color':'red'});
                  setTimeout(function(){
                    $('input[name=password-recovery]').css({'border-color':'#b7b7b7'});
                    $('span.wrong-pass').css('display','none');
                  }, 2500);
                }
              },
              error: function(error){alert(error)},
              timeout: 10000
            });
          }else{
            $('span.wrong-pass').text('Introduce una contraseña');
            $('span.wrong-pass').css('display','block');
            $('input[name=password-recovery]').css({'border-color':'red'});
            setTimeout(function(){
              $('input[name=password-recovery]').css({'border-color':'#b7b7b7'});
              $('span.wrong-pass').css('display','none');
              $('span.wrong-pass').text('Contraseña incorrecta');
            }, 2500);
          }
        });
        //CAMBIAR CONTRASEÑA
        $(document).on('click', '.set-current-password', function(){
          var id = $(this).attr('data-id-user');
          var pass = $('.new-password input[name=password-new]').val();
          var passverify = $('.new-password input[name=password-new-conf]').val();
          if(pass.length > 0){
            if(passverify.length > 0){
              if(pass==passverify){
                $.ajax({
                  url : './php/functions.php',
                  type : 'POST',
                  data : {
                    id : id,
                    pass : pass,
                    namefunction : 'changePassword'
                  },
                  success: function(result){
                    $('span.wrong-pass').css({'display':'block','color':'#3ADF00'});
                    $('span.wrong-pass').text('Contraseña cambiada');
                    setTimeout(function(){
                      $('span.wrong-pass').css({'display':'none','color':'red'});
                      $('span.wrong-pass').text('Contraseña incorrecta');



                      $('.profile-modal').css('display','none');
                      $('span.change-mail-pass.change-mail-email,span.change-mail-pass.change-passwd').css('display','none');
                      $('input.modal-pass.check-pass').css('display','none');
                      $('.current-password').css({'display':'block'});
                      $('.new-password').css({'display':'none'});
                      $('.modal-pass').val("");


                    },2000);
                  },
                  error: function(){ alert(error); },
                  timeout: 10000
                });
              }else{
                $('span.wrong-pass').text('Contraseñas no identicas');
                $('span.wrong-pass').css('display','block');
                $('.new-password input[name=password-new]').css({'border-color':'red'});
                $('.new-password input[name=password-new-conf]').css({'border-color':'red'});
                setTimeout(function(){
                  $('.new-password input[name=password-new-conf]').val("");
                  $('.new-password input[name=password-new]').val("");
                  $('.new-password input[name=password-new-conf]').css({'border-color':'#b7b7b7'});
                  $('.new-password input[name=password-new]').css({'border-color':'#b7b7b7'});
                  $('span.wrong-pass').css('display','none');
                  $('span.wrong-pass').text('Contraseña incorrecta');
                }, 1500);
              }
            }else{
              $('span.wrong-pass').text('Confirma tu contraseña');
              $('span.wrong-pass').css('display','block');
              $('.new-password input[name=password-new-conf]').css({'border-color':'red'});
              setTimeout(function(){
                $('.new-password input[name=password-new-conf]').css({'border-color':'#b7b7b7'});
                $('span.wrong-pass').css('display','none');
                $('span.wrong-pass').text('Contraseña incorrecta');
              }, 2500);
            }
          }else{
            $('span.wrong-pass').text('Introduce una contraseña');
            $('span.wrong-pass').css('display','block');
            $('.new-password input[name=password-new]').css({'border-color':'red'});
            setTimeout(function(){
              $('.new-password input[name=password-new]').css({'border-color':'#b7b7b7'});
              $('span.wrong-pass').css('display','none');
              $('span.wrong-pass').text('Contraseña incorrecta');
            }, 2500);
          }
        });
        //CERRAR MODAL
        $(document).on('click', 'span.close-icon,.close-modal-bg', function(){
          $('.profile-modal').css('display','none');
          $('span.change-mail-pass.change-mail-email,span.change-mail-pass.change-passwd').css('display','none');
          $('input.modal-pass.check-pass').css('display','none');
          $('.current-password').css({'display':'block'});
          $('.new-password').css({'display':'none'});
          $('.modal-pass').val("");
        });
        //VALIDACIONES//
        $(document).on('change', '.right-side-data input[name=name], .right-side-data input[name=lastname]', function(){
          var expresion = new RegExp("^[a-zA-Zñáéíóú]* ?[a-zA-Zñáéíóú]* ?[a-zA-Zñáéíóú]* ?[a-zA-Zñáéíóú]*$");
          if(expresion.test($(this).val())){
            $(this).css({"border":"2px solid #3ADF00"});
            $(this).attr("data-status", "acepted");
            $(this).siblings('.msgError').text('');
          }else{
            $(this).attr("data-status", "denied");
            $(this).css({"border":"2px solid #DF0101"});
            $(this).siblings('.msgError').text('Campo inválido');
          }
        });
        $(document).on('change', '.right-side-data input[name=email]', function(){
          var useremailown = $(this).attr('data-email');
          var element = $(this);
          var expresion = new RegExp("^[_a-zA-Zñáéíóú0-9-]+(.[_a-zA-Zñáéíóú0-9-]+)*@[a-zA-Zñáéíóú0-9-]+(.[a-zA-Zñáéíóú0-9-]+)*(.[a-zA-Zñáéíóú]{2,4})$");
          if($(this).val() == useremailown){
            element.css({"border":"2px solid #3ADF00"});
            element.attr("data-status", "acepted");
            element.siblings('.msgError').text('');
          }else{
            if(expresion.test($(this).val())){
              $.ajax({
                url: './php/services.php',
                type: 'GET',
                data: "namefunction=getEmailUser&useremail="+$(this).val(),
                success: function(result){
                  if(result!='1'){
                    element.css({"border":"2px solid #3ADF00"});
                    element.attr("data-status", "acepted");
                    element.siblings('.msgError').text('');
                  }else{
                    element.attr("data-status", "denied");
                    element.css({"border":"2px solid #DF0101"});
                    element.siblings('.msgError').text('Este e-mail ya existe.');
                  }
                },
                error: function(error){
                },
                timeout: 10000
              });
            }else{
              $(this).attr("data-status", "denied");
              $(this).css({"border":"2px solid #DF0101"});
              $(this).siblings('.msgError').text('E-mail inválido');
            }
          }
        });
        $(document).on('change', '.right-side-data input[name=phone], .right-side-data input[name=address]', function(){
          if($(this).val().length > 6){
            $(this).css({"border":"2px solid #3ADF00"});
            $(this).attr("data-status", "acepted");
            $(this).siblings('.msgError').text('');
          }else{
            $(this).attr("data-status", "denied");
            $(this).css({"border":"2px solid #DF0101"});
            $(this).siblings('.msgError').text('Campo muy corto');
          }
        });
        $(document).on('change', '.right-side-data select[name=city], .right-side-data select[name=state]', function(){
          $(this).css({"border":"2px solid #3ADF00"});
          $(this).attr("data-status", "acepted");
          $(this).siblings('.msgError').text('');
        });
        $(document).on('change', '.right-side-data input[name=postalcode]', function(){
          var expresion = new RegExp("^[a-zA-Zñáéíóú0-9]{4,7}$");
          if(expresion.test($(this).val())){
            $(this).css({"border":"2px solid #3ADF00"});
            $(this).attr("data-status", "acepted");
            $(this).siblings('.msgError').text('');
          }else{
            $(this).attr("data-status", "denied");
            $(this).css({"border":"2px solid #DF0101"});
            $(this).siblings('.msgError').text('Campo inválido');
          }
        });
      }
    }
  })
  .directive('popUpInfo', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/pop-up-info.html',
      controller: function(){

      }
    }
  })
  .directive('formLogin', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/form-login.html',
      controller: function($document){
        $('#login-form .login-buttom').click(function(){
          var email = $('#login-form label input[name=email]').val();
          var password = $('#login-form input[name=password]').val();
          if(email.length > 0){
            var expresion = new RegExp("^[_a-zA-Zñáéíóú0-9-]+(.[_a-zA-Zñáéíóú0-9-]+)*@[a-zA-Zñáéíóú0-9-]+(.[a-zA-Zñáéíóú0-9-]+)*(.[a-zA-Zñáéíóú]{2,4})$");
            if(expresion.test(email)){
              if(password.length > 0){
                $.ajax({
                  url: './php/functions.php',
                  type: 'POST',
                  data: {
                    email : email,
                    password : password,
                    namefunction : 'loginUser'
                  },
                  success: function(result){
                    if(result==1){
                      $('.msgwelcome-span-login').text('Bienvenido');
                      setTimeout(function(){
                        $('.msgwelcome-span-login').text('');
                        window.location = "#/profile";
                      },2500);
                    }else{
                      if(result==0){
                        $('.msgerror-span-login').text('E-mail o Contraseña invalidos');
                        setTimeout(function(){
                          $('.msgerror-span-login').text('');
                        },2500);
                      }
                    }
                  },
                  error: function(error){ alert(error);}
                });
              }else{
                $('.msgerror-span-login').text('Introduce una contraseña');
                $('#login-form label input[name=password]').css({'border-color':'red'});
                setTimeout(function(){
                  $('.msgerror-span-login').text('');
                  $('#login-form label input[name=password]').css({'border-color':'#e5e5e5'});
                },2500);
              }
            }else{
              $('.msgerror-span-login').text('Introduce un e-mail valido');
              $('#login-form label input[name=email]').css({'border-color':'red'});
              setTimeout(function(){
                $('.msgerror-span-login').text('');
                $('#login-form label input[name=email]').css({'border-color':'#e5e5e5'});
              },2500);
            }
          }else{
             $('.msgerror-span-login').text('Introduce un e-mail');
             $('#login-form label input[name=email]').css({'border-color':'red'});
             setTimeout(function(){
               $('.msgerror-span-login').text('');
               $('#login-form label input[name=email]').css({'border-color':'#e5e5e5'});
             },2500);
          }
        });
      }
    }
  })
  .directive('formRegister', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/form-register.html',
      controller: function($document){
        $('#register-form label input[name=nombre], #register-form label input[name=lastname]').change(function(){
          var expresion = new RegExp("^[a-zA-Zñáéíóú]* ?[a-zA-Zñáéíóú]* ?[a-zA-Zñáéíóú]* ?[a-zA-Zñáéíóú]*$");
          if(expresion.test($(this).val())){
            $(this).css({"border":"2px solid #3ADF00"});
            $(this).attr("data-status", "acepted");
            $(this).siblings('.spacespan').css({'display':'none'});
            $(this).siblings('.msgerror').css({'display':'none'});
            $(this).siblings('.msgerror').text('');
          }else{
            $(this).attr("data-status", "denied");
            $(this).css({"border":"2px solid #DF0101"});
            $(this).siblings('.spacespan').css({'display':'inline-block'});
            $(this).siblings('.msgerror').css({'display':'inline-block'});
            $(this).siblings('.msgerror').text('Campo inválido');
          }
        });
        $('#register-form label input[name=email]').change(function(){
          var element = $(this);
          var expresion = new RegExp("^[_a-zA-Zñáéíóú0-9-]+(.[_a-zA-Zñáéíóú0-9-]+)*@[a-zA-Zñáéíóú0-9-]+(.[a-zA-Zñáéíóú0-9-]+)*(.[a-zA-Zñáéíóú]{2,4})$");
          if(expresion.test($(this).val())){
            $.ajax({
              url: './php/services.php',
              type: 'GET',
              data: "namefunction=getEmailUser&useremail="+$(this).val(),
              success: function(result){
                if(result!='1'){
                  element.css({"border":"2px solid #3ADF00"});
                  element.attr("data-status", "acepted");
                  element.siblings('.spacespan').css({'display':'none'});
                  element.siblings('.msgerror').css({'display':'none'});
                  element.siblings('.msgerror').text('');
                }else{
                  element.attr("data-status", "denied");
                  element.css({"border":"2px solid #DF0101"});
                  element.siblings('.spacespan').css({'display':'inline-block'});
                  element.siblings('.msgerror').css({'display':'inline-block'});
                  element.siblings('.msgerror').text('Este e-mail ya existe.');
                }
              },
              error: function(error){
              },
              timeout: 10000
            });
          }else{
            $(this).attr("data-status", "denied");
            $(this).css({"border":"2px solid #DF0101"});
            $(this).siblings('.spacespan').css({'display':'inline-block'});
            $(this).siblings('.msgerror').css({'display':'inline-block'});
            $(this).siblings('.msgerror').text('E-mail inválido');
          }
        });
        $('#register-form label input[name=password]').change(function(){
          var passagain = $('#register-form label input[name=passwordagain]');
          passagain.val('');
          passagain.attr("data-status", "denied");
          passagain.siblings('.spacespan').css({'display':'none'});
          passagain.siblings('.msgerror').css({'display':'none'});
          passagain.siblings('.msgerror').text('');
          if($(this).val().length>6){
            $(this).css({"border":"2px solid #3ADF00"});
            $(this).attr("data-status", "acepted");
            $(this).siblings('.spacespan').css({'display':'none'});
            $(this).siblings('.msgerror').css({'display':'none'});
            $(this).siblings('.msgerror').text('');
          }else{
            $(this).attr("data-status", "denied");
            $(this).css({"border":"2px solid #DF0101"});
            $(this).siblings('.spacespan').css({'display':'inline-block'});
            $(this).siblings('.msgerror').css({'display':'inline-block'});
            $(this).siblings('.msgerror').text('La contraseña es muy corta.');
          }
        });
        $('#register-form label input[name=passwordagain]').change(function(){
          var password = $('#register-form label input[name=password]').val();
          if(password === $(this).val()){
            $(this).css({"border":"2px solid #3ADF00"});
            $(this).attr("data-status", "acepted");
            $(this).siblings('.spacespan').css({'display':'none'});
            $(this).siblings('.msgerror').css({'display':'none'});
            $(this).siblings('.msgerror').text('');
          }else{
            $(this).attr("data-status", "denied");
            $(this).css({"border":"2px solid #DF0101"});
            $(this).siblings('.spacespan').css({'display':'inline-block'});
            $(this).siblings('.msgerror').css({'display':'inline-block'});
            $(this).siblings('.msgerror').text('La contraseña no coincide.');
          }
        });
        $('#register-form .login-buttom').click(function(){
          $('#register-form').trigger('submit');
        });
        $('#register-form').submit(function(e){
          e.preventDefault();
        });
      }
    }
  })
  .directive('formReset', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/form-reset.html',
      controller: function($document){
        $('#reset-form .login-buttom').click(function(){
          var email = $('#reset-form input[name=email]').val();
          if(email.length > 0){
            var expresion = new RegExp("^[_a-zA-Zñáéíóú0-9-]+(.[_a-zA-Zñáéíóú0-9-]+)*@[a-zA-Zñáéíóú0-9-]+(.[a-zA-Zñáéíóú0-9-]+)*(.[a-zA-Zñáéíóú]{2,4})$");
            if(expresion.test(email)){
              $.ajax({
                url: './php/functions.php',
                type: 'POST',
                data : {
                  namefunction : 'recoveryPassword',
                  email : email
                },
                success: function(result){
                  if(result=="1"){
                    $('#reset-form .msgwelcome-span-login').text('Revisa tu correo para recuperar tu contraseña');
                    setTimeout(function(){
                      $('#reset-form .msgwelcome-span-login').text('');
                      $('#reset-form input[name=email]').val("");
                      $('.form-login').slideDown(500);
                      $('.form-register').slideUp(500);
                      $('.form-reset').slideUp(500);
                    },2000);
                  }else{
                    $('#reset-form .msgerror-span-login').text('Este e-mail no existe');
                    $('#reset-form input[name=email]').css({'border-color':'red'});
                    setTimeout(function(){
                      $('#reset-form .msgerror-span-login').text('');
                      $('#reset-form input[name=email]').css({'border-color':'#e5e5e5'});
                    },2500);
                  }
                },
                error: function(error){ alert(error) },
                timeout: 10000
              });
            }else{
              $('#reset-form .msgerror-span-login').text('Introduce un e-mail valido');
              $('#reset-form input[name=email]').css({'border-color':'red'});
              setTimeout(function(){
                $('#reset-form .msgerror-span-login').text('');
                $('#reset-form input[name=email]').css({'border-color':'#e5e5e5'});
              },2500);
            }
          }else{
            $('#reset-form .msgerror-span-login').text('Introduce un e-mail');
            $('#reset-form input[name=email]').css({'border-color':'red'});
            setTimeout(function(){
              $('#reset-form .msgerror-span-login').text('');
              $('#reset-form input[name=email]').css({'border-color':'#e5e5e5'});
            },2500);
          }
        });
      }
    }
  })
  .directive('introSite', function(){
    return {
      restrict: 'E',
      templateUrl: './partials/intro-site.html'
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
  .directive('eventDescription', function(){
    return {
      restrict : 'E',
      templateUrl : './partials/event-description.html',
      controller: function($document){
        $(window).resize(function(){
          var altura = $('#information-event .preview').height();
          $('#information-event .list-gallery-images').height(altura+"px");
        });
        setTimeout(function(){
          var altura = $('#information-event .preview').height();
          $('#information-event .list-gallery-images').height(altura+"px");
        },250);
        $(document).on('click', '.close-view', function(){
          $(this).parent().parent().parent().parent().css({'position': 'absolute'});
          $(this).parent().parent().parent().parent().css({'top':'-150%'});
          $(this).parent().parent().parent().parent().siblings('.container-gen').css({'opacity':'1'});
          $(this).parent().parent().parent().parent().siblings('.container-gen').css({'display':'block'});
          $(this).parent().parent().parent().parent().parent().css({'overflow':'hidden'});
        });
        var h_ul_gallery = $('.list-gallery-images ul').height();
        $(document).on('mouseover', '.gotopicon', function(){
          var h_ul_gallery = $('.list-gallery-images ul').height();
          var position = parseInt($('.list-gallery-images ul').css('margin-top').replace(/[^-\d\.]/g, ''));
          if(position<0)
          $('.list-gallery-images ul').css({'margin-top':(position+150)+'px'});
        });
        $(document).on('mouseover', '.godownicon', function(){
          var h_ul_gallery = $('.list-gallery-images ul').height();
          var h_event = $('.info-event .gallery .preview').height();
          var position = parseInt($('.list-gallery-images ul').css('margin-top').replace(/[^-\d\.]/g, ''));
          if(((position*-1))<h_event)
          $('.list-gallery-images ul').css({'margin-top':(position-150)+'px'});
        });
        $(document).on('click', '.list-gallery-images ul li', function(){
          var getImage = $('img', this).attr('src');
          $('.preview img').attr('src',getImage);
        });
      }
    }
  })
})();
