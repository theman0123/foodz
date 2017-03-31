angular.module('foodz').service('mainSrvc', function($http, $q, $stateParams) {
    var idx = $stateParams.id;
    var nearArray = [];
    var count = 4;
    var meters = "40,000";
    
    var findItem = function(item) {
        var idx = $stateParams.id;
//        console.log(idx)
        return item.id === idx;
    }
    
    var getFoodz = function(lat, lon) {
        
        if(lat && lon) {    
            return $http.get(('https://developers.zomato.com/api/v2.1/search?' + 'lat=' + lat +'&lon=' + lon), {
                headers: {"X-Zomato-API-Key": "451e00ec0a1c87145925d326a5319666"}
            }).then(function(response){
                var data = response.data.restaurants;
   
                data.forEach(function(item) {
                    var path = item.restaurant.location.address;

                    var Restaurant = {
                        name: item.restaurant.name,
                        address: item.restaurant.location.address,
                        slimAddress: path.substring(0, path.length - 10) + "...",
                        rating: Math.floor(item.restaurant.user_rating.aggregate_rating),
                        id: item.restaurant.id,
                        cuisine_type: item.restaurant.cuisines,
                        menu_url: item.restaurant.menu_url
                    }
                    nearArray.push(Restaurant);
                })
            })   
        }
    }
    this.pullRestaurants = function () {
        
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
            
                getFoodz(lat, lon);
            })
        } else {
          console.log('no geolocation');
        }
    }
    
    this.getAllRestaurants = function() {
        return $http.get('/restaurants');
    }
//    var index = 0;
//    var fourAtATime = function(item) {
//        console.log(item, index)
//        return item[index] >= index && item[index] < (index + 4)
//    }
    this.returnArray = function() {
//        console.log(fourAtATime)
//       return nearArray.filter(fourAtATime);
//        index +=4;
        return nearArray;
    }
    
    this.returnObject = function() {
        return nearArray.find(findItem);
    }

    this.getNotes = function() {
        return $http.get('/notes');
    }
    
    
    this.createNewRestaurant = function(place) {
//        console.log('new restaurant created', place);
        
        $http.post('/restaurant', place);
    }
    
    this.saveNewNote = function(idx, obj) {
//        console.log('new note saved', idx, 'noteObj', obj);
        
        $http.post('/notes', obj);    
    }
})

