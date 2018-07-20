/*jslint node: true, regexp: true*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var login_page = require('./routes/login');
var signup_page = require('./routes/signup');
var user_page = require('./routes/user');

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

app.all('(/|/login)', login_page);
app.get('/logout', login_page);
app.all('/signup', signup_page);
app.get('/user', user_page);

app.get('/task/add', (req, res) => {
    return { 
        html: res.render('task/add'),
        active: 'add'
    }
});



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
