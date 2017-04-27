angular.module('foodz').controller('homeCtrl', function($scope, mainSrvc, $stateParams){
    $scope.user_id = $stateParams.user_id;
    var pullRestaurants = function() {mainSrvc.pullRestaurants()};
    
    pullRestaurants();
    
    $scope.restaurantList = mainSrvc.getLocalRestaurants();
    
    $scope.createNewRestaurant = function(restaurant) {
        mainSrvc.createNewRestaurant(restaurant);
    }
})                                               