angular.module('foodz').service('mainSrvc', function($http, $q, $stateParams) {
    var idx = $stateParams.id;
    var nearArray = [];
    var count = 4;
    var meters = "40,000";
//    ?count=', count + 'radius=', meters + 'lat=', lat +'lon=', lon + "'"
    this.getFoodz = function(lat, lon) {

        if(lat && lon) {    
            return $http.get(('https://developers.zomato.com/api/v2.1/search'), {
                headers: {"X-Zomato-API-Key": "451e00ec0a1c87145925d326a5319666"}
            }).then(function(response){
                var data = response.data.restaurants;

                data.forEach(function(item) {
                    ///consider putting "{{NumOfMiles}} miles away from you/// instead of actual address///
                    //you could also push more info to back end....//
                    var path = item.restaurant.location.address;
//                    console.log(item);
                    var Restaurant = {
                        name: item.restaurant.name,
                        address: item.restaurant.location.address,
                        slimAddress: path.substring(0, path.length - 10) + "...",
                        rating: item.restaurant.user_rating.aggregate_rating,
                        id: item.restaurant.id,
                        cuisine_type: item.restaurant.cuisines,
                        menu_url: item.restaurant.menu_url
                    }
                    nearArray.push(Restaurant);
                }) 
            }) 
//            console.log(nearArray)
        } //won't return nearArray;
    }
    this.returnArray =function() {
        return nearArray;
    }
    this.returnObject = function(idx) {
//        console.log('return obj', idx)
        return nearArray.find(function(place) {

            if(idx === place.id) {
                if(!place.message) {
                    //modify css to say 'no notes here'//
                    console.log('no notes!')
                    return place;
                } else return place;
            } 
        })
    }
    
    this.createNewRestaurant = function(place) {
        console.log('create new restaurant', place);
        this.currentPlace = place;
//        $http.post('/someUrl', data, config).then(successCallback, errorCallback);
        //post data to backend and save to a db//
    }
})

