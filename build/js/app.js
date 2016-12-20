(function(){
	var app = angular.module('perroAgave', [
		'ngRoute',
		'perroAgave.controllers',
		'perroAgave.directives',
		'perroAgave.services',
		'perroAgave.filters'
	]);
	app.config(['$routeProvider', '$locationProvider' , function($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				templateUrl: './views/home.html'
			})
			.when('/login', {
				templateUrl: './views/login.html',
        		controller: 'checkLoginUserController'
			})
			.when('/profile', {
				templateUrl: './views/profile-view.html',
				controller: 'checkLoginUserController'
			})
			.when('/compras', {
				templateUrl: './views/compras.html'
			})
			.when('/compra', {
				templateUrl: './views/carrito-view.html'
			})
			.when('/event/:name', {
				templateUrl : './views/event.html',
				controller: 'dataEventController'
			})
			.when('/facturacion/:ordernumber', {
				templateUrl : './views/facturacion.html',
			})
			.when('/gracias', {
				templateUrl : './views/gracias.html',
			})
			.when('/cancelado', {
				templateUrl : './views/cancelado.html',
			})
			.otherwise({
				redirectTo: '/'
			});
			// $locationProvider.html5Mode(true);
	}]);
	app.run(['$rootScope', function($rootScope){
		$rootScope.open = false;
		$rootScope.userLogin = 0;
		$rootScope.listCart = [];
	}]);
})();
