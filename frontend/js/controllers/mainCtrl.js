angular.module('foodz').controller('mainCtrl', function($scope, mainSrvc, $stateParams){
//    $scope.index = 3;
    $scope.quantity = 4;

    var pullRestaurants = function() {mainSrvc.pullRestaurants()};
    pullRestaurants();
    
    $scope.arrayOfFoodz = mainSrvc.returnArray();
    
    $scope.createNewRestaurant = function(place) {
        mainSrvc.createNewRestaurant(place);
    }
    
//    $scope.prev = mainSrvc.prev();
    $scope.next = function() {
        console.log('next clicked')
    }
})
  

//onClick send info to backend and set up a db
//go to list view with clicked restaurant info loaded into "online menu" and ready to pass along info for when "create new note" is clicked//                                               