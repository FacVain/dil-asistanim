require('dotenv').config();
const express = require('express');
const passport = require('passport');
const axios = require('axios');
const cookieSession = require('cookie-session');
require('./passport-setup');

const app = express();
const pool = require('./db'); // PostgreSQL pool setup

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
  keys: [process.env.SESSION_SECRET]
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

app.get('/dashboard', isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.display_name}!`);
});

app.post('/api/query', isLoggedIn, async (req, res) => {
  const query = req.body.query;

  try {
    // Save the query to the database
    const newQuery = await pool.query(
      'INSERT INTO queries (user_id, query) VALUES ($1, $2) RETURNING *',
      [req.user.id, query]
    );

    // Send the query to OpenAI's API
    const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-1106/completions', {
      prompt: query,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Send response back to client
    res.json({ query: newQuery.rows[0], response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send('You must be logged in to perform this action');
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
