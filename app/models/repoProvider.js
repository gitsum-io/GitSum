// --------------------------------------- Modules

var mongoose = require('mongoose');

// --------------------------------------- Model

var Schema = mongoose.Schema;

// Repo Type schema
var RepoProviderSchema = new Schema({
	id: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

// User model
var RepoProvider = mongoose.model('RepoProvider', RepoProviderSchema);

// Expose user model
module.exports = RepoProvider;

var seedRepoProviders = new RepoProvider;
seedRepoProviders.id = 1;
seedRepoProviders.name = "GitHub";

// Check if repo provider already exists
// in DB otherwise save it
RepoProvider.find({ id: 1 }).find(function(err, repoProvider) {
	if (!repoProvider.length) {
		seedRepoProviders.save();
		console.log('Repo Provider saved!');
	} else {
		console.log('Repo Provider found!');
	}
})