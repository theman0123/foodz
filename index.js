var express = require('express');
var bodyParser = require('body-parser');
var getMainCtrl = require('./backend/controllers/mainCtrl')
var session = require('express-session');
var redis = require('redis');
var RedisStore = require('connect-redis')(session);
var pg = require('pg');
var Pool = require('pg').Pool;
var massive = require('massive');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;

/////debug//////
//var debug = require('debug')('http');
//var http = require('http');
//var name = 'foodz';

//debug('booting %s', name);

//http.createServer(function(req, res){
//  debug(req.method + ' ' + req.url);
//  res.end('hello\n');
//}).listen(3000, function(){
//  debug('listening');
//});

//require('./index.js')
////end of debugging///
var app = express();


app.use(bodyParser.json());

app.use(express.static(__dirname + '/frontend'));
//copying heroku docs//
app.set('frontend', __dirname + '/frontend');
app.set('view engine', 'ejs');

//redisOpts = {
//    unref: false
//    client: client 
//}
    
var client = redis.createClient();
var sessionStore = new RedisStore({ client: client });

app.use(session({
    store: sessionStore,
    secret: "I am nerdier than most",//put in different file and module.export?//
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

///setup pg database ///
//pg.defaults.ssl = true;
//var conString = 'postgres://postgres:postgres@localhost/foodz';
//var config = {
//  user: 'PGUSER', //env var: PGUSER 
//  database: 'foodz', //env var: PGDATABASE 
//  password: 'secret hey hey hey hey', //env var: PGPASSWORD 
//  host: 'localhost', // Server hosting the postgres database 
//  port: 3000, //env var: PGPORT 
//  max: 10, // max number of clients in the pool 
//  idleTimeoutMillis: 60000, // how long a client is allowed to remain idle before being closed 
//};
//var pool = new Pool(config);
//console.log(pool);
///// trying to get pool setup ///
//pg.connect(conString, function(err, client, done) {
//    if(err) return console.error('error', err)
//    client.query('SELECT * FROM notes;', function (err, result){
//        console.log('pg pool', result);
//        done(err)
//    })
////    .on('row', function(row) {
////      console.log(JSON.stringify(row));
////    });
//})
/// using session as global validation //
app.use(function(req, res, next) {
    if (req.session && req.session.user) {
        console.log('reqsession.user', req.session.user);
    db.users.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
      console.log('req.session.user', req.session.user);
    next();
  }
})
//setup for massive and database//
sslmode= require;
process.env.DATABASE_URL = "postgres://postgres:postgres@localhost/foodz";
var connectionString = process.env.DATABASE_URL;
var massiveInstance = massive.connectSync({connectionString});
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
      //fix these db calls.... how?////
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
    console.log('172', err, user, info)
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
        req.session.reset();
        return res.send({ success : false, message : 'authentication failed', user: user });
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    req.login(user, function(loginErr) {
        console.log('line188', user, loginErr)
      if (loginErr) {
        return next(loginErr);
      }
        req.session.user = user;
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

/// not working ///
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login').send('you\'ve been logged out');
});
//app.get('/auth/me', function(req, res) {
//  if (req.user) {
//    console.log(req.user);
//    res.status(200).send(req.user);
//  } else {
//    console.log('NO user!')
//    res.status(200).send();
//  }
//})
function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

app.get('/newEntry', mainCtrl.getNotes);
app.get('/notes', requireLogin, mainCtrl.getAllNotes);
app.get('/restaurants', mainCtrl.getAllRestaurants);

app.post('/newUser', mainCtrl.postNewUser);
app.post('/notes', mainCtrl.postNewNote);
app.post('/restaurant', mainCtrl.postNewRestaurant);

app.put('/notes', mainCtrl.updateNote);

app.delete('/notes', mainCtrl.deleteNote);
app.delete('/restaurant', mainCtrl.deleteRestaurant);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('up and running on port ', app.get('port'))
})