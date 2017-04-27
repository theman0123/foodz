angular.module('foodz').controller('mainCtrl', function($scope, mainSrvc, $stateParams){
    $scope.user_id = $stateParams.user_id;
    var pullRestaurants = function() {mainSrvc.pullRestaurants()};
    
    pullRestaurants();
    
    $scope.arrayOfFoodz = mainSrvc.getLocalRestaurants();
    
//    console.log(user_id, 'in mainCtrl/home')
    
    $scope.createNewRestaurant = function(place) {
        mainSrvc.createNewRestaurant(place, user_id);
    }
    
//    $scope.refresh = function() {
//        $scope.arrayOfFoodz = mainSrvc.pullRestaurants();
//    }
    
//    $scope.prev = mainSrvc.prev();
//    $scope.next = function() {
//        //@param amount number of next restaurants
//        //@param last visible
//        var nextRest = mainService.next(4, $scope.arrayOfFoodz.indexOf(last))
//        $scope.arrayOfFoodz = mainSrvc.getLocalRestaurants();
//        console.log('next clicked')
//    }
})                                               