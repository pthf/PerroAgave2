(function (){
  var app = angular.module('paPanel', [
    'ngRoute',
    'paPanel.directives'
  ]);
  app.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: './../views/home.html'
      })
      .when('/products', {
        templateUrl: './../views/products.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
})();
