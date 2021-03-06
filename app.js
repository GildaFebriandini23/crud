/*
 * Main App file App.js
 * @author Gilda febriandini
 */



// Dependencies requirements, Express 4
var express        = require('express');
var app            = express();

var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose        = require("mongoose");

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());

// MongoDB configuration
routes = require('./routes/car')(app);
mongoose.connect('mongodb://localhost/car', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

routes = require('./routes/baju')(app);
mongoose.connect('mongodb://localhost/baju', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});


app.listen(8080);
console.log('Im listening on port 8080');

// First example router
app.get('/', function(req, res) {
 res.sendfile('./public/index.html');
});

app.get('/baju', function(req, res) {
 res.sendfile('./baju/index.html');
});