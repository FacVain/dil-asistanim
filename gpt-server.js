require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./passport');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const authRoute = require("./routes/auth");
const historyRoute = require("./routes/history");
const apiRoute = require("./routes/api");

const mongoose = require('mongoose');
const connectDB =require("./config/dbConn")

connectDB()

console.log(process.env.NODE_ENV);

const app = express();
app.use(express.json());
app.enable("trust proxy");

app.use(express.static(path.join(__dirname, './dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.COOKIE_SECRET, 
  resave: false,
  saveUninitialized: false,
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
app.use("/api", apiRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

const port = process.env.PORT || 3000;

mongoose.connection.on('open', () => {
  console.log('connected to mongodb')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});