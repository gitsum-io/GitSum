// ---------------------------------------- Modules

var express         = require('express'),
	app             = express(),
	port            = process.env.PORT || 8080,
	router          = express.Router(),
	mongoose        = require('mongoose'),
	passport        = require('passport'),
	flash           = require('connect-flash'),
	logger          = require('morgan'),
	cookieParser    = require('cookie-parser'),
	methodOverride  = require('method-override'),
	http            = require('http'),
	path            = require('path'),
	session         = require('express-session'),
	databasebConfig = require('./app/config/database');

// ---------------------------------------- Configuration

// -------------------- Global
   
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(__dirname + '/public'));

mongoose.connect(databasebConfig.url);


// Passport configuration
require('./app/config/passport')(passport);

// -------------------- Authentication

// Log every request to the console
app.use(logger('dev'));

// Cookies and sessions for auth
app.use(cookieParser());
app.use(session({ 
	secret: 'roblovesthecock',
	resave: true,
	saveUninitialized: true
}));

// Passport auth setup
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions
app.use(flash()); // Connect-flash for flash messages stored in session

require('./app/config/passport')(passport); // pass passport for configuration

// -------------------- Routing

require('./app/routes')(app, router, passport);

// Angular template
app.use(function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Launch application
app.listen(port);

// ---------------------------------------- Expose app

exports = module.exports = app;