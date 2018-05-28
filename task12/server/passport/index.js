const passport = require('passport');
const fs = require('fs');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../model/userModel');
const bCrypt = require('bcrypt-nodejs');

const url = 'mongodb://localhost:27017/users';
mongoose.Promise = global.Promise;
mongoose.connect(url);

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, createHash(user.password));
};

passport.use(new LocalStrategy(((username, password, done) => {
  User.findOne({ "username" : username }, (err, user) => {
    console.log(user);
    if (err) {
      done(err);
    }
    if (user === null) {
      done(null, false);
    } else if (!isValidPassword(user, password)) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
})));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
//User.insertMany(JSON.parse(fs.readFileSync('server/data/users.json')), (err, r) => console.log(r));

module.exports = passport;
