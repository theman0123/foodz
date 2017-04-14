var express = require('express');
var bodyParser = require('body-parser');
var getMainCtrl = require('./backend/controllers/mainCtrl')
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;

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
//pass db through mainCtrl//
var mainCtrl = getMainCtrl(db);
//passport-facebook login//
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

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { 
                          failureRedirect: '/#/failureLogin'
}), function(req, res, next) {
        res.redirect('/')
});
//passport-local login//
passport.use('local', new LocalStrategy(
    {usernameField:"email", passwordField:"password"},
  function(username, password, done) {
      console.log('local-Login email: ', username, ' password: ', password)
    db.users.findOne({
        email: username,
        password: password
    },
    function(err, user) {
        console.log('user', user)
      if (err) { console.log('error:', err);return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    })
  }
));
//local login authenticate and post new users//
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed', user: user });
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    req.login(user, function(loginErr) {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({user : user, success : true, message : 'authentication succeeded'});
    });      
  })(req, res, next);
});
//salt and desalt//
passport.serializeUser(function(user, done) {
  done(null, user);
    console.log(user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
//what is this???
// not set up/tested//

//function isAuthed(req, res, next) {
//  if (req.user) {
//    next();
//  } else {
//    res.status(403).send({msg: 'YOU SHALL NOT PASS!!!'});
//  }
//}

//app.get('/auth/logout', function(req, res) {
//  req.logout();
//  res.redirect('/login');
//});
//app.get('/auth/me', function(req, res) {
//  if (req.user) {
//    console.log(req.user);
//    res.status(200).send(req.user);
//  } else {
//    console.log('NO user!')
//    res.status(200).send();
//  }
//})

app.get('/newEntry', mainCtrl.getNotes);
app.get('/notes', mainCtrl.getAllNotes);
app.get('/restaurants', mainCtrl.getAllRestaurants);

app.post('/notes', mainCtrl.postNewNote);
app.post('/restaurant', mainCtrl.postNewRestaurant);

app.put('/notes', mainCtrl.updateNote);

app.delete('/notes', mainCtrl.deleteNote);
app.delete('/restaurant', mainCtrl.deleteRestaurant);

app.listen(port, function(){
    console.log('up and running on port ', port)
})