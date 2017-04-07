//var db = require('../../index.js').get('db');

module.exports = {
    getNotes: function(req, res, next) {
        var id = req.query.id;

        db.get_notes([id], function(err, notes) {
            res.status(200).json(notes);
        })
    },
    getAllNotes: function(req, res, next) {
        db.get_all_notes(function(err, notes) {
            res.send(notes);
        })
    },
    getAllRestaurants: function(req, res, next) {
        db.get_all_restaurants(function(err, restaurants){
            res.send(restaurants);
        })
    },
    postNewNote: function(req, res, next) {

        var path = req.body;
        
        var title = path.title;
        var message = path.message;
        var photo = path.photo;
        var restaurant_id = req.body.restaurant_id;
        
        db.post_new_note([title, message, photo, restaurant_id], function(err, notes) {
            res.send(notes);
            
        })
    },
    postNewRestaurant: function(req, res, next) {
        var path = req.body;
        console.log(req.body);
        var name = path.name;
        var address = path.address;
        var slim_address = path.slim_address;
        var rating = path.rating;
        var id = path.id;
        var cuisine_type = path.cuisine_type;
        var menu_url = path.menu_url;

        db.post_new_restaurant([name, address, slim_address, rating, id, cuisine_type, menu_url], function(err, restaurants) {
            res.send(restaurants);
        })
    },
    updateNote: function(req, res, next) {
        var path = req.body;
//        console.log('updat note path', path);
        var message = path.message;
        var photo = path.photo;
        var note_title = path.title;
        var note_id = path.note_id;
        
        db.update_note([message, photo, note_title, note_id], function(err, notes) {
            res.send(notes);
        })
    },
    deleteNote: function(req, res, next) {
        db.delete_note([req.body.note_id], function(err, notes) {
            res.send(notes);
        })
    },
    deleteRestaurant: function(req, res, next) {
        db.delete_restaurant([req.body.restaurant_id], function(err, notes) {
            res.send(err);
        })
    }
	
}
    