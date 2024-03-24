// auth.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CUSTOMER = require('../Schemas/customerSchema');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    console.log(`Recived user name: ${username} and password: ${password}`)
    try {
      const user = await CUSTOMER.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

module.exports = passport;
