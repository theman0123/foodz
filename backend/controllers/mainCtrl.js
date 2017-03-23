


module.exports = {
    ///uncomment after you set up db backend///
//    onLoad: function(req, res, next){
//        db.get_user_info([<parameters>], function(err, data) {
//            console.log(err, data);
//            res.send(data);
//        })
//    }

}

    
    
    //var app = require('../index.js');
//var zomato = require('zomato');
//
//var lat = '40.758701';
//var lon = '-111.876183';
//
//var client = zomato.createClient ({
//    userKey: '451e00ec0a1c87145925d326a5319666'
//});
//move to front end when appropiate//
//if ("geolocation" in navigator) {
//    var lat = navigator.geolocation.getCurrentPostition(function(position) {
//    return position.coords.latitude;
//})
//    var lon = navigator.geolocation.getCurrentPostition(function(position) {
//    return position.coords.latitude;
//})
//} else {
//    
//}
//       client.getLocations({
////           query: "Salt Lake City",
//           lat: lat,
//           lon: lon,
//           count: '10'
//       }, function(err, result) {
//           if(!err) {
//               res.status(200).send(result);
//           } else {
//               res.send(err);
//           }
//       });
//    }