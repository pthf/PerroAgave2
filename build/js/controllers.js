(function(){
  angular.module('perroAgave.controllers', [])
  .controller('shoppingCartController', ['$scope', '$rootScope', 'perroAgaveservice', function($scope, $rootScope, perroAgaveservice){
    $scope.shopLoaded = false;
    $scope.loadCart = function(){
      perroAgaveservice.getShoppingCartElements().then(function(data){
        $rootScope.listCart = data;
        $scope.shopLoaded = true;
      });
    }
    $scope.addProduct = function(idproduct){
      perroAgaveservice.addProduct(idproduct).then(function(data){
        if(data==1){
          $scope.loadCart();
          $('.element-msg ul').append('<li><span>El producto ha sido agregado.</span></li>');
          $('.element-msg ul li').last().slideUp(0);
          setTimeout(function(){
            $('.element-msg ul li').last().slideDown(500);
            setTimeout(function(){
              $('.element-msg ul li').last().slideUp(500);
              setTimeout(function(){
                $('.element-msg ul li').last().remove();
              },500);
            },2500);
          },250);
        }else{
          $('.element-msg ul').append('<li><span>'+data+'</span></li>');
          $('.element-msg ul li').last().slideUp(0);
          setTimeout(function(){
            $('.element-msg ul li').last().slideDown(500);
            setTimeout(function(){
              $('.element-msg ul li').last().slideUp(500);
              setTimeout(function(){
                $('.element-msg ul li').last().remove();
              },500);
            },2500);
          },250);
        }
      });
    }
    $scope.modifyStock = function(eventCart, idproduct){
      if(eventCart == 1){
        perroAgaveservice.increaseProduct(idproduct).then(function(data){
          if(data==1){
            $scope.loadCart();
          }else{
            console.log(data);
          }
        });
      }else{
        perroAgaveservice.decreaseProduct(idproduct).then(function(data){
          if(data==1){
            $scope.loadCart();
          }else{
            console.log(data);
          }
        });
      }
    }
    $scope.getCount = function(){
      var amount = 0;
      for(var i=0; i<$rootScope.listCart.length; i++)
        amount = amount + parseInt($rootScope.listCart[i]['quantity']);
      return amount;
    }
    $scope.getPrice = function(){
      var sumPrice = 0;
      for(var i=0; i<$rootScope.listCart.length; i++){
        var productrealprice = parseInt($rootScope.listCart[i]['productrealprice']);
        var amount = parseInt($rootScope.listCart[i]['quantity']);
        sumPrice = sumPrice + (productrealprice*amount);
      }
      return sumPrice;
    }
    $scope.getDiscount = function(){
      var sumPrice = 0;
      for(var i=0; i<$rootScope.listCart.length; i++){
        var productrealprice = parseInt($rootScope.listCart[i]['productdiscountprice']);
        var amount = parseInt($rootScope.listCart[i]['quantity']);
        sumPrice = sumPrice + (productrealprice*amount);
      }
      return sumPrice;
    }
    $scope.getShippingCost = function(){
      return 0;
    }
    $scope.logoutCart = function(){
      $scope.loadCart();
    }
    $scope.loadCart();
    //Proceso Comprar
    $scope.itemselected = 1;
    $scope.client = true;
    $scope.address = false;
    $scope.checkout = false;    
    $scope.changeItemBuy = function(item){
      switch(item){
        case 1:
          if($scope.client) 
            $scope.itemselected = item;
        break;
        case 2:
          if($scope.address) 
            $scope.itemselected = item;
        break;
        case 3: 
          if($scope.checkout) 
            $scope.itemselected = item;
        break;
      }
    } 
    $scope.changeStage = function(item){
      switch(item){
        case 1:
          $scope.client = true;
          $scope.itemselected = item
        break;
        case 2: 
          $scope.address = true;
          $scope.itemselected = item
        break;
        case 3: 
          $scope.checkout = true;
          $scope.itemselected = item
        break;
      }
    }
    $scope.returnlevel = function(item){
      switch(item){
        case 1:
          $scope.client = true;
          $scope.address = false;
          $scope.checkout = false;
        break;
        case 2:
          $scope.client = true;
          $scope.address = true;
          $scope.checkout = false;
        break;
        case 3: 
          $scope.client = true;
          $scope.address = true;
          $scope.checkout = true;
        break;
      }
    }
    //Informacion cliente
    $scope.userDataLoaded = false;
    $scope.userCity;
    $scope.userState;
    $scope.userData = [];
    perroAgaveservice.getUserConnection().then(function(data){
      $rootScope.userLogin = data;
      perroAgaveservice.getUserData($rootScope.userLogin).then(function(data){
        $scope.userData = data;
        $scope.userCity = data.usercity;
        $scope.userState = data.userstate;
        $scope.userDataLoaded = true;
      });
    });
    //Informacion Domicilio
    $scope.addressLoaded = false;
    $scope.addressCity;
    $scope.addressState;
    $scope.addressData = [];
    perroAgaveservice.getUserConnection().then(function(data){
      $rootScope.userLogin = data;
      perroAgaveservice.getAddressData($rootScope.userLogin).then(function(data){
        $scope.addressData = data;
        $scope.addressCity = data.city;
        $scope.addressState = data.state;
        $scope.addressLoaded = true;
      });
    });
  }])
  .controller('verifyUrlController', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location){
    $scope.menuhome = 0;
    $scope.changeRoute = function(){
      $('html, body').animate({ scrollTop: 0 }, 0);
      $scope.routeParams = $location.path();
      if($scope.routeParams=='/') $scope.menuhome = 1; else $scope.menuhome = 0;
      setTimeout(function(){
        $('.submenu').slideUp(500);
      },250);
    }
    $scope.slideElement = function(){
      setTimeout(function(){
        $('.submenu').slideUp(500);
      },250);
    }
    $scope.changeRoute();
    $(window).on('hashchange', function(e){
      $scope.changeRoute();
    });
  }])
  .controller('introSiteController', ['$rootScope', '$scope', function($rootScope, $scope){
    //if(!$rootScope.open)
    if($rootScope.open){
      $('body, html').css({'overflow':'hidden'});
      $('#intro-page').css({'z-index': '10'});
      $('#intro-page').css({'opacity': '1'});
    }else{
      $('body, html').css({'overflow':'auto'});
      $('#intro-page').css({'z-index': '-1'});
      $('#intro-page').css({'opacity': '0'});
    }
    $scope.valitestatus = function(status){
      if(status){
        $rootScope.open = 'false';
        $('body, html').css({'overflow':'auto'});
        $('#intro-page').css({'z-index': '-1'});
        $('#intro-page').css({'opacity': '0'});
      }else{
        $rootScope.open = 'true';
        var element = '<div class="imagepa-home-intro"><img src="./src/images/intro.png"></div><span class="msg-intro">LO SENTIMOS, PERO DEBES TENER LA EDAD LEGAL PARA PODER VISITAR EL SITIO</span><div class="buttom-intro"> <span class="image"> <img src="./src/images/sicon-03.png"> </span> <span class="image"> <img src="./src/images/sicon-04.png"> </span> </div>';
        $('.infotextinto').html(element);
      }
    }
  }])
  .controller('popUpController', ['$scope', function($scope){
    $scope.item = 0;
    $scope.changeItem = function(item){
      $('html, body').css({'overflow':'hidden'});
      $scope.item = item;
      $('#popup-info').css({'opacity':'1', 'z-index':'5'});
      //this will open the cart\
      setTimeout(function(){
        if(item==2){
          var wdcart = parseInt($('.cart-items').css('width').replace(/[^-\d\.]/g, ''));
          var wddocument = $(document).width();
          setTimeout(function(){ $('.cart-items').css({ 'left' : (wddocument-wdcart)+'px' }); }, 500);
        }
      },250);
    };
    $scope.closePopUp = function(){
      $('html, body').css({'overflow':'auto'});
      if($scope.item==2){
        $('.cart-items').css({'left' : '100%'});
      }
      setTimeout(function(){
        $scope.item = 0;
        $('#popup-info').css({'opacity':'0', 'z-index':'-1'});
      }, 500);
    };
    $scope.gotoLogin = function(){
      window.location = "#/login";
      setTimeout(function(){
        $scope.closePopUp();
      },500);
    }
    $scope.gotoBuy = function(){
      window.location = "#/compra";
      setTimeout(function(){
        $scope.closePopUp();
      },500);
    }
    $(window).resize(function(){
      $scope.closePopUp();
    })
  }])
  .controller("selectedStatesCitiesController", ["$scope", "perroAgaveservice", function($scope, perroAgaveservice){
    $scope.states = [];
    $scope.cities = [];
    perroAgaveservice.getStateCity().then(function(data){
      $scope.states = data[0];
      $scope.cities = data[1];
    });
  }])
  .controller("sessionUserController", ["$rootScope", "$scope", "perroAgaveservice",  function($rootScope, $scope, perroAgaveservice){
    $scope.logoutUser = function(){
      perroAgaveservice.logoutUser().then(function(data){
        $rootScope.userLogin = 0;
        $rootScope.listCart = [];
        window.location = "#/";
      });
    }
  }])
  .controller("checkLoginUserController", ["$rootScope", "$scope", "perroAgaveservice", function($rootScope, $scope, perroAgaveservice){
    $scope.userCity;
    $scope.userState;
    $scope.changeState = function(userState){
      $scope.userState = userState;
    }
    $scope.changeCity = function(userCity){
      $scope.userCity = userCity;
    }
    $scope.userData = [];
    $scope.dataLoaded = false;
    $scope.userData = function(idUser){
      perroAgaveservice.getUserData(idUser).then(function(data){
        $scope.userData = data;
        $scope.userCity = data.usercity;
        $scope.userState = data.userstate;
        $scope.dataLoaded = true;
        window.location = "#/profile";
      });
    }
    perroAgaveservice.getUserConnection().then(function(data){
      $rootScope.userLogin = data;
      if($rootScope.userLogin != 0){
        $scope.userData($rootScope.userLogin);
      } else{
        window.location = "#/login";
      }
    });
  }])
  .controller('formloginregisterController', ['$scope', '$rootScope', function($scope, $rootScope){
    setTimeout(function(){
      $('.form-login').slideDown(0);
      $('.form-register').slideUp(0);
      $('.form-reset').slideUp(0);
    },0);
    $scope.openregister = function(){
      $('.form-login').slideUp(500);
      $('.form-register').slideDown(500);
      $('.form-reset').slideUp(500);
    }
    $scope.openlogin = function(){
      $('.form-login').slideDown(500);
      $('.form-register').slideUp(500);
      $('.form-reset').slideUp(500);
    }
    $scope.openreset = function(){
      $('.form-login').slideUp(500);
      $('.form-register').slideUp(500);
      $('.form-reset').slideDown(500);
    }
    $scope.addUser = function(){
      var status_privacy = $('#register-form label input[name=privacy]').is(":checked");
      var status_nombre = $('#register-form label input[name=nombre]').attr('data-status');
      var status_lastname = $('#register-form label input[name=lastname]').attr('data-status');
      var status_email = $('#register-form label input[name=email]').attr('data-status');
      var status_password = $('#register-form label input[name=password]').attr('data-status');
      var status_passwordagain = $('#register-form label input[name=passwordagain]').attr('data-status');
      if(status_nombre == 'acepted' && status_lastname == 'acepted' && status_email == 'acepted' && status_password == 'acepted' && status_passwordagain == 'acepted' && status_privacy == true){
        var data = $(this).serializeArray();
        $.ajax({
          url: './php/functions.php',
          type: 'POST',
          data: {
            namefunction : "addUser",
            nombre: $('#register-form label input[name=nombre]').val(),
            lastname: $('#register-form label input[name=lastname]').val(),
            email: $('#register-form label input[name=email]').val(),
            password: $('#register-form label input[name=password]').val(),
            newsletter: $('#register-form label input[name=newsletter]').is(":checked")
          },
          success: function(result){
            $rootScope.userLogin = result;
            setTimeout(function(){ window.location = "#/profile"; },1000);
          },
          error: function(error){
            alert(error);
          },
          timeout:10000
        })
      }else{
        $('.msgformreg').text('Favor de verificar todos los campos.');
        setTimeout(function(){
          $('.msgformreg').text('');
        },2000);
      }
    }
  }])
  .controller('itemProductosController', ['$scope', function($scope){
    $scope.itemselected = 0;
    $scope.changeItemSelected = function(item){
      $scope.itemselected = item;
    };
  }])
  .controller('EventsController', ['$scope', function($scope){
    $scope.eventSelected = 0;
    $scope.showEventSelected = function(item){
      $scope.eventSelected = item;
    };
  }])
  .controller("igCtrl", ['$scope', '$http', function($scope,$http){
    $http.jsonp('https://api.instagram.com/v1/users/self/media/recent/?access_token=2180432354.3b55ab4.b797aa69977e4d359a25a5d322cb7de0&callback=JSON_CALLBACK&count=18').success(function(data) {
      $scope.data = data;
    });
  }])
  .controller("getNextEventsController", ['$scope', 'perroAgaveservice', function($scope, perroAgaveservice){
    $scope.eventsloaded = false;
    $scope.eventsList = [];
    perroAgaveservice.getNextEvents().then(function(data){
      $scope.eventsList = data;
      $scope.eventsloaded = true;
    });
  }])
  .controller("getFinishedEventsController", ['$scope', 'perroAgaveservice', function($scope, perroAgaveservice){
    $scope.eventsloaded = false;
    $scope.eventsList = [];
    $scope.eventsListSimple = [];
    perroAgaveservice.getFinishedEvents().then(function(data){
      $scope.eventsList = data;
      perroAgaveservice.getSimpleEventsList().then(function(data){
        $scope.eventsListSimple = data;
        $scope.eventsloaded = true;
      });
    });
  }])
  .controller("getProductsController", ['$scope', '$rootScope', 'perroAgaveservice', function($scope, $rootScope, perroAgaveservice){
    $scope.productsloaded = false;
    $scope.productList  = [];
    perroAgaveservice.getUserConnection().then(function(data){
      $rootScope.userLogin = data;
      perroAgaveservice.getProducts().then(function(data){
        $scope.productList = data;
        $scope.productsloaded = true;
      });
    });
  }])
  .controller("dataEventController", ['$scope', 'perroAgaveservice', '$routeParams', function($scope, perroAgaveservice, $routeParams){
    var name_url = $routeParams.name;
    $scope.listEvent = [];
    $scope.loadData = false;
    perroAgaveservice.getEventData(name_url).then(function(data){
      $scope.listEvent = data;
      $scope.loadData = true;
    });
  }])
})();
