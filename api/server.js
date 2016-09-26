var restify = require('restify'),
    repository = require('./repository'),
    port = process.env.PORT || 3000;

var server = restify.createServer({
  name: 'GitSum API V1'
});

// Compress the response object if requested
server.use(restify.gzipResponse());

// Parse the query string - making it available in req.query
server.use(restify.queryParser());

server.use(restify.fullResponse());
server.use(restify.bodyParser());

// Get a list of all repos
server.get('/api/v1/repository', repository.get);

// Update existing repo
server.put('/api/v1/repository/:id', repository.put);

// Add a new repo
server.post('/api/v1/repository', repository.post);

// Get a specific repo
server.get('/api/v1/repository/:id', repository.getById);

// Get a specific repo
server.del('/api/v1/repository/:id', repository.del);

// Set up the server for listening
server.listen(port, function() {
  console.log('api running at ' + port);
});
