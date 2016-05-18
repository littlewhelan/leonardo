var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var secret = require('./config/user');
var jwt = expressJwt({secret: secret});
var mongoose = require('mongoose');
var request = require('request');

var dbURI = require('./config/mongoose');

var index = require('./routes/index');
var search = require('./routes/search');
var createMailList = require ('./routes/createMailList');
var family = require ('./routes/family');

var login = require('./routes/login');
var register = require('./routes/register');
var admin = require('./routes/admin');

var corporation = require('./routes/corporation');

var contactList = require('./routes/newContactList');
var popList = require('./routes/populateContactList');




var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public/static')));
app.use('/private', express.static( path.join(__dirname, 'private')));


app.use('/createMailList', createMailList);
app.use('/search', search );
app.use('/admin', admin);
app.use('/family',family);

app.use('/private/*', jwt);
app.use('/', express.static(path.join(__dirname, 'public/static/index.html')));
app.use('/login', login);
app.use('/register', register);
app.use('/corporation', corporation);

app.use('/newContactList',contactList);
app.use('/populateContactList', popList);



app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.send(401, 'invalid token...');
  }
});

// Create the database connection
mongoose.connect(dbURI.conn);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
