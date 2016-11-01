(function(){
  angular.module('perroAgave.services', [])
  .factory('perroAgaveservice', ['$http', '$q', function($http, $q){
    function getUserConnection(){
      var deferred = $q.defer();
      $http.get('./php/services.php?namefunction=getUserConnection')
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
    return {
      getUserConnection : getUserConnection,
      getProducts : getProducts,
      getNextEvents : getNextEvents
    }
  }]);
})();
