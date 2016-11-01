(function(){
  angular.module('paPanel.directives', [])
  .directive('menuNav', function(){
    return {
      restrict: 'E',
      templateUrl: './../partials/menu-nav.html'
    }
  })
})();
