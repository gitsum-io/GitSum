// --------------------------------------- Modules

var User       = require('./models/user'),
	bodyParser = require('body-parser'),
	path       = require('path');

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
		console.log('Attempting to get all users.');
		User.find(function(err, users) {
			if (err) res.send(err);
			res.json(users);
		});
	})
	.post(function(req, res) {
		console.log('Attempting to create user.');
		var user   = new User();
		user.name  = req.body.name;
		user.email = req.body.eamil; // TODO: email is not saving
		user.save(function(err) {
			if (err) res.send(err);
			res.json({ message: 'User created!' });
		});
	});

	// TODO: Add in PUT and DELETE routes

	router.route('/users/:user_id')
	.get(function(req, res) {
		console.log('Attempting to get a user.');
		User.findById(req.params.user_id, function(err, user) {
		if (err) res.send(err);
			res.json(user);
		});
	})
	.put(function(req, res) {
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
		console.log('Attempting to delete a user.');
        User.remove({
            _id: req.params.user_id
        }, function(err, bear) {
            if (err) res.send(err);
            res.json({ message: 'Deleted user.' });
        });
    });
}