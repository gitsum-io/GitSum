var express = require('express'),
	http = require('http'),
	session = require('express-session'),
	passport = require('passport'),
	passportLocal = require('passport-local'),
	passportGoogle = require('passport-google');

// Define node app
var app = express();

// Setting the root directory
app.use(express.static(__dirname + '/public'));

// Setting the start file
// TODO: Put routes in routes file
app.get('/', function(req, res) {
	res.sendFile('index.html', { root: __dirname });
});

// Set up dev environment handling
// TODO: Create environments file
var env = process.env.NODE_ENV;

if (env == null) {
	console.log('No Environments found! App terminated.');
	process.exit(1);
} else {
	if ('development' == env) {
		// Error handling
		// http://expressjs.com/guide/error-handling.html
		app.use(function(err, req, res, next){
			console.error(err.stack);
			res.status(500).send('Server Error');
		});

		// Also see https://github.com/trentm/node-bunyan
	}
}