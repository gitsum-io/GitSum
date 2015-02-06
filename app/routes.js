// --------------------------------------- Modules

var User       = require('./models/user'),
	path       = require('path'),
	publicPath = path.join(__dirname, '../public/')

// --------------------------------------- Routes

module.exports = function(app) {

// -------------------- Server routes

	// Setting the start file
	app.get('/api/users', function(req, res) {
		User.find(function(err, users) {
		if (err) res.send(err);
			res.json(users);
		});
	});

// -------------------- Frontend routes

	// All other requests are sent to angular
	app.get('*', function(req, res) {
		res.sendFile('index.html', { root: publicPath });
	});
}