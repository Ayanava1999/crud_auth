const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Customer = require('../Schemas/customerSchema'); // Assuming you've exported your Customer model correctly

passport.use(new LocalStrategy(
  async function(username, password, done) {
    console.log(`Received username: ${username} and password: ${password}`);
    try {
      const user = await Customer.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Compare the provided password with the hashed password using the comparePassword method defined in your schema
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user); // Authentication successful
    } catch (error) {
      return done(error);
    }
  }
));

 //importing module
module.exports = passport;
