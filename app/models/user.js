// --------------------------------------- Modules 

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

// --------------------------------------- Model
//var repoProvider = mongoose.model('repoProvider', RepoProviderSchema);

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
	branches: [BranchSchema],
	repoType: { 
		type: ObjectId, 
		ref: 'repoProvider',
		required: true
	}
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

var testUser = new User;
testUser.name = "John Doe";
testUser.email = "me@example.com";
testUser.repositories = [
			{
				"name": "Alcoil",
				"branches": [
					{
						"name": "master",
						"head": true,
						"commits": [
							{
								"hash": "ayugwerljkdahjksd",
								"date": "1/2/2015",
								"message": "Latest commit message!",
								"contributer": "Nick Spiel",
								"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/nickspiel/128.jpg"
							},
							{
								"hash": "hdfshjdfshjkdfskhj",
								"date": "29/1/2015",
								"message": "Why am I commiting code?!",
								"contributer": "Ash Brock",
								"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/gerrenlamson/128.jpg"
							}
						]
					},
					{
						"name": "dev",
						"head": true,
						"commits": [
							{
								"hash": "ayugwerljkdahjksd",
								"date": "1/2/2016",
								"message": "First commit message!",
								"contributer": "Robert Petreski",
								"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
							},
							{
								"hash": "ayugwerljkdahjksd",
								"date": "1/2/2016",
								"message": "First commit message!",
								"contributer": "Robert Petreski",
								"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
							}
						],
					}
				],
				"repoType": '54ebe100d674d355ceb0ba98'
			},
			{
				"name": "Myskin"
			}
		];

// Check if temp user already exists
// in DB otherwise save it
User.find({ name: 'John Doe' }).find(function(err, user) {
	if (!user.length) {
		testUser.save();
		//console.log(user);
		console.log('Temp User saved!');
	} else {
		// TODO: remove this user to add new one!
		console.log(testUser);
		console.log('Temp User found!');
	}
})