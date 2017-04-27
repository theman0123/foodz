var app = angular.module('foodz');

app.directive('menuRedirect', function() {
    return {
        templateUrl: '../../views/menuRedirectDV.html',
        restrict: 'E',
        scope: {
            item: '=',
        },
        controller: function($scope, mainSrvc, $stateParams) {
            var idx = $stateParams.id;
            
            $scope.item = mainSrvc.findRestaurant(idx);
        }
    }
})