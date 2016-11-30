(function(){
  angular.module('paPanel.directives', [])
  .directive('menuNav', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/menu-nav.html'
    };
  })
  .directive('addProduct', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/add-product.html',
      controller: function($document) {
        $('#addProduct').submit(function(){
          var ajaxData = new FormData();
          ajaxData.append("namefunction","addNewProduct");
          ajaxData.append("data",$(this).serialize());
          $.each($("#addProduct input[type=file]"), function(i,obj){
            $.each(obj.files, function(j, file){
              ajaxData.append('productImageCover['+j+']', file);
            })
          });
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: ajaxData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: function(result){
              $('.clickUpdate').trigger('click');
              $('#addProduct')[0].reset();
              $('.result').html('<div class="alert alert-success" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Producto agregado.</div>');
              $('.result').css({'opacity' : '1'});
              setTimeout(function () {
                  $('.result').css({'opacity' : '0'});
                  $('.result').text('');
              }, 4000);
            },
            error: function(error){
              alert(error);
            }
          });
        }); 
      }
    }
  })
  .directive('listProducts', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/list-products.html',
      controller: function($document) {
        $(document).on('click', '.deleteProduct', function(){
          var idProduct = $(this).attr('data-id');
          var namefunction = 'deleteProduct';
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: {
              namefunction: namefunction,
              idProduct: idProduct
            },
            success: function(result){
              $('.clickUpdate').trigger('click');
            },
            error: function(error){
              alert(error);
            }
          });
        });
      }
    }
  })
  .directive('editProduct', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/edit-product.html',
      controller: function($document) {
        $('#editProduct').submit(function(){
          var ajaxData = new FormData();
          ajaxData.append("namefunction","editProduct");
          ajaxData.append("data",$(this).serialize());
          $.each($("#editProduct input[type=file]"), function(i,obj){
            $.each(obj.files, function(j, file){
              ajaxData.append('productImageCover['+j+']', file);
            })
          });
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: ajaxData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: function(result){
              $('.clickUpdate').trigger('click');
              $('.result').html('<div class="alert alert-success" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Producto actualizado.</div>');
              $('.result').css({'opacity' : '1'});
              setTimeout(function () {
                  $('.result').css({'opacity' : '0'});
                  $('.result').text('');
              }, 4000);
            },
            error: function(error){
              alert(error);
            }
          });
        }); 
      }
    }
  })
  .directive('listCategories', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/list-categories.html',
      controller: function($document) {
        $('#addCategory').submit(function(){
          var ajaxData = new FormData();
          ajaxData.append("namefunction","addNewCategory");
          ajaxData.append("data",$(this).serialize());
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: ajaxData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: function(result){
              $('.clickUpdate').trigger('click');
              $('#addCategory')[0].reset();
              $('.result').html('<div class="alert alert-success" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Categoría agregada.</div>');
              $('.result').css({'opacity' : '1'});
              setTimeout(function () {
                  $('.result').css({'opacity' : '0'});
                  $('.result').text('');
              }, 4000);
            },
            error: function(error){
              alert(error);
            }
          });
        });
        $(document).on('click', '.deleteCategory', function(){
          var idCategory = $(this).attr('data-id');
          var namefunction = 'deleteCategory';
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: {
              namefunction: namefunction,
              idCategory: idCategory
            },
            success: function(result){
              $('.clickUpdate').trigger('click');
            },
            error: function(error){
              alert(error);
            }
          });
        });
      }
    }
  })
  .directive('listOrders', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/list-orders.html'
    }
  })
  .directive('detailOrder', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/detail-order.html'
    }
  })
  .directive('addEvent', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/add-event.html',
      controller: function($document) {
        $('#addEvent').submit(function(){
          var ajaxData = new FormData();
          ajaxData.append("namefunction","addNewEvent");
          ajaxData.append("data",$(this).serialize());
          $.each($("#addEvent .cover input[type=file]"), function(i,obj){
            $.each(obj.files, function(j, file){
              ajaxData.append('eventImageCover['+j+']', file);
            })
          });
          $.each($("#addEvent .multiple input[type=file]"), function(i,obj){
            $.each(obj.files, function(j, file){
              ajaxData.append('eventImages['+j+']', file);
            })
          });
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: ajaxData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: function(result){
              $('.clickUpdate').trigger('click');
              $('#addEvent')[0].reset();
              $('.result').html('<div class="alert alert-success" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Evento agregado.</div>');
              $('.result').css({'opacity' : '1'});
              setTimeout(function () {
                  $('.result').css({'opacity' : '0'});
                  $('.result').text('');
              }, 4000);
            },
            error: function(error){
              alert(error);
            }
          });
        }); 
      }
    }
  })
  .directive('listEvents', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/list-events.html',
      controller: function($document) {
        $(document).on('click', '.deleteEvent', function(){
          var idEvent = $(this).attr('data-id');
          var namefunction = 'deleteEvent';
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: {
              namefunction: namefunction,
              idEvent: idEvent
            },
            success: function(result){
              // alert(result);
              $('.clickUpdate').trigger('click');
            },
            error: function(error){
              alert(error);
            }
          });
        });
      }
    }
  })
  .directive('editEvent', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/edit-event.html',
      controller: function($document) {
        $('#editEvent').submit(function(){
          var ajaxData = new FormData();
          ajaxData.append("namefunction","editEvent");
          ajaxData.append("data",$(this).serialize());
          $.each($("#editEvent .cover input[type=file]"), function(i,obj){
            $.each(obj.files, function(j, file){
              ajaxData.append('eventImageCover['+j+']', file);
            })
          });
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: ajaxData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: function(result){
              $('.clickUpdate').trigger('click');
              $('.result').html('<div class="alert alert-success" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Evento actualizado.</div>');
              $('.result').css({'opacity' : '1'});
              setTimeout(function () {
                  $('.result').css({'opacity' : '0'});
                  $('.result').text('');
              }, 4000);
            },
            error: function(error){
              alert(error);
            }
          });
        }); 
      }
    }
  })
  .directive('detailImagesEvent', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/detail-images-event.html',
      controller: function($document) {
        $('#addImagesEvent').submit(function(){
          var ajaxData = new FormData();
          ajaxData.append("namefunction","addImagesEvent");
          ajaxData.append("data",$(this).serialize());
          $.each($("#addImagesEvent .multiple input[type=file]"), function(i,obj){
            $.each(obj.files, function(j, file){
              ajaxData.append('eventImages['+j+']', file);
            })
          });
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: ajaxData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: function(result){
              // alert(result);
              $('.clickUpdate').trigger('click');
              $('#addImagesEvent')[0].reset();
              $('.result').html('<div class="alert alert-success" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Imagen(es) agregada(s).</div>');
              $('.result').css({'opacity' : '1'});
              setTimeout(function () {
                  $('.result').css({'opacity' : '0'});
                  $('.result').text('');
              }, 4000);
            },
            error: function(error){
              alert(error);
            }
          });
        }); 
        $(document).on('click', '.deleteImageEvent', function(){
          var idImageEvent = $(this).attr('data-id');
          var idEvent = $(this).attr('data-event');
          var namefunction = 'deleteImageEvent';
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: {
              namefunction: namefunction,
              idImageEvent: idImageEvent,
              idEvent: idEvent
            },
            success: function(result){
              // alert(result);
              $('.clickUpdate').trigger('click');
            },
            error: function(error){
              alert(error);
            }
          });
        });
      }
    }
  })
  .directive('listNewsletter', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/list-newsletter.html'
    }
  })
  .directive('listPrices', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/list-prices.html',
      controller: function($document) {
        $('#addPrice').submit(function(){
          var ajaxData = new FormData();
          ajaxData.append("namefunction","addPrice");
          // ajaxData.append("data",$(this).serialize());
          $.each($("#addPrice input[type=file]"), function(i,obj){
            $.each(obj.files, function(j, file){
              ajaxData.append('tabulatorValues['+j+']', file);
            })
          });
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: ajaxData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: function(result){
              // alert(result);
              console.log(result);
              $('.clickUpdate').trigger('click');
              $('#addPrice')[0].reset();
              $('.result').html('<div class="alert alert-success" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Tabla de precios actualizada.</div>');
              $('.result').css({'opacity' : '1'});
              setTimeout(function () {
                  $('.result').css({'opacity' : '0'});
                  $('.result').text('');
              }, 4000);
              // var data = JSON.parse(result);
              // data.forEach(function(value) {
              //   if(value == 1 && value == 2 && value == 3){
              //     $('.error-input-min').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">V&aacute;lor m&iacute;nimo inv&aacute;lido.</div>');
              //     $('.error-input-min').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-min').css({'opacity' : '0'});
              //         $('.error-input-min').text('');
              //     }, 4000);
              //     $('.error-input-max').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">V&aacute;lor m&aacute;ximo inv&aacute;lido</div>');
              //     $('.error-input-max').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-max').css({'opacity' : '0'});
              //         $('.error-input-max').text('');
              //     }, 4000);
              //     $('.error-input-price').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Precio inv&aacute;lido.</div>');
              //     $('.error-input-price').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-price').css({'opacity' : '0'});
              //         $('.error-input-price').text('');
              //     }, 4000);
              //   } else if (value == 1 && value == 2) {
              //     $('.error-input-min').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">V&aacute;lor m&iacute;nimo inv&aacute;lido.</div>');
              //     $('.error-input-min').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-min').css({'opacity' : '0'});
              //         $('.error-input-min').text('');
              //     }, 4000);
              //     $('.error-input-max').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">V&aacute;lor m&aacute;ximo inv&aacute;lido</div>');
              //     $('.error-input-max').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-max').css({'opacity' : '0'});
              //         $('.error-input-max').text('');
              //     }, 4000);
              //   } else if(value == 1 && value == 3){
              //     $('.error-input-min').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">V&aacute;lor m&iacute;nimo inv&aacute;lido.</div>');
              //     $('.error-input-min').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-min').css({'opacity' : '0'});
              //         $('.error-input-min').text('');
              //     }, 4000);
              //     $('.error-input-price').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Precio inv&aacute;lido.</div>');
              //     $('.error-input-price').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-price').css({'opacity' : '0'});
              //         $('.error-input-price').text('');
              //     }, 4000);
              //   } else if(value == 2 && value == 3){
              //     $('.error-input-max').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">V&aacute;lor m&aacute;ximo inv&aacute;lido</div>');
              //     $('.error-input-max').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-max').css({'opacity' : '0'});
              //         $('.error-input-max').text('');
              //     }, 4000);
              //     $('.error-input-price').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Precio inv&aacute;lido.</div>');
              //     $('.error-input-price').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-price').css({'opacity' : '0'});
              //         $('.error-input-price').text('');
              //     }, 4000);
              //   }else if (value == 1) {
              //     $('.error-input-min').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">V&aacute;lor m&iacute;nimo inv&aacute;lido.</div>');
              //     $('.error-input-min').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-min').css({'opacity' : '0'});
              //         $('.error-input-min').text('');
              //     }, 4000);
              //   } else if(value == 2){
              //     $('.error-input-max').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">V&aacute;lor m&aacute;ximo inv&aacute;lido</div>');
              //     $('.error-input-max').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-max').css({'opacity' : '0'});
              //         $('.error-input-max').text('');
              //     }, 4000);
              //   } else if(value == 3){
              //     $('.error-input-price').html('<div class="alert alert-danger" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Precio inv&aacute;lido.</div>');
              //     $('.error-input-price').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.error-input-price').css({'opacity' : '0'});
              //         $('.error-input-price').text('');
              //     }, 4000);
              //   } else if(value == 0){
              //     $('.clickUpdate').trigger('click');
              //     $('#addPrice')[0].reset();
              //     $('.result').html('<div class="alert alert-success" role="alert" style="margin-top: 4%;margin-bottom: 1%;padding: 10px;">Precio agregado.</div>');
              //     $('.result').css({'opacity' : '1'});
              //     setTimeout(function () {
              //         $('.result').css({'opacity' : '0'});
              //         $('.result').text('');
              //     }, 4000);
              //   }
              // });
            },
            error: function(error){
              alert(error);
            }
          });
        });
        $(document).on('click', '.deletePrice', function(){
          var idTabulatorPrice = $(this).attr('data-id');
          var namefunction = 'deletePrice';
          $.ajax({
            url: "../php/functions.php",
            type: "POST",
            data: {
              namefunction: namefunction,
              idTabulatorPrice: idTabulatorPrice
            },
            success: function(result){
              $('.clickUpdate').trigger('click');
            },
            error: function(error){
              alert(error);
            }
          });
        });
      }
    }
  })
})();
