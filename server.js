// server.js

// env =========================================================================

var port          = process.env.PORT || 8080;
var secretAppKey  = 'thisismyhandwrittensecretapikey';
var authBaseURL   = '/auth';

// packages ====================================================================

var express       = require('express');
var app           = express();
var mongoose      = require('mongoose');
var debug         = require('debug');
var path          = require('path');
var slug          = require('slug');
var passport      = require('passport');
var flash         = require('connect-flash');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var favicon       = require('serve-favicon');

// config ======================================================================

// register paths
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// serve favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// db config and connection
var configDb = require('./config/database.js');
mongoose.connect(configDb.url);

// passport config
require('./config/passport')(passport);

// log requests to console
app.use(morgan('dev'));

// body and cookies content parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// templating engine
app.set('view engine', 'ejs');

// session config
app.use(session({
  secret: secretAppKey,
  resave: false,
  saveUninitialized: false
}));

// passport config
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// flash messages
app.use(flash());

// allow CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

// routes ======================================================================

require('./app/routes/common.js')(app);
require('./app/routes/singleAppEx.js')(app);
require('./app/routes/auth.js')(app, express, passport, authBaseURL);

// launch ======================================================================

app.listen(port);
console.log('The magic happens on port ' + port);