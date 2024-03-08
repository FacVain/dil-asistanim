const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const User = require('./models/User'); // Import the User model
require('dotenv').config();

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await User.findOne({ username: username }).exec();
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      const match = await bcrypt.compare(password, user.hashedPassword);
      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      let currentUser = await User.findOne({ googleId: profile.id }).exec();
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

passport.serializeUser((user, cb) => {
  //done(null, user.id); // Mongoose automatically creates an _id field for your documents
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, cb) =>{
  /*
  try {
    const user = await User.findById(id);
    done(null, {id:id, username: user.username});
  }
  catch (error) {
    done(error);
  }
  */
  process.nextTick(function() {
    return cb(null, user);
  });
  
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


