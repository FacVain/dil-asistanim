require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./passport');
const session = require('express-session');
const cors = require('cors');
const authRoute = require("./routes/auth");

const FreeTextAnalysis = require("./models/SerbestYazi")

const mongoose = require('mongoose');
const connectDB =require("./config/dbConn")

connectDB()

console.log(process.env.NODE_ENV);

const sendRequestToGPT = require('./gpt-request/gpt-request');

// database kurulacak ardından id ve kaç tane negatifle sonuçlanmış kaydedilecek 

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.COOKIE_SECRET, // ToDo güzel bir secret seçelim!!
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false , maxAge: 24 * 60 * 60 * 1000 } // true if https !!
}))

/*
function isLoggedIn(req, res, next) {
  req.user ? next() : res.status(401).send('You must be logged in to perform this action');
}
*/

function isLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    return next(); // User is logged in, continue to the next middleware/route handler
  } else {
    res.status(401).send('You are not logged in.');
  }
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
    // Send the query to OpenAI's API
    const gptResponse = await sendRequestToGPT(req);

    const userId = req.session.userId; // Retrieve the user ID from the session


    // Merge the request body and the GPT-3 response
    const documentData = {
      ...req.body, // this will spread the type, tone, and userInput fields
      ...gptResponse, // this will spread the sentimentAnalysis, toneAnalysis, rewrittenTextFromUserText, and suggestionForUserText fields
      user: userId // Add the user's ID as a foreign key reference
    };


    // Create a new document from the merged data
    const newTextAnalysis = new FreeTextAnalysis(documentData);

    // Save the document to the database
    const savedDocument = await newTextAnalysis.save();

    // Send the saved document back to the client as confirmation
    res.json(savedDocument);
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

