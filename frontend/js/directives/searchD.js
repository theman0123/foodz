app.directive('search', function() {
    return {
        templateUrl: '../../views/searchDV.html',
        restrict: 'E',
        scope: {
            foodz: '='
        },
        controller: function($scope, mainSrvc) {
               console.log($scope.foodz)
        }
    }
})