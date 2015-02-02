var express        = require('express'),
	http           = require('http'),
	session        = require('express-session'),
	passport       = require('passport'),
	passportLocal  = require('passport-local'),
	mongoose       = require('mongoose'),
	passportGoogle = require('passport-google');

// Define node app
var app = express();

app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Setting the root directory
app.use(express.static(__dirname + '/public'));

// --------------------------------------- Database

// TODO: this should go in a models file, cannot for the life of me work out how to do that

// Database connection
mongoose.connect('mongodb://localhost/gitsum', function(err) { if (err) console.log(err); });

// Mongoose global schema object
var Schema = mongoose.Schema;

// Person schema
var personSchema = new Schema({
	email: String,
	name:  String
});

// Person model
var Person = mongoose.model('Person', personSchema);

// New person
var nick = new Person({
	email: "email@nicksdassadsadpiel.me",
	name: "balls",
});

// Save person to the DB
nick.save(function(err, nick) {
  if (err) throw err;
});

// Find the person and log them to the console
Person.find(function (err, people) {
  if (err) return console.error(err);
  console.log(people)
});

// --------------------------------------- Routes
// TODO: Put routes in routes file

// Setting the start file
app.get('/', function(req, res) {
	res.sendFile('index.html', { 
		root: __dirname 
	});
});

// Initial Login page
app.get('/account', function(req, res) {
	res.sendFile('account.html', { 
		root: __dirname + '/public/account/'
	});
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