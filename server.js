var express = require('express'),
	app     = express();

// Setting the root directory
app.use(express.static(__dirname + '/public'));

// Setting the start file
app.get('/', function(req, res) {
	res.sendFile('index.html', { root: __dirname });
});

// Listening port
app.listen(8080);