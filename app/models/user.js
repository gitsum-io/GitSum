// --------------------------------------- Modules

var mongoose = require('mongoose');

// --------------------------------------- Model

var Schema   = mongoose.Schema;

// User schema
var UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
});

// User model
var User = mongoose.model('User', UserSchema);

// Expose user model
module.exports = User;