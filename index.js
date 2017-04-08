var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;
var mainCtrl = require('./backend/controllers/mainCtrl');
/////debug//////
//var debug = require('debug')('http');
//var http = require('http');
//var name = 'foodz';
//
//debug('booting %s', name);
//
//http.createServer(function(req, res){
//  debug(req.method + ' ' + req.url);
//  res.end('hello\n');
//}).listen(3000, function(){
//  debug('listening');
//});
//
//require('./index.js')
////end of debugging///

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/frontend'));
app.use(session({
    secret: "I am nerdier than most",//put in different file and export//s
    saveUninitialized: false,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

var massiveInstance = massive.connectSync({
    connectionString: "postgres://postgres:postgres@localhost/foodz"
});

app.set('db', massiveInstance);
var db = app.get('db');
passport.use(new FacebookStrategy({
    clientID: '273746289751642',
    clientSecret: 'a63a04548509c03ece7db76a5f8b5961',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName']
}, 
    function(token, refreshToken, profile, done) {
    console.log('facebook')
        db.getUserByFacebookId([profile.id], function(err, user) {
            if (!user) {
                console.log('CREATING USER');
                db.createUserFacebook([profile.displayName, profile.id], function(err, user) {
                    return done(err, user, {scope: 'all'});
                })
            } else {
            return done(err, user);
            }
        })
}));
passport.use('local', new LocalStrategy(
    {usernameField:"email", passwordField:"password"},
  function(username, password, done) {
      console.log('local-Login email: ', username, ' password: ', password)
    db.users.findOne({
        email: username,
        password: password
    },
    function(err, user) {
      if (err) { console.log('error:', err);return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
        console.log('all is well in local-Oauth middleware')
      return done(null, user);
    })
  }
))

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
//                          sucessRedirect: '/',
                          failureRedirect: '/#/failureLogin'
}), function(req, res, next) {
    
//    res.send(req.user);
    res.redirect('/')
});

app.get('/newEntry', mainCtrl.getNotes);
app.get('/notes', mainCtrl.getAllNotes);
app.get('/restaurants', mainCtrl.getAllRestaurants);
app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

function isAuthed(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(403).send({msg: 'YOU SHALL NOT PASS!!!'});
  }
}


app.get('/auth/me', function(req, res) {
  if (req.user) {
    console.log(req.user);
    res.status(200).send(req.user);
  } else {
    console.log('NO user!')
    res.status(200).send();
  }
})

app.post('/notes', mainCtrl.postNewNote);
app.post('/restaurant', mainCtrl.postNewRestaurant);
app.post('/login', passport.authenticate('local', {
//    successRedirect: '/',
    failureRedirect: '/#/home'
}), function(req, res) {
    console.log('heyfriends')
    if(req.user) {
        res.send(req.user);
    } else res.send('error')
    //returning user info but not redirecting//
    
});

app.put('/notes', mainCtrl.updateNote);

app.delete('/notes', mainCtrl.deleteNote);
app.delete('/restaurant', mainCtrl.deleteRestaurant);

app.listen(port, function(){
    console.log('up and running on port ', port)
})

module.exports = app;
