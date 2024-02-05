require('dotenv').config();
const express = require('express');
const passport = require('passport');
const path = require('path')
require('./passport');
const axios = require('axios');
const session = require('express-session');
const cors = require('cors');
const authRoute = require('./routes/auth');
const sendRequestToGPT = require('./gpt-request/gpt-request');

// database kurulacak ardından id ve kaç tane negatifle sonuçlanmış kaydedilecek 

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.use(session({
  secret: 'mysecret', // ToDo güzel bir secret seçelim!!
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false , maxAge: 24 * 60 * 60 * 1000 } // true if https !!
}))

function isLoggedIn(req, res, next) {
  if (req.user)
    console.log("in isLoggedIn: ", req.user);
  req.user ? next() : res.status(401).send('You must be logged in to perform this action');
}

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    methods: "GET,POST,PUT,DELETE",
    credentials: true, 
  })
)

app.use("/auth", authRoute);

app.post('/api/query', isLoggedIn, async (req, res) => {
  
  try {
    // Save the query to the database
    /*
    const newQuery = await pool.query(
      'INSERT INTO queries (user_id, query) VALUES ($1, $2) RETURNING *',
      [req.user.id, query]
    ); */

    // Send the query to OpenAI's API
    const response = await sendRequestToGPT(req)

    // Send response back to client
    res.json({ gptResponse: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
