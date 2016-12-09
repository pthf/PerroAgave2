(function(){
  angular.module('perroAgave.services', [])
  .factory('perroAgaveservice', ['$http', '$q', function($http, $q){
    function getInformationPurchase(idUser, itemSelected, maxItem){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getInformationPurchase&idUser='+idUser+'&itemSelected='+itemSelected+'&maxItem='+maxItem)
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getStateCity(){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getStateCity')
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function logoutUser(){
      var deferred = $q.defer();
      $http({
        url: './php/functions.php',
        method: 'POST',
        data : $.param({namefunction: "logoutUser"}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .success(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
    function getUserConnection(){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getUserConnection')
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getUserData(idUser){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getUserData&idUser='+idUser)
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getAddressData(idUser){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getAddressData&idUser='+idUser)
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getProducts(){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getProducts')
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getNextEvents(){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getNextEvents')
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getFinishedEvents(){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getFinishedEvents')
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getSimpleEventsList(){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getSimpleEventsList')
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getEventData(name_url){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getEventData&name_url='+name_url)
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getShoppingCartElements(){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getShoppingCartElements')
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function addProduct(idproduct){
      var deferred = $q.defer();
      $http({
        url: './php/functions.php',
        method: 'POST',
        data : $.param({namefunction: "addProduct", idproduct: idproduct}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .success(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
    function increaseProduct(idproduct){
      var deferred = $q.defer();
      $http({
        url : './php/functions.php',
        method : 'POST',
        data : $.param({namefunction : "increaseProduct", idproduct : idproduct }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .success(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
    function decreaseProduct(idproduct){
      var deferred = $q.defer();
      $http({
        url : './php/functions.php',
        method : 'POST',
        data : $.param({namefunction : "decreaseProduct", idproduct : idproduct }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .success(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
    function getCoupon(){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getCoupon')
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getShippingCost(){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getShippingCost')
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function getCountItem(idUser){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getCountItem&idUser='+idUser)
        .success(function(data){
          deferred.resolve(data);
        });
        return deferred.promise;
    }
    function verifyFacturationForm(ordernumber, idUser){
      var deferred = $q.defer();
      $http({
        url : './php/functions.php',
        method : 'POST',
        data : $.param({namefunction : "verifyFacturationForm", ordernumber : ordernumber, idUser : idUser }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .success(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
    function ocultedElement(ordernumber){
      var deferred = $q.defer();
      $http({
        url : './php/functions.php',
        method : 'POST',
        data : $.param({namefunction : "ocultedElement", ordernumber : ordernumber }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .success(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
    return {
      getInformationPurchase : getInformationPurchase,
      getCoupon : getCoupon,
      getShippingCost : getShippingCost,
      logoutUser : logoutUser,
      getUserConnection : getUserConnection,
      getProducts : getProducts,
      getNextEvents : getNextEvents,
      getUserData : getUserData,
      getStateCity : getStateCity,
      getFinishedEvents : getFinishedEvents,
      getSimpleEventsList : getSimpleEventsList,
      getEventData : getEventData,
      getShoppingCartElements : getShoppingCartElements,
      addProduct : addProduct,
      increaseProduct : increaseProduct,
      decreaseProduct : decreaseProduct,
      getAddressData : getAddressData,
      verifyFacturationForm : verifyFacturationForm,
      getCountItem : getCountItem,
      ocultedElement : ocultedElement
    }
  }]);
})();
