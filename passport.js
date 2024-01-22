const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./db');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:1453/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      let user = await pool.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);
      if (user.rows.length > 0) {
        // Existing user
        console.log(`User ${profile.displayName} is existing`);
        cb(null, user.rows[0]);
      } else {
        // New user
        user = await pool.query('INSERT INTO users (google_id, display_name) VALUES ($1, $2) RETURNING *', [profile.id, profile.displayName]);
        console.log(`User ${profile.displayName} is created`);
        cb(null, user.rows[0]);
      }
    } catch (err) {
      cb(err);
    }
  
  }
));

// ToDo database işlemleri gerekecek
passport.serializeUser((user, done) => {
  //console.log("serializeUser User: ", user);
  done(null, user.google_id);
});

passport.deserializeUser(async (google_id, done) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE google_id = $1', [google_id]);
    //console.log("deserializeUser User: ", user, " \nid: ", id);
    done(null, user.rows[0]);
  } catch (err) {
    done(err);
  }
});