function GitHubController() {
    var user = require('../models/user'),
        repositories = require('../models/repository'),
        secrets = require('../secrets.json'),
        bcrypt = require('bcrypt'),
        request = require('request'),
        querystring = require('querystring'),
        uuid = require('uuid'),
        github = this

    github.auth = function() {
      var clientId = req.params.client_id
      var clientSecret = secrets.github.client_secret
      var requestURL = 'https://github.com/login/oauth/authorize'
          + '?client_id=' + clientId
          + '&client_secret=' + clientSecret
          + '&scopes=' + 'user repo'
          + '&state=' + bcrypt.genSaltSync(10)

      request({
          url: requestURL,
          auth: {
              'bearer': accessToken
          },
          headers: {
              'User-Agent': 'GitSum API V1'
          }
      }, function(err, requestedRepo) {
          if (requestedRepo.statusCode == 200) {
              res.send(200, requestedRepo.body)
          }
      })
    }

    // Return a list of all repositories
    github.authinfo = function(req, res, next) {
        var json = {
            "client_id": secrets.github.client_id,
            "scope": ["repo", "user"],
            "state": bcrypt.genSaltSync(10)
        }
        res.send(200, json)
        return next()
    }

    function getAccessToken(userId) {
        // Get current access token from user
        var query = user.data.findOne({_id: userId })

        query.exec(function(err, user) {
            if (err) {
                res.send(400, JSON.stringify(err))
            }

            // Get the access token from the user's DB
            return user.github_access_token
        })
    }

    // Grab access token from GitHub via code provided
    // TODO: Refresh Token
    github.authorize = function(req, res, next) {
        if (!req.params.code || !req.params.client_id || !req.params.scopes || !req.params.state) {
            res.send(400)
            return next()
        }

        // URL params
        // Check if a user has been passed
        var userId
        if (!req.params.email) userId = req.params.email

        // Json body params
        var code = req.params.code
        var clientId = req.params.client_id
        var scopes = req.params.scopes.toString()
        var state = req.params.state

        var clientSecret = secrets.github.client_secret
        var accessToken

        // Get current access token from user
        var query = user.data.findOne({email: userId })

        query.exec(function(err, user) {
            if (err) {
                res.send(400, JSON.stringify(err))
            }

            // Get the access token from the user's DB
            // if user is found
            if (user != null) accessToken = user.github_access_token

            // If an access token exists, use that otherwise fetch a new one
            if (accessToken == null) {
                // Build the request URL for github access token
                var requestURL = 'https://github.com/login/oauth/access_token'
                    + '?client_id=' + clientId
                    + '&client_secret=' + clientSecret
                    + '&code=' + code
                    + '&scopes=' + scopes
                    + '&state=' + state

                request({
                    url: requestURL
                }, function(err, response, body) {
                    if (response.statusCode == 200) {
                        var jsonBody = ''

                        jsonBody = querystring.parse(body)

                        accessToken = jsonBody.access_token

                        if (accessToken !== null) {
                            // Create a new user if one doesn't already exist
                            if (user == null) {
                                // Fetch the users details from github
                                // Build the request URL for github access token
                                var userURL = 'https://api.github.com/user'

                                request({
                                    url: userURL,
                                    auth: {
                                        'bearer': accessToken
                                    },
                                    headers: {
                                        'User-Agent': 'GitSum API V1'
                                    }
                                }, function(err, response, body) {
                                    if (response.statusCode == 200) {
                                        jsonBody = querystring.parse(body)

                                        res.send(200, body)

                                        // Split up the full name
                                        var name = body.name.split(' ')

                                        var record = new userModel.data()

                                        // Capture information from request and try to save it
                                        record.first_name = name[0]
                                        record.last_name = name[1]
                                        record.email = body.login
                                        record.avatar = body.avatar_url

                                        record.save(function(err) {
                                            if (err) {
                                                res.send(400, JSON.stringify(err))
                                            }

                                            // TODO move app secret into config
                                            var token = jwt.sign(record, uuid.v4(), {
                                                expiresIn: 1440
                                            })

                                            res.send(200, token)
                                        })

                                        return next()
                                    }
                                })
                            } else {
                                user.data.findOneAndUpdate({email: email },
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
                                            res.send(500, JSON.stringify(err))
                                        }
                                        res.send(200, data)
                                    }
                                )
                            }
                        } else {
                            res.send(400, "Access Token not fetched from GitHub")
                        }
                    }
                })
            } else {
                res.send(200, user)
            }
        })

        return next()
    }

    // Method for updating a repository
    github.getRepository = function(req, res, next) {
        if (!req.params.repoid || !req.params.userid) {
            res.send(400)
            return next()
        }

        // URL params
        var repoId = req.params.repoid
        var userId = req.params.userid

        var query = repositories.data.findOne({_id: repoId })

        query.exec(function(err, repository) {
            if (err) {
                res.send(400, JSON.stringify(err))
            }

            var repoOwner = repository.owner
            var repoName = repository.name

            // Get current access token from user
            var query = user.data.findOne({_id: userId })

            // Get the access token
            query.exec(function(err, user) {
                if (err) {
                    res.send(400, JSON.stringify(err))
                }

                // Get the access token from the user's DB
                var accessToken = user.github_access_token

                // Build the request URL for github access token
                var requestURL = 'https://api.github.com/repos'
                    + '/' + repoOwner
                    + '/' + repoName + '/'
                    + 'commits'

                request({
                    url: requestURL,
                    auth: {
                        'bearer': accessToken
                    },
                    headers: {
                        'User-Agent': 'GitSum API V1'
                    }
                }, function(err, requestedRepo) {
                    if (requestedRepo.statusCode == 200) {
                        var dataObject = JSON.parse(requestedRepo.body)

                        var outputJSON = {}
                        for (var i = 0; i < dataObject.length; i++) {
                            var d = dataObject[i].commit.committer.date.split(' ')[0]
                            if (!outputJSON[d]) outputJSON[d] = []
                            outputJSON[d].push(dataObject[i])
                        }

                        res.send(200, outputJSON)
                    }
                })
            })
        })

        return next()
    }

    github.getBranches = function(req, res, next) {
        if (!req.params.repoid || !req.params.userid) {
            res.send(400)
            return next()
        }

        // URL params
        var repoId = req.params.repoid
        var userId = req.params.userid

        var query = repositories.data.findOne({_id: repoId })

        query.exec(function(err, repository) {
            if (err) {
                res.send(400, JSON.stringify(err))
            }

            var repoOwner = repository.owner
            var repoName = repository.name

            // Get current access token from user
            var query = user.data.findOne({_id: userId })

            // Get the access token
            query.exec(function(err, user) {
                if (err) {
                    res.send(400, JSON.stringify(err))
                }

                // Get the access token from the user's DB
                var accessToken = user.github_access_token

                // Build the request URL for github access token
                var requestURL = 'https://api.github.com/repos'
                    + '/' + repoOwner + '/'
                    + '/' + repoName + '/'
                    + 'branches'

                request({
                    url: requestURL,
                    auth: {
                        'bearer': accessToken
                    },
                    headers: {
                        'User-Agent': appName
                    }
                }, function(err, requestedBranches) {
                    if (requestedBranches.statusCode == 200) {
                        res.send(200, querystring.parse(requestedBranches.body))
                    }
                })
            })
        })

        return next()
    }
}

module.exports = new GitHubController()
