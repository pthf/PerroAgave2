(function (){
  var app = angular.module('paPanel', [
    'ngRoute',
    'paPanel.directives',
    'paPanel.controllers',
    'paPanel.services'
  ]);
  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: './../views/products.html'
      })
      .when('/products', {
        templateUrl: './../views/products.html'
      })
      .when('/product/:id', {
        templateUrl: './../views/product.html'
      })
      .when('/categories', {
        templateUrl: './../views/categories.html'
      })  
      .when('/orders', {
        templateUrl: './../views/orders.html'
      })
      .when('/order/:id', {
        templateUrl: './../views/order.html'
      })
      .when('/events', {
        templateUrl: './../views/events.html'
      })
      .when('/event/:id', {
        templateUrl: './../views/event.html'
      })
      .when('/newsletter', {
        templateUrl: './../views/newsletter.html'
      })
      .when('/cupones', {
        templateUrl: './../views/cupones.html'
      })
      .when('/prices', {
        templateUrl: './../views/prices.html'
      })
      .when('/facturados', {
        templateUrl: './../views/facturados.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
})();
