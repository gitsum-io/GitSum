// --------------------------------------- Modules

var User         = require('./models/user'),
	RepoProvider = require('./models/repoProvider'),
	bodyParser   = require('body-parser'),
	path         = require('path'),
	https        = require('https');

// --------------------------------------- Global variables

var publicPath = path.join(__dirname, '../public/');

// --------------------------------------- Router

module.exports = function(app, router) {

// -------------------- Router setup

	// Formatting responses as JSON
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
	app.use(bodyParser.urlencoded({ extended: true }));

	// All api routes will be under 'api'
	app.use('/api', router);

	// Listen and log api requests
	router.use(function(req, res, next) {
		console.log('Api request has been made.');
		next();
	});

	// Root api access message
	router.get('/', function(req, res) {
		res.json({ message: 'Welcome to the GitSum Api!' });   
	});

// -------------------- Users routes
	
	router.route('/users')
	.get(function(req, res) {
		// Get all users
		console.log('Attempting to get all users.');
		User.find(function(err, users) {
			if (err) res.send(err);
			res.json(users);
		});
	})
	.post(function(req, res) {
		// Create a user
		console.log('Attempting to create user.');
		var user   = new User();
		user.name  = req.body.name;
		user.email = req.body.email;
		user.save(function(err) {
			if (err) res.send(err);
			res.json({ message: 'User created!' });
		});
	});

	router.route('/users/:user_id')
	.get(function(req, res) {
		// Create a single user
		console.log('Attempting to get a user.');
		User.findById(req.params.user_id, function(err, user) {
		if (err) res.send(err);
			res.json(user);
		});
	})
	.put(function(req, res) {
		// Update a user
		console.log('Attempting to update a user.');
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);
			user.name = req.body.name;
			user.save(function(err) {
			   if (err) res.send(err);
			   res.json({ message: 'User updated!' });
			});

		});
	})
	.delete(function(req, res) {
		// Delete a user
		console.log('Attempting to delete a user.');
		User.remove({
			_id: req.params.user_id
		}, function(err, bear) {
			if (err) res.send(err);
			res.json({ message: 'Deleted user.' });
		});
	});

	router.route('/github')
	.get(function(req, res) {

		User.find(function(err, users) {
			if (err) res.send(err);
			res.json(users);
		});

		var options = {
			host : 'api.github.com',
			port : 443,
			path : '/repos/nickspiel/nickspiel/commits',
			method : 'GET',
			headers: {
				'User-Agent': 'GitSum'
			}
		};

		// Fetch the list of repos for a given organization
		var request = https.get(options, function (res) {
			data = "";

			// We watch the response data we receive
			res.on('data', function (chunk) {
				// We store them
				data += chunk;
			});

			// When the response from the Github server ends
			res.on('end', function () {
				// We can parse the complete response into a JS object
				var repos = JSON.parse(data);

				// And call a callback which basically will fetch the PR for those repositories
				console.log(repos);
			});
		});

		// We can listen on `error` event to know if something goes wrong
		request.on('error', function (error) {
			console.log('Problem with request: '+ error);
		});
	});
}