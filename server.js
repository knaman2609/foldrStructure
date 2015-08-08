var DEBUG = true;
// var DEBUG = false;

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var path 	 = require('path');
var swig     = require('swig'); 

//static files
var staticFiles = DEBUG?'/src':'/dist';
app.use(express.static(path.join(__dirname, staticFiles)));

// for assets
app.use('/assets', express.static(path.join(__dirname, '/assets')));

// using swig
app.engine('html', swig.renderFile);

// dir for html
var dir = DEBUG?'/src/html':'/dist/html';
app.set('views', __dirname + dir);

// for dev
app.set('view cache', false);
swig.setDefaults({ cache: false });

//logging the requests
app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

// routes 
require('./routes.js')(app);

app.listen(port);

var mode = DEBUG?'dev':'prod';
console.log('Server started in '+ mode +' mode on port '+ port);