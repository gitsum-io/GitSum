var LocalStrategy = require('passport-local').Strategy,
    User          = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

// --------------------------------------- Model passport session

    // Serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

// --------------------------------------- Local setup

    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, function(req, email, password, done) {

        console.log(email);
        process.nextTick(function() {
            // Find the user
            User.findOne({'email': email}, function(err, user) {
                if (err) return done(err);

                // Check if theres already a user with the email provided
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    console.log("Creating user " + newUser.email);
                    // Create the user
                    var newUser = new User();
                    
                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);

                    // Save the user
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });    
        });
    }));
};