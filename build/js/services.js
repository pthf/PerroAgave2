(function(){
  angular.module('perroAgave.services', [])
  .factory('perroAgaveservice', ['$http', '$q', function($http, $q){
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
    return {
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
      decreaseProduct : decreaseProduct
    }
  }]);
})();
