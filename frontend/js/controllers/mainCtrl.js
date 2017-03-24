angular.module('foodz').controller('mainCtrl', function($scope, mainSrvc){

    function onLoad() {
        if ("geolocation" in navigator) {
//            console.log(navigator);
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                
                mainSrvc.getFoodz(lat, lon).then(function(response){
                    var nearArray = [];
                    // just use for loop, delete forEach, push to Array, ng repeat on array//
                var data = response.data.restaurants;
                    data.forEach(function(item) {
                        ///consider putting "{{NumOfMiles}} miles away from you/// instead of actual address///
                        var path = item.restaurant.location.address;
                            console.log(path)//.substring(0, path.length - 5));
                        var Restaurant = {
                            name: item.restaurant.name,
                            address: item.restaurant.location.address,
                            rating: item.restaurant.user_rating.aggregate_rating
                        }
                        nearArray.push(Restaurant);
                    })
                    
                    $scope.quantity = 4;
                    $scope.arrayOfFoodz = nearArray;

                    //won't be needing this soon//
//                var name = data[0].restaurant.name;
//                var address = data[0].restaurant.location.address;
////                var slimAddress = address.splice(5, address.length - 5);
//                var rating = data[0].restaurant.user_rating.aggregate_rating;
//                console.log(name, address, rating)
//                
//                $scope.address = address;
//                $scope.rating = rating;
            });
            });
        } else {
          console.log('no geolocation');
        }
    }
    var rName = onLoad();

})

///clean up this controller
//onClick send info to backend and set up a db
//go to list view with clicked restaurant info loaded into "online menu" and ready to pass along info for when "create new note" is clicked//