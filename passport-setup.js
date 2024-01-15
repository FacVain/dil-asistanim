const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./db'); // Assuming you've set up a pool using pg module

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await pool.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);
      if (user.rows.length > 0) {
        // Existing user
        done(null, user.rows[0]);
      } else {
        // New user
        user = await pool.query('INSERT INTO users (google_id, display_name) VALUES ($1, $2) RETURNING *', [profile.id, profile.displayName]);
        done(null, user.rows[0]);
      }
    } catch (err) {
      done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (err) {
    done(err);
  }
});
