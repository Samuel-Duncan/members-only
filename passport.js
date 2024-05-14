const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  session({ secret: 'cats', resave: false, saveUninitialized: true })
);

module.exports = passport;
