const express = require("express");
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const session = require('express-session');

// Loading the module dotenv-safe and loading the environment variable
require("dotenv-safe").config();

var app = express();

// Using Express Session
app.use(session({
  cookie: {
    expires: new Date(Date.now() + 3600000)
  },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('There is a problem with Sessions')); // handle error
  }
  
  next();
})

// Tell to Express about what is the view's engine.
app
  .set('view engine', 'ejs')
  .set('views', './app/views');

// For more security in our application, let's use helmet
app.use(helmet());

// Making the express look for static assets
app.use(express.static('./app/public/'));

// Body-parser Middleware.
app.use(bodyParser.urlencoded({ extended: true }));

// Express Validator Middleware
app.use(expressValidator());

// If you want allow request from any where...
// app.use(function(req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

//   // Request headers you wish to allow
//   res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,authorization");

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   next();
// });

// Routes in autoloading
// Consign already executes the functions retrieved from imports
consign()
  .include('./app/routes')
  .then('./config/dbConnection.js')
  .then('./app/models')
  .then('./app/controllers')
  .into(app);

module.exports = app;