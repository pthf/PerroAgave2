(function(){
	var app = angular.module('perroAgave', [
		'ngRoute',
		'perroAgave.controllers',
		'perroAgave.directives',
		'perroAgave.services'
	]);
	app.config(['$routeProvider', '$locationProvider' , function($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				templateUrl: './views/home.html'
			})
			.when('/login', {
				templateUrl: './views/login.html',
        controller: 'formloginregisterController'
			})
			.when('/profile', {
				templateUrl: './views/profile-view.html'
			})
			.when('/compra', {
				templateUrl: './views/carrito-view.html'
			})
			.otherwise({
				redirectTo: '/'
			});
			// $locationProvider.html5Mode(true);
	}]);
	app.run(['$rootScope', function($rootScope){
		$rootScope.open = false;
		$rootScope.userLogin = 0;
	}]);
})();
