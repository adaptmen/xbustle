var express = require('express');
var router = express.Router();
var session = require('express-session');
var Cookies = require('cookies');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var db = require("../core/db")();
var userService = require("../core/user-service");
var sendy = require("../core/sendy/sendy");

var user_controller = require('./userController');
var tasks_controller = require('./tasksController');
var team_controller = require('./teamController');

router.all('*', (req, res, next) => {
  let cookie = new Cookies(req, res);
  if (cookie.get('token') === "") {
    next()
  } else if (userService.currentUser !== {}) {
    db
      .table('users')
      .where({
        token: cookie.get('token')
      })
      .get()
      .then(
        (result) => {
          result !== [] ?
            (() => {
              let cookies = new Cookies(req, res);
              userService.currentUser = result[0];
              cookies.set('token', result[0].token);
              next();
            })() :
            res.send(sendy("user_not_found"));
        },
        (error) => {
          res.send(sendy("db_connection_error", error));
        }
      )
  }
});

router.all('/api/user/*', user_controller);
router.all('/api/tasks/*', tasks_controller);
router.all('/api/team/*', team_controller);

module.exports = router;