
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('cookie-session');


module.exports = (app) => {

  // ACTIVATE LOGINS IN STAGING
  if (process.env.HOST_MODE === 'staging') {
    // INIT PASSPORT & SESSIONS
    app.use(session({ secret: 'thisCodeIsReallyAwesome' }));
    app.use(passport.initialize());
    app.use(passport.session());

    // GENERIC PASSPORT LOCAL SETUP
    passport.use(new LocalStrategy(
      (username, password, done) => {
        if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
          return done(null, false, { message: 'Incorrect Credentials!' });
        }
        return done(null, { username, password, _id: 1337 });
      }
    ));

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    // BASIC AUTH ROUTES
    app.post('/login',
      passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: false })
    );

    app.get('/login', (req, res) => {
      res.render('dev_views/login');
    });
  }
};
