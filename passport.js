const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User'); // Import the User model
require('dotenv').config();

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:1453/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      let currentUser = await User.findOne({ googleId: profile.id });
      if (currentUser) {
        // Existing user
        console.log(`User ${profile.displayName} is existing`);
        cb(null, currentUser);
      } else {
        // New user
        newUser = await User.create({
          googleId: profile.id,
          username: profile.displayName
        });
        console.log(`User ${profile.displayName} is created`);
        cb(null, newUser);
      }
    } catch (err) {
      cb(err);
    }
  
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id); // Mongoose automatically creates an _id field for your documents
});

passport.deserializeUser((id, done) => {
  try {
    const user = User.findById(id);
    done(null, user);
  }
  catch (error) {
    done(error);
  }
  
});

// ToDo database işlemleri gerekecek
/*
passport.serializeUser((user, done) => {
  //console.log("serializeUser User: ", user);
  done(null, user.google_id);
});
*/
/*
passport.deserializeUser(async (google_id, done) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE google_id = $1', [google_id]);
    //console.log("deserializeUser User: ", user, " \nid: ", id);
    done(null, user.rows[0]);
  } catch (err) {
    done(err);
  }
});
*/


