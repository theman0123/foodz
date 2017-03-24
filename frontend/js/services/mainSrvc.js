angular.module('foodz').service('mainSrvc', function($http, $q) {
    
//    var api_key = "451e00ec0a1c87145925d326a5319666";

    var count = 4;
    var meters = "40,000";
//    ?count=', count + 'radius=', meters + 'lat=', lat +'lon=', lon + "'"
    this.getFoodz = function(lat, lon) {

        if(lat && lon) {    
            return $http.get(('https://developers.zomato.com/api/v2.1/search'), {
                headers: {"X-Zomato-API-Key": "451e00ec0a1c87145925d326a5319666"}
            })
        }
    }
})

