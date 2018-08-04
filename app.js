/*jslint node: true, regexp: true*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var api_controller = require('./controllers/apiController');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist/xbustle')));

app.all('/api/*', api_controller);

app.all('*[^/api]', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/xbustle/index.html'))
});


app.disable('etag');

module.exports = app;