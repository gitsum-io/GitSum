// ---------------------------------------- Modules

var express        = require('express'),
	app            = express(),
	router         = express.Router(),
	methodOverride = require('method-override'),
	session        = require('express-session'),
	http           = require('http'),
	path           = require('path'),
	mongoose       = require('mongoose'),
	passport       = require('passport'),
	passportLocal  = require('passport-local'),
	passportGoogle = require('passport-google');

// ---------------------------------------- Configuration

// -------------------- Global
   
app.use(express.static(__dirname + '/public'));
require('./app/routes')(app, router);

// -------------------- Passport

app.use(session({
	secret: 'supernova', 
	saveUninitialized: true, 
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// -------------------- Method overrides

app.use(methodOverride('X-HTTP-Method-Override')); 

// -------------------- Database

var database = require('./app/database');
mongoose.connect('mongodb://localhost/gitsum', function(err) { 
	if(err){
		console.log(err);
	}
});

// ---------------------------------------- Environments

// TODO Sort this out... Does it need to be in its own file or does it belong here? I don't know...

var env = process.env.NODE_ENV;

if (env == null) {
	console.log('No Environments found! App terminated.');
	process.exit(1);
} else {
	var port = process.env.PORT;

	if (port == null) {
		console.log('Port not defined in Environments! App terminated.');
		process.exit(1);
	}

	// Start the app
	app.listen(port);

	if (env == 'development') {
		// Error handling
		// http://expressjs.com/guide/error-handling.html
		app.use(function(err, req, res, next) {
			console.error(err.stack);
			res.status(500).send('Server Error');
		});
	}
}



// ---------------------------------------- Expose app

exports = module.exports = app;