var restify = require('restify'),
    repository = require('./controllers/repository'),
    user = require('./controllers/user'),
    github = require('./controllers/github'),
    auth = require('./controllers/auth'),
    appName = 'GitSum API V1',
    port = process.env.PORT || 4000;

var server = restify.createServer({
    name: appName
});

// Compress the response object if requested
server.use(restify.gzipResponse());

// Parse the query string - making it available in req.query
server.use(restify.queryParser());

server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.use(restify.CORS({
    origins: ['*'],
}));

/***************************************
Routes
TODO: Move into own location
TODO: Prefix version and other defaults
****************************************/

// Repositories
// Get a list of all repos
server.get('/api/v1/:userid/repositories', repository.get);
// Update existing repo
server.put('/api/v1/:userid/repository/:repoid', repository.put);
// Add a new repo
server.post('/api/v1/:userid/repository', repository.post);
// Get a specific repo
server.get('/api/v1/:userid/repository/:repoid', repository.getById);
// Delete a specific repo
server.del('/api/v1/:userid/repository/:repoid', repository.del);

// Users
// Get a list of all users
server.get('/api/v1/:userid/users', user.get);
// Update existing user
server.put('/api/v1/:userid/user', user.put);
// Add a new user
server.post('/api/v1/:userid/user', user.post);
// Get a specific user
server.get('/api/v1/:userid/user', user.getById);
// Delete a specific user
server.del('/api/v1/:userid/user', user.del);

// GitHub
// USER: 57fefb08ab6aaee45acc96d6
server.get('/api/v1/github/auth/info', github.authinfo);
server.post('/api/v1/github/auth/authorize', github.authorize);
server.get('/api/v1/:userid/github/repository/:repoid/branches', github.getBranches);
server.get('/api/v1/:userid/github/repository/:repoid/branch/:branchName', github.getRepository);

// Authentication
server.post('/api/v1/authenticate', auth.authenticate);

// Set up the server for listening
server.listen(port, function() {
  console.log('api running at ' + port);
});
