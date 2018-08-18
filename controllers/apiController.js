var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var urlencodedParser = require("body-parser").urlencoded({
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
  if (!cookie.get('token')) {
    return next()
  } else {
    if (userService.currentUser !== {}) {
      console.log(cookie.get('token'));
      db
      .table('users')
      .where({
        token: cookie.get('token')
      })
      .get()
      .then(
        (result) => {
          console.log("user_init: " + result);
          userService.sock.connect(() => {
            userService.sock.send.self('user_init', result[0])
          });

          result !== []
            ?
            (() => {
              let cookies = new Cookies(req, res);
              userService.currentUser = result[0];
              cookies.set('token', result[0].token);
              next();
            })()
            :
            res.send(sendy("user_not_found"));
        },
        (error) => {
          res.send(sendy("db_connection_error", error));
        }
      )
    }
  }
});

router.all('/api/user/*', user_controller);
router.all('/api/tasks/*', tasks_controller);
router.all('/api/team/*', team_controller);

module.exports = router;