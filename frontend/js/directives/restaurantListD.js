app.directive('restaurantList', function() {
    return {
        templateUrl: '../../views/restaurantListDV.html',
        restrict: 'E',
        scope: {
            restaurants: '='
        },
        controller: function($scope, mainSrvc, $stateParams) {
            $scope.user_id = $stateParams.user_id;
            
            $scope.restaurants = mainSrvc.getAllRestaurants().then(function(data) {
                var restaurants = data.data;
                $scope.restaurants = restaurants; 
            })
        }
    }
})