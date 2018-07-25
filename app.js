/*jslint node: true, regexp: true*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var login_controller = require('./controllers/loginController');
var signup_controller = require('./controllers/signupController');
var user_controller = require('./controllers/userController');
var task_controller = require('./controllers/taskController');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'tkt',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000000 }
}))

app.all('(/|/login)', login_controller);
app.get('/logout', login_controller);
app.all('/signup', signup_controller);
app.get('/user|/user/', user_controller);
app.all('/task(/*)', task_controller);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err: err});
});

app.disable('etag');

module.exports = app;
