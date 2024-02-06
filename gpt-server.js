require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./passport');
const session = require('express-session');
const cors = require('cors');
const authRoute = require("./routes/auth");

const mongoose = require('mongoose');
const connectDB =require("./config/dbConn")

connectDB()

console.log(process.env.NODE_ENV);

const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });  

// database kurulacak ardından id ve kaç tane negatifle sonuçlanmış kaydedilecek 

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.COOKIE_SECRET, // ToDo güzel bir secret seçelim!!
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false , maxAge: 24 * 60 * 60 * 1000 } // true if https !!
}))

function isLoggedIn(req, res, next) {
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
  const query = req.body.userInput;

  try {
    // Save the query to the database
    /*
    const newQuery = await pool.query(
      'INSERT INTO queries (user_id, query) VALUES ($1, $2) RETURNING *',
      [req.user.id, query]
    ); */

    // Send the query to OpenAI's API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": query
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Send response back to client
    res.json({ gptResponse: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 3000;

mongoose.connection.on('open', () => {
  console.log('connected to mongodb')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

