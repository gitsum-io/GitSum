var express = require('express'),
	app     = express();

// Setting the root directory
app.use(express.static(__dirname + '/'));

// Setting the root directory
app.get('/', function(req, res) {
	res.sendFile('/index.html');
});

// Listening port
app.listen(8080);