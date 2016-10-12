
function RepositoryController() {
    var repo = this;

    // Get the models required
    var repository = require('../models/repository');

    // Set up an empty array to store some test data
    repo.store = [];

    // Find a repo by ID
    var findRepositoryById = function(req) {
        var found = repository.model.filter(function(p) {
            return p.id === parseInt(req.params.id);
        });

        if (found && found.length > 0) {
            return found[0];
        }

        return null;
    };

    // Get method
    repo.get = function(req, res, next) {
        res.send(200, repo.store);
        return next();
    };

    // Method for getting the repo by ID
    repo.getById = function(req, res, next) {
        var found = findRepositoryById(req);

        if (found) {
            res.send(200, found);
        } else {
            res.send(404, 'Repository not found!')
        }

        return next();
    };

    // Add method
    // Added test validation
    repo.post = function(req, res, next) {
        if (!req.body.hasOwnProperty('name')) {
            res.send(500);
            return next();
        } else {
            var record = new repository.data();
            record.name = req.body.name;

            record.save(function() {
                console.log('saved');
                res.send(201);
            });
        }

        return next();
    };

    // Method for updating a repository
    repo.put = function(req, res, next) {
        if (!req.body.hasOwnProperty('name')) {
            res.send(500);
            return next();
        }

        var found = findRepositoryById(req);

        if (found) {
            found.name = req.body.name;
            res.send(200, found);
        } else {
            res.send(404, 'Repository not found!');
        }

        return next();
    };

    // Delete method for repository
    repo.del = function(req, res, next) {
        repo.store = repo.store.filter(function(p){
            return p.id !== parseInt(req.params.id);
        });

        res.send(200);

        return next();
    };
};

module.exports = new RepositoryController();
