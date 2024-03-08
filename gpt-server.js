require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./passport');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const authRoute = require("./routes/auth");
const historyRoute = require("./routes/history");


const getModelByType = require('./models/ModelFactory')

const mongoose = require('mongoose');
const connectDB =require("./config/dbConn")

connectDB()

console.log(process.env.NODE_ENV);

const { isLoggedIn } = require('./middlewares/authMiddleware')

const sendRequestToGPT = require('./gpt-request/gpt-request');
const sendRequestToXMLRoBERTa = require('./xmlroberta-request/roberta-request');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.COOKIE_SECRET, // ToDo güzel bir secret seçelim!!
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false , maxAge: 24 * 60 * 60 * 1000 } // true if https !!
}))


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
app.use("/history", historyRoute);


app.post('/api/query', isLoggedIn, async (req, res) => {
  
  try {
    // Send the query to OpenAI's API
    const gptResponse = await sendRequestToGPT(req);
    const robertaResponse = await sendRequestToXMLRoBERTa(req);

    const userId = req.session.userId; // Retrieve the user ID from the session


    // Merge the request body and the GPT-3 response
    const documentData = {
      ...req.body, // this will spread the type, tone, and userInput fields
      ...gptResponse, // this will spread the sentimentAnalysis, toneAnalysis, rewrittenTextFromUserText, and suggestionForUserText fields
      user: userId // Add the user's ID as a foreign key reference
    };

    // Determine the correct model based on the input type
    const AnalysisModel = getModelByType(req.body.type);

    // Create a new document using the dynamic model
    const newTextAnalysis = new AnalysisModel(documentData);

    // Save the document to the database
    const savedDocument = await newTextAnalysis.save();

    res.json({ robertaResponse: robertaResponse, gptResponse: gptResponse });
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

