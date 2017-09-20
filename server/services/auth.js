const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jwt-simple');

// const LocalStrategy = require('passport-local');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

const localOptions = {
  usernameField: 'email',
};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  console.log('Email and Pass inside LocalLogin', email, password);
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      console.log('dfdsfsdf ', user);
      return done(null, user);
    });
  });
});


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log('Payload', payload);
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

function signup({ email, password, req }) {
  const user = new User({ email, password });
  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }

  return User.findOne({ email })
      .then((existingUser) => {
        if (existingUser) {
          throw new Error('Email in use');
        }
        return user.save();
      });
}

function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err) { reject('Error ', err); }
      if (!user) { reject('Invalid credentials inside login function.'); }
      // req.logIn(user, () => {
      //   user.token = '123456';
      //   console.log(' Login function', req.user);
      //   resolve(user);
      // });
      user.token = tokenForUser(user);
      console.log(' Login function', user);
      resolve(user);
    })({ body: { email, password } });
  });
}

function accessProtectedData() {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) { reject('Error ', err); }
      if (!user) { reject('Invalid credentials inside login function.'); }
      console.log(' Login function', user);
      resolve(user);
    });
  });
}

module.exports = { signup, login, accessProtectedData };
