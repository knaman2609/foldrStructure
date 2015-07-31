// var DEBUG = true;
var DEBUG = false;

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var path 	 = require('path');
var swig     = require('swig'); 

//static files
var staticFiles = DEBUG?'/src':'/dist';
app.use(express.static(path.join(__dirname, staticFiles)));

// using swig
app.engine('html', swig.renderFile);


// dir for html
var dir = DEBUG?'/html':'/dist';
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
console.log('The magic happens on port ' + port);