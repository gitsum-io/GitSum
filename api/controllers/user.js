function UserController() {
    var repo = this;

    // Get the models required
    var user = require('../models/user');

    // Return a list of all users
    repo.get = function(req, res, next) {
        user.data.find(function (err, users) {
            if (err) {
                res.send(400, JSON.stringify(err));
            }
            res.send(200, users);
        });

        return next();
    };

    // Method for getting the repo by ID
    repo.getById = function(req, res, next) {
        var query = user.data.find({_id: req.params.id });

        query.exec(function(err, users) {
            if (err) {
                res.send(400, JSON.stringify(err));
            }
            res.send(200, users);
       });

        return next();
    };

    // Add method
    repo.post = function(req, res, next) {
        var record = new user.data();

        // Capture information from request and try to save it
        record.first_name = req.body.first_name;
        record.last_name = req.body.last_name;
        record.email = req.body.email;
        record.password = req.body.password;
        record.avatar = req.body.avatar;

        record.save(function(err) {
            if (err) {
                res.send(400, JSON.stringify(err));
            }
            res.send(201, '{"message": "User successfully added."}');
        });

        return next();
    };

    // Method for updating a user
    repo.put = function(req, res, next) {
        var updateObj = {};

        if (req.body.hasOwnProperty('first_name')) updateObj.first_name =  req.body.first_name;
        if (req.body.hasOwnProperty('last_name')) updateObj.last_name =  req.body.last_name;
        if (req.body.hasOwnProperty('email')) updateObj.email =  req.body.email;
        if (req.body.hasOwnProperty('password')) updateObj.password =  req.body.password;
        if (req.body.hasOwnProperty('avatar')) updateObj.avatar =  req.body.avatar;

        user.data.findOneAndUpdate({_id: req.params.id },
            {
                $set: updateObj
            },
            {
                new: true
            },
            function(err, data) {
                if (err) {
                    res.send(500, JSON.stringify(err));
                }
                res.send(200, data);
            }
        );

        return next();
    };

    // Delete method for user
    repo.del = function(req, res, next) {
        var query = user.data.find({_id: req.params.id });

        query.remove().exec(function(err, data) {
            if (err) {
                res.send(500, JSON.stringify(err));
            }
            res.send(200, '{"message": "User successfully deleted."}');
       });

        return next();
    };
};

module.exports = new UserController();
