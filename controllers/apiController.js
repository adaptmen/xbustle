var express = require('express');
var router = express.Router();
var session = require('express-session');
var Cookies = require('cookies');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var db = require("../core/db")();

var login_controller = require('./controllers/loginController');
var signup_controller = require('./controllers/signupController');
var user_controller = require('./userController');
var task_controller = require('./taskController');

router.all('user/*', user_controller);
router.all('task/*', task_controller);

router.get('/logout', function (req, res) {
    let cookie = new Cookies(req, res);
    cookie
        .set('token', '');
    return res.redirect('/login');
});

module.exports = router;