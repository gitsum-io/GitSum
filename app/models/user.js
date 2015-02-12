// --------------------------------------- Modules

var mongoose = require('mongoose');

// --------------------------------------- Model

var Schema = mongoose.Schema;

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
	repositories: [
		{
			name: String,
			branches: [
				{
					name: String,
					head: Boolean,
					commits: [
						{
							hash: String,
							date: Date,
							message: String,
							contributer: String,
							avatar: String
						}
					]
				}
			]
		}
	]
});

// User model
var User = mongoose.model('User', UserSchema);

// Expose user model
module.exports = User;