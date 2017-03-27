angular.module('foodz').controller('mainCtrl', function($scope, mainSrvc, $stateParams){

    function onLoad() {
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                
                mainSrvc.getFoodz(lat, lon);
                
                $scope.quantity = 4;
                $scope.arrayOfFoodz = mainSrvc.returnArray();
            })
        } else {
          console.log('no geolocation');
        }
    }
    
    $scope.createNewRestaurant = function(place) {
        mainSrvc.createNewRestaurant(place);
    }
    onLoad();
})
  

//onClick send info to backend and set up a db
//go to list view with clicked restaurant info loaded into "online menu" and ready to pass along info for when "create new note" is clicked//                                               