function RepositoryController() {
    var repo = this;

    // Get the models required
    var repository = require('../models/repository');

    // Return a list of all repositories
    repo.get = function(req, res, next) {
        repository.data.find(function (err, repositories) {
            if (err) {
                res.send(400, JSON.stringify(err));
            }
            res.send(200, repositories);
        });

        return next();
    };

    // Method for getting the repo by ID
    repo.getById = function(req, res, next) {
        var query = repository.data.find({_id: req.params.id });

        query.exec(function(err, repositories) {
            if (err) {
                res.send(400, JSON.stringify(err));
            }
            res.send(200, repositories);
       });

        return next();
    };

    // Add method
    repo.post = function(req, res, next) {
        var record = new repository.data();

        // Capture information from request and try to save it
        record.name = req.body.name;
        record.owner = req.body.owner;
        record.branch = req.body.branch;

        record.save(function(err) {
            if (err) {
                res.send(400, JSON.stringify(err));
            }
            res.send(201, '{"message": "Repository successfully added."}');
        });

        return next();
    };

    // Method for updating a repository
    repo.put = function(req, res, next) {
        var updateObj = {};

        if (req.body.hasOwnProperty('name')) updateObj.name =  req.body.name;
        if (req.body.hasOwnProperty('owner')) updateObj.owner =  req.body.owner;
        if (req.body.hasOwnProperty('branch')) updateObj.branch =  req.body.branch;

        repository.data.findOneAndUpdate({_id: req.params.id },
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

    // Delete method for repository
    repo.del = function(req, res, next) {
        var query = repository.data.find({_id: req.params.id });

        query.remove().exec(function(err, data) {
            if (err) {
                res.send(500, JSON.stringify(err));
            }
            res.send(200, '{"message": "Repository successfully deleted."}');
       });

        return next();
    };
};

module.exports = new RepositoryController();
