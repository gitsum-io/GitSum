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
	repositories: [RepoSchema]
});

// Repo schema
var RepoSchema = new Schema({
	name: String,
	branches: [BranchSchema]
});

// Branch schema
var BranchSchema = new Schema({
	name: String,
	head: Boolean,
	commits: [CommitSchema]
});

// Commit schema
var CommitSchema = new Schema({
	hash: String,
	date: Date,
	message: String,
	contributer: String,
	avatar: String
});

// User model
var User = mongoose.model('User', UserSchema);

// Expose user model
module.exports = User;