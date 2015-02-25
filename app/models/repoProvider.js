// --------------------------------------- Modules

var mongoose = require('mongoose');

// --------------------------------------- Model

var Schema = mongoose.Schema;

// Repo Type schema
var RepoProviderSchema = new Schema({
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
seedRepoProviders.name = "GitHub";

// Check if repo provider already exists
// in DB otherwise save it
RepoProvider.find({ name: "GitHub" }).find(function(err, repoProvider) {
	if (!repoProvider.length) {
		seedRepoProviders.save();
		console.log('Repo Provider saved!');
	} else {
		console.log('Repo Provider found!');
	}
})