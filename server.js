var express = require('express'),
	http = require('http'),
	session = require('express-session'),
	passport = require('passport'),
	passportLocal = require('passport-local'),
	passportGoogle = require('passport-google');

// Define node app
var app = express();

app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Setting the root directory
app.use(express.static(__dirname + '/public'));

// --------------------------------------- Routes
// TODO: Put routes in routes file

// Setting the start file
app.get('/', function(req, res) {
	res.sendFile('index.html', { root: __dirname });
});

// Initial Login page
app.get('/account', function(req, res) {
	res.sendFile('account.html', { root: __dirname + '/public/account/' });
});

// Try to authenticate via passport
app.post('/login', passport.authenticate('sign-in', { 
		successRedirect: '/',
		failureRedirect: '/login'
	})
);

// Try to authenticate via passport
// TODO: Can we somehow bundle this with one above?  Seems a bit WET
app.post('/login', passport.authenticate('register', { 
		successRedirect: '/',
		failureRedirect: '/login'
	})
);

// --------------------------------------- Environments
// Set up dev environment handling
// TODO: Create environments file
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

	app.listen(port);

	if (env == 'development') {
		// Error handling
		// http://expressjs.com/guide/error-handling.html
		app.use(function(err, req, res, next) {
			console.error(err.stack);
			res.status(500).send('Server Error');
		});

		// Also see https://github.com/trentm/node-bunyan
	}
}