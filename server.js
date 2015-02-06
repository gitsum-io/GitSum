// ---------------------------------------- Modules

var express        = require('express'),
	app            = express(),
	bodyParser     = require('body-parser'),
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
require('./app/routes')(app);

// -------------------- Passport

app.use(session({
	secret: 'supernova', 
	saveUninitialized: true, 
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// -------------------- Body Parser

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true }));

// -------------------- Method overrides

app.use(methodOverride('X-HTTP-Method-Override')); 

// -------------------- Database

var database = require('./app/database');
mongoose.connect('mongodb://localhost/gitsum'); 

// ---------------------------------------- Expose app

exports = module.exports = app; 

// ==============================================================================



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
	console.log('Magic happens on port ' + port);

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

// // --------------------------------------- Database

// // TODO: this should go in a models file, cannot for the life of me work out how to do that

// // Database connection
// mongoose.connect('mongodb://localhost/gitsum', function(err) { if (err) console.log(err); });

// // Mongoose global schema object
// var Schema = mongoose.Schema;

// // Person schema
// var personSchema = new Schema({
// 	email: String,
// 	name:  String
// });

// // Person model
// var Person = mongoose.model('Person', personSchema);

// // New person
// var nick = new Person({
// 	email: "email@nicksdassadsadpiel.me",
// 	name: "balls",
// });

// // Save person to the DB
// nick.save(function(err, nick) {
//   if (err) throw err;
// });

// // Find the person and log them to the console
// Person.find(function (err, people) {
//   if (err) return console.error(err);
//   console.log(people)
// });