angular.module('foodz').controller('mainCtrl', function($scope, mainSrvc, $stateParams){

    var pullRestaurants = function() {mainSrvc.pullRestaurants()};
    pullRestaurants();
    
    $scope.arrayOfFoodz = mainSrvc.returnArray();
    
//    console.log($scope.arrayOfFoodz, mainSrvc.returnArray())
    
    $scope.createNewRestaurant = function(place) {
        mainSrvc.createNewRestaurant(place);
    }
    
//    $scope.refresh = function() {
//        $scope.arrayOfFoodz = mainSrvc.pullRestaurants();
//    }
    
//    $scope.prev = mainSrvc.prev();
//    $scope.next = function() {
//        //@param amount number of next restaurants
//        //@param last visible
//        var nextRest = mainService.next(4, $scope.arrayOfFoodz.indexOf(last))
//        $scope.arrayOfFoodz = mainSrvc.returnArray();
//        console.log('next clicked')
//    }
})
  

//onClick send info to backend and set up a db
//go to list view with clicked restaurant info loaded into "online menu" and ready to pass along info for when "create new note" is clicked//                                               