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
    // Added test validation
    repo.post = function(req, res, next) {
        var record = new repository.data();

        // Capture information from request and try to save it
        record.name = req.body.name;
        record.uri = req.body.uri;
        record.uri_type = req.body.uri_type;
        record.type = req.body.type;

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
