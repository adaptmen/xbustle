var express = require('express');
var router = express.Router();
var session = require('express-session');
var Cookies = require('cookies');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var db = require("../core/db")();

var user_controller = require('./userController');
var task_controller = require('./taskController');

router.all('/api/user/*', user_controller);
router.all('/api/task/*', task_controller);

router.get('/logout', function (req, res) {
    let cookie = new Cookies(req, res);
    cookie
        .set('token', '');
    return res.redirect('/login');
});

module.exports = router;