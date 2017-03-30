app.directive('restaurantList', function() {
    return {
        templateUrl: '../../views/restaurantListDV.html',
        restrict: 'E',
        scope: {
            restaurants: '='
        },
        controller: function($scope, mainSrvc) {
            $scope.quantity = 4;
            ///how do you best do this? $scope.restaurants///
            $scope.restaurants = mainSrvc.getAllRestaurants().then(function(data) {
                var restaurants = data.data;
                $scope.restaurants = restaurants; 
            })
        }
    }
})