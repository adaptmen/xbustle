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
var tasks_controller = require('./tasksController');
var team_controller = require('./teamController');

router.all('/api/user/*', user_controller);
router.all('/api/task/*', tasks_controller);
router.all('/api/team/*', team_controller);

module.exports = router;