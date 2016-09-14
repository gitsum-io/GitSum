<<<<<<< Updated upstream
// ---------------------------------------- Modules

var express        = require('express'),
	app            = express(),
	router         = express.Router(),
	methodOverride = require('method-override'),
	session        = require('express-session'),
	http           = require('http'),
	path           = require('path'),
	mongoose       = require('mongoose'),
	passport       = require('passport'),
	passportLocal  = require('passport-local'),
	passportGoogle = require('passport-google');

// ---------------------------------------- Configuration

// -------------------- Global
   
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(__dirname + '/public'));

// -------------------- Database connection

var database = require('./app/database');
mongoose.connect('mongodb://localhost/gitsum', function(err) { 
	if(err){
		console.log(err);
	}
});

// -------------------- Routing

require('./app/routes')(app, router);

app.use(function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// -------------------- Passport // TODO this is not doing anything at the moment

app.use(session({
	secret: 'supernova', 
	saveUninitialized: true, 
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());



// ---------------------------------------- Environments

// TODO Sort this out... Does it need to be in its own file or does it belong here? I don't know...

var env = process.env.NODE_ENV;

if (env == null) {
	console.log('No Environments found! App terminated.');
	process.exit(1);
} else {
	var port = process.env.PORT;

	if (port == null) {
		console.log('Port not defined in Environments! App terminated.');
		process.exit(1);
	}

	// Start the app
	app.listen(port);

	if (env == 'development') {
		// Error handling
		// http://expressjs.com/guide/error-handling.html
		app.use(function(err, req, res, next) {
			console.error(err.stack);
			res.status(500).send('Server Error');
		});
	}
}



// ---------------------------------------- Expose app

exports = module.exports = app;
=======
/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
>>>>>>> Stashed changes
