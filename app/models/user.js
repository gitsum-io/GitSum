// --------------------------------------- Modules

var mongoose = require('mongoose');

// --------------------------------------- Model

var Schema   = mongoose.Schema;

// User schema
var UserSchema = new Schema({
	email: String,
	name:  String
});

// User model
var User = mongoose.model('User', UserSchema);

// Expose user model
module.exports = User;

// TODO: remove the below when ready

// // New User
// var nick = new User({
// 	email: "email@nicksdassadsadpiel.me",
// 	name: "nick",
// });

// // Save User to the DB
// nick.save(function(err, nick) {
//   if (err) throw err;
// });