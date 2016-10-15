var restify = require('restify'),
    repository = require('./controllers/repository'),
    user = require('./controllers/user'),
    github = require('./controllers/github'),
    appName = 'GitSum API V1',
    port = process.env.PORT || 3000;

var server = restify.createServer({
    name: appName
});

// Compress the response object if requested
server.use(restify.gzipResponse());

// Parse the query string - making it available in req.query
server.use(restify.queryParser());

server.use(restify.fullResponse());
server.use(restify.bodyParser());

/***************************************
Routes
TODO: Move into own location
TODO: Prefix version and other defaults
****************************************/

// Repositories
// Get a list of all repos
server.get('/api/v1/:userId/repositories', repository.get);
// Update existing repo
server.put('/api/v1/:userId/repository/:repoId', repository.put);
// Add a new repo
server.post('/api/v1/:userId/repository', repository.post);
// Get a specific repo
server.get('/api/v1/:userId/repository/:repoId', repository.getById);
// Delete a specific repo
server.del('/api/v1/:userId/repository/:repoId', repository.del);

// Users
// Get a list of all users
server.get('/api/v1/:userId/users', user.get);
// Update existing user
server.put('/api/v1/:userId/user', user.put);
// Add a new user
server.post('/api/v1/:userId/user', user.post);
// Get a specific user
server.get('/api/v1/:userId/user', user.getById);
// Delete a specific user
server.del('/api/v1/:userId/user', user.del);

// GitHub
server.get('/api/v1/:userId/github/auth/info', github.authinfo);
server.post('/api/v1/:userId/github/auth/authorize', github.authorize);
server.get('/api/v1/:userId/github/repositories', github.getRepositories);
server.get('/api/v1/:userId/github/repository/:repoid', github.getRepository);
server.get('/api/v1/:userId/github/repository/:repoId/branches', github.getBranches);

// Set up the server for listening
server.listen(port, function() {
  console.log('api running at ' + port);
});
