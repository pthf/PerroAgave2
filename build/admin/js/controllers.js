(function(){
  angular.module('paPanel.controllers', [])
	.controller('viewNavController', ['$scope', function($scope){
		$scope.item = 1;
		$scope.selectItem = function(item){
			$scope.item = item;
		};
	}])
	.controller('productsController', ['$scope', '$routeParams', 'paService', function($scope, $routeParams, paService){
		$scope.productsItems = [];
		paService.getProducts().then(function(data){
			$scope.productsItems = data;
		});
	    $scope.productsItems = [];
	    $scope.loadProducts = function(){
	      paService.getProducts().then(function(data){
	        $scope.productsItems = data;
	      });
	    }  
	    $scope.loadProduct = function(){
	      paService.getProductItem($scope.idProduct).then(function(data){
	        $scope.productItem = data;
	      });
	    }
	    $scope.update = function(){
	      $scope.loadProducts();
	      $scope.loadProduct();
	    }
	    $scope.update();

		$scope.idProduct = $routeParams.id; 
		$scope.productItem = [];
		paService.getProductItem($scope.idProduct).then(function(data){
			$scope.productItem = data;
		});

	}]) 
	.controller('eventsController', ['$scope', '$routeParams', 'paService', function($scope, $routeParams, paService){
		$scope.eventsItems = [];
		paService.getEvents().then(function(data){
			$scope.eventsItems = data;
		});
		$scope.eventsItems = [];
	    $scope.loadEvents = function(){
	      paService.getEvents().then(function(data){
	        $scope.eventsItems = data;
	      });
	    }  
	    $scope.loadEvent = function(){
	      paService.getEventItem($scope.idEvent).then(function(data){
	        $scope.eventItem = data;
	      });
	    }
	    $scope.loadImagesEvent = function(){
		  $scope.eventItemImages = [];
	      paService.getEventImages($scope.idEvent).then(function(data){
	        $scope.eventItemImages = data;
	      });
	    }
	    $scope.update = function(){
	      $scope.loadEvents();
	      $scope.loadEvent();
	      $scope.loadImagesEvent();
	    }
	    $scope.update();

	    $scope.idEvent = $routeParams.id; 
		$scope.eventItem = [];
		paService.getEventItem($scope.idEvent).then(function(data){
			$scope.eventItem = data;
		});
		$scope.eventItemImages = [];
		paService.getEventImages($scope.idEvent).then(function(data){
			$scope.eventItemImages = data;
		});
		
		$scope.valor={};
		$scope.stateItems = [];
		paService.statesList().then(function(data){
			$scope.stateItems = data;
		});

		$scope.statusData = [
            { value: "1", name: "Realizado" },
            { value: "0", name: "Disponible" }
        ];
	}]) 
	.controller('statesController', ['$scope', '$routeParams', 'paService', function($scope, $routeParams, paService){
		$scope.stateItems = [];
		paService.statesList().then(function(data){
			$scope.stateItems = data;
		});
	}]) 
	.controller('citiesController', ['$scope', '$routeParams', 'paService', function($scope, $routeParams, paService){
		$scope.cityItems = [];
		paService.citiesList().then(function(data){
			$scope.cityItems = data;
		});
	}])
	.controller('categoriesController', ['$scope', '$routeParams', 'paService', function($scope, $routeParams, paService){
		$scope.categoriesItems = [];
		paService.getCategories().then(function(data){
			$scope.categoriesItems = data;
		});
		$scope.loadCategories = function(){
	      paService.getCategories().then(function(data){
	        $scope.categoriesItems = data;
	      });
	    } 
	    $scope.update = function(){
	      $scope.loadCategories();
	    }
	    $scope.update();
	}]) 
	.controller('newsletterController', ['$scope', '$routeParams', 'paService', function($scope, $routeParams, paService){
		$scope.newsletterItems = [];
		paService.getNewsletter().then(function(data){
			$scope.newsletterItems = data;
		});
	}])
	.controller('ordersController', ['$scope', '$routeParams', 'paService', function($scope, $routeParams, paService){
		$scope.orderItems = [];
		paService.getOrders().then(function(data){
			$scope.orderItems = data;
		});
		$scope.idOrder = $routeParams.id; 
		$scope.ordertItem = [];
		paService.getOrderItem($scope.idOrder).then(function(data){
			$scope.ordertItem = data;
		});
		$scope.orderInfotItem = [];
		paService.getOrderInfoItem($scope.idOrder).then(function(data){
			$scope.orderInfotItem = data;
		});
		$scope.orderInfotItemUser = [];
		paService.getOrderInfoItemUser($scope.idOrder).then(function(data){
			$scope.orderInfotItemUser = data;
		});
		$scope.loadOrder = function(){
	      paService.getOrderInfoItem($scope.idOrder).then(function(data){
	        $scope.orderInfotItem = data;
	      });
	      paService.getOrders().then(function(data){
			$scope.orderItems = data;
		});
	    } 
	    $scope.update = function(){
	      $scope.loadOrder();
	    }
	    $scope.update();
	}])
	.controller('tabulatorpricesController', ['$scope', '$routeParams', 'paService', function($scope, $routeParams, paService){
		$scope.pricesItems = [];
		paService.getTabulatorPrices().then(function(data){
			$scope.pricesItems = data;
		});
		$scope.loadPrices = function(){
	      paService.getTabulatorPrices().then(function(data){
	        $scope.pricesItems = data;
	      });
	    } 
	    $scope.update = function(){
	      $scope.loadPrices();
	    }
	    $scope.update();
	}])
	.controller('cuponesController', ['$scope', '$routeParams', 'paService', function($scope, $routeParams, paService){
		$scope.cuponesItems = [];
		paService.getCupones().then(function(data){
			$scope.cuponesItems = data;
		});
		$scope.loadCupones = function(){
	      paService.getCupones().then(function(data){
	        $scope.cuponesItems = data;
	      });
	    } 
	    $scope.update = function(){
	      $scope.loadCupones();
	    }
	    $scope.update();
	}])
})();