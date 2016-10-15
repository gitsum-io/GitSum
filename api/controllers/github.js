function GitHubController() {
    var user = require('../models/user'),
        repositories = require('../models/repository'),
        secrets = require('../secrets.json'),
        bcrypt = require('bcrypt'),
        request = require('request'),
        querystring = require('querystring'),
        github = this;

    // Return a list of all repositories
    github.authinfo = function(req, res, next) {
        var json = {
            "client_id": secrets.github.client_id,
            "scopes": "repos",
            "state": bcrypt.genSaltSync(10)
        }
        res.send(200, json);
        return next();
    };

    function getAccessToken(userId) {
        // Get current access token from user
        var query = user.data.findOne({_id: userId });

        query.exec(function(err, user) {
            if (err) {
                res.send(400, JSON.stringify(err));
            }

            // Get the access token from the user's DB
            return user.github_access_token;
        });
    }

    // Grab access token from GitHub via code provided
    github.code = function(req, res, next) {
        var code = req.params.code;
        var userId = req.params.userid;
        var clientId = req.params.client_id;
        var clientSecret = secrets.github.client_secret;
        var scopes = req.params.scopes;
        var state = req.params.state;
        var accessToken = '';

        // Get current access token from user
        var query = user.data.findOne({_id: userId });

        query.exec(function(err, user) {
            if (err) {
                res.send(400, JSON.stringify(err));
            }

            // Get the access token from the user's DB
            accessToken = user.github_access_token;

            // Build the request URL for github access token
            var requestURL = 'https://github.com/login/oauth/access_token'
                + '?client_id=' + clientId
                + '&client_secret=' + clientSecret
                + '&code=' + code
                + '&scopes=' + scopes
                + '&state=' + state;

            // If an access token exists, use that otherwise
            // fetch another
            // TODO: Refresh Token
            if (accessToken == '') {
                request({
                    url: requestURL
                }, function(err, response, body) {
                    if (response.statusCode == 200) {
                        var jsonBody = '';

                        jsonBody = querystring.parse(body);

                        accessToken = jsonBody.access_token;

                        user.data.findOneAndUpdate({_id: userId },
                            {
                                $set: {
                                    "github_access_token": accessToken
                                }
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
                    }
                });
            } else {
                res.send(200, user);
            }
        });

        return next();
    };

    // Method for updating a repository
    github.getRepository = function(req, res, next) {
        var repoId = req.params.repoid;

        var query = repositories.data.findOne({_id: repoId });

        query.exec(function(err, repository) {
            if (err) {
                res.send(400, JSON.stringify(err));
            }

            var repoOwner = repository.owner;
            var repoName = repository.name;

            // Get the access token
            query.exec(function(err, user) {
                if (err) {
                    res.send(400, JSON.stringify(err));
                }

                // Get the access token from the user's DB
                var accessToken = user.github_access_token;

                // Build the request URL for github access token
                var requestURL = 'https://api.github.com/repos'
                    + '/' + repoOwner + '/'
                    + '/' + repoName + '/'

                request({
                    url: requestURL,
                    auth: {
                        'bearer': accessToken
                    },
                    headers: {
                        'User-Agent': appName
                    }
                }, function(err, res) {
                    console.log(res.body);
                });
            });
        });

        return next();
    };
};

module.exports = new GitHubController();
