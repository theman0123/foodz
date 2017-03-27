var db = require('../index.js').get('db');

module.exports = {
    getNotes: function(req, res, next) {
        var id = req.query.id;

        db.get_notes([id], function(err, notes) {
            res.send(notes);
        })
    },
    getAllNotes: function(req, res, next) {
        db.get_all_notes(function(err, notes) {
            res.send(notes);
        })
    },
    postNewNote: function(req, res, next) {
        var path = req.body;
        var title = path.title;
        var message = path.message;
        var photo = path.photo;
        var restaurant_id = req.body.id;
        
        console.log(title, message, photo, restaurant_id)
        db.post_new_note([title, message, photo, restaurant_id], function(err, notes) {
            res.status(200).json(notes);
            
        })
    }
	
}
    ///uncomment after you set up db backend///
//    onLoad: function(req, res, next){
//        db.get_user_info([<parameters>], function(err, data) {
//            console.log(err, data);
//            res.send(data);
//        })
//    }

//}

    
    
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