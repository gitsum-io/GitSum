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
        var updateObj = {};

        if (req.body.hasOwnProperty('name')) updateObj.name =  req.body.name;
        if (req.body.hasOwnProperty('uri')) updateObj.uri =  req.body.uri;
        if (req.body.hasOwnProperty('uri_type')) updateObj.uri_type =  req.body.uri_type;
        if (req.body.hasOwnProperty('type')) updateObj.type =  req.body.type;

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
        repo.store = repo.store.filter(function(p){
            return p.id !== parseInt(req.params.id);
        });

        res.send(200);

        return next();
    };
};

module.exports = new RepositoryController();
