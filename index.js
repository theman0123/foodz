var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


var app = module.exports = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/frontend'));
app.use(session({secret: "I am nerdier than most"}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: '273746289751642',
    clientSecret: 'a63a04548509c03ece7db76a5f8b5961',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
        return done(null, profile);
}))
var massiveInstance = massive.connectSync({
    connectionString: "postgres://postgres:postgres@localhost/foodz"
});

app.set('db', massiveInstance);

var mainCtrl = require('./backend/controllers/mainCtrl');

passport.serializeUser(function(user, done) {
  done(null, user);
    console.log(user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { 
                          sucessRedirect: '/home',
                         failureRedirect: '/login'
}), function(req, res, next) {
    res.send(req.user);
});

app.get('/newEntry', mainCtrl.getNotes);
app.get('/notes', mainCtrl.getAllNotes);
app.get('/restaurants', mainCtrl.getAllRestaurants);

app.post('/notes', mainCtrl.postNewNote);
app.post('/restaurant', mainCtrl.postNewRestaurant);

app.put('/notes', mainCtrl.updateNote);

app.delete('/notes', mainCtrl.deleteNote);
app.delete('/restaurant', mainCtrl.deleteRestaurant);
//app.post('/newFoodz', mainCtrl.newFoodz);

app.listen(port, function(){
    console.log('up and running on port ', port)
})
