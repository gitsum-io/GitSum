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
****************************************/

// Repositories
// Get a list of all repos
server.get('/api/v1/repositories', repository.get);
// Update existing repo
server.put('/api/v1/repository/:id', repository.put);
// Add a new repo
server.post('/api/v1/repository', repository.post);
// Get a specific repo
server.get('/api/v1/repository/:id', repository.getById);
// Delete a specific repo
server.del('/api/v1/repository/:id', repository.del);

// Users
// Get a list of all users
server.get('/api/v1/users', user.get);
// Update existing user
server.put('/api/v1/user/:id', user.put);
// Add a new user
server.post('/api/v1/user', user.post);
// Get a specific user
server.get('/api/v1/user/:id', user.getById);
// Delete a specific user
server.del('/api/v1/user/:id', user.del);

// GitHub
server.get('/api/v1/github/auth/info', github.authinfo);
server.post('/api/v1/github/auth/code/:userid', github.code);
server.get('/api/v1/github/repository/:repoid', github.getRepository);

// Set up the server for listening
server.listen(port, function() {
  console.log('api running at ' + port);
});
