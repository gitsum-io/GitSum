// --------------------------------------- Modules 

var mongoose = require('mongoose'),
	bcrypt   = require('bcrypt-nodejs'),
	Schema   = mongoose.Schema;

// --------------------------------------- Model

// Commit schema
var CommitSchema = new Schema({
	hash: String,
	date: Date,
	message: String,
	contributer: String,
	avatar: String
});

// Branch schema
var BranchSchema = new Schema({
	name: String,
	head: Boolean,
	commits: [CommitSchema]
});

// Repo schema
var RepoSchema = new Schema({
	name: String,
	branches: [BranchSchema],
	repoType: { 
		type: Schema.Types.ObjectId, 
		ref: 'RepoProviders'
	}
});

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
	password: {
		type: String,
		required: true
	},
	repositories: [RepoSchema]
});


// --------------------------------------- Methods

// Generate hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check password is vaild
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// User model
var User = mongoose.model('User', UserSchema);

// Expose user model
module.exports = User;


// TODO: TESTING BELOW THIS LINE, NEED TO REMOVE

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
						"date": new Date('01.02.2012'),
						"message": "Latest commit message!",
						"contributer": "Nick Spiel",
						"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/nickspiel/128.jpg"
					},
					{
						"hash": "hdfshjdfshjkdfskhj",
						"date": new Date('01.02.2012'),
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
						"date": new Date('01.02.2012'),
						"message": "First commit message!",
						"contributer": "Robert Petreski",
						"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
					},
					{
						"hash": "ayugwerljkdahjksd",
						"date": new Date('01.02.2012'),
						"message": "First commit message!",
						"contributer": "Robert Petreski",
						"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
					}
				],
			}
		],
		"repoType": "55482c578d709b8dee1a0f73"
	}
];



// Check if temp user already exists
// in DB otherwise save it

// User.remove({}, function(err, user) {
// 	console.log('removed users');
// });
// testUser.save();

// User.findOne({ name: "John Doe"}).populate({ path: 'repositories.repoType' }).exec(function (err, user) {
//   if (err) return handleError(err);
//   console.log(user);
// });