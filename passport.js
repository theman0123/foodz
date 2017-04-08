module.exports = { 
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
      console.log('localLogin email: ', username, ' password: ', password)
    db.users.findOne({
        email: username,
        password: password
    },
    function(err, user) {
      if (err) { console.log('error:', err);return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    })
  }
))
}