(function(){
  angular.module('paPanel.services', [])
  	.factory('paService', ['$http', '$q', function($http, $q){
	    function getProducts(){
	      	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getProducts')
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function getProductItem(id){
	    	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getProductItem&idProduct='+id)
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function getEvents(){
	      	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getEvents')
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function getEventItem(id){
	      	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getEventItem&idEvent='+id)
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function getEventImages(id){
	    	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getEventImages&idEvent='+id)
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function getCategories(){
	      	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getCategories')
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function statesList(){
	    	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=statesList')
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function citiesList(){
	    	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=citiesList')
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function getNewsletter(){
	    	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getNewsletter')
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function getOrders(){
	    	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getOrders')
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function getOrderItem(id){
	    	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getOrderItem&idOrder='+id)
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function getOrderInfoItem(id){
	    	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getOrderInfoItem&idOrder='+id)
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    function getTabulatorPrices(){
	    	var deferred = $q.defer();
	      	$http.get('./../php/services.php?namefunction=getTabulatorPrices')
	        .success(function (data) {
	            deferred.resolve(data);
	        });
	        return deferred.promise;
	    }
	    return {
	      getProducts: getProducts,
	      getProductItem: getProductItem,
	      getEvents: getEvents,
	      getEventItem: getEventItem,
	      getEventImages: getEventImages,
	      getCategories: getCategories,
	      statesList: statesList,
	      citiesList: citiesList,
	      getNewsletter: getNewsletter,
	      getOrders: getOrders,
	      getOrderItem: getOrderItem,
	      getOrderInfoItem: getOrderInfoItem,
	      getTabulatorPrices: getTabulatorPrices
	    }
	  }]);
})();