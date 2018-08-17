var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var socketContext = require('../core/socket');
var urlencodedParser = require("body-parser").urlencoded({
  extended: false
});
var db = require("../core/db")();
var sendy = require("../core/sendy/sendy");
var dobby = require("../core/dobby");
var userService = require("../core/user-service");
var isEmail = require('validator').isEmail;
var isEmpty = require('validator').isEmpty;

router.post('/api/user/login', (req, res) => {
  let user = req.body.user;

  db
    .table('users')
    .where({
      login: user.login,
      password: user.password
    })
    .get()
    .then(
      (result) => {
        result !== []
          ?
          (() => {
            let cookies = new Cookies(req, res);
            userService.currentUser = result[0];
            cookies.set('token', result[0].token);
            res.send(sendy("user_found"));
          })()
          :
          res.send(sendy("user_not_found"));
      },
      (error) => {
        res.send(sendy("db_connection_error", error));
      }
    );
});

router.get('/api/user/islogged', (req, res) => {
  userService.currentUser !== {}
    ? res.send(sendy("user_logged"))
    : res.send(sendy("user_not_logged"))
});


router.get('/api/user/logout', function (req, res) {
  let cookies = new Cookies(req, res);
  cookies.set('token', '');
  userService.currentUser = {};
  res.send(sendy("user_exited"));
});



router.post('/api/user/signup', urlencodedParser, (req, res) => {
  let email = req.body.email;

  if (!isEmpty(req.body.email)) {
    if (isEmail(email)) {
      let token = userService.generateToken();
      let login = userService.generateLogin(email);
      let password = userService.generatePassword();

      db.table('users')
        .params({
          login,
          password,
          token,
          created_at: (new Date()).toISOString()
        })
        .insert()
        .then(
          (result) => {
            dobby.sendMail(email, login, password)
            .then(
              (info) => {
                res.send(sendy("email_success", info))
              },
              (err) => {
                res.send(sendy("email_error", err))
              }
            )
          },
          (err) => {
            res.send(sendy("db_connection_error", err));
          }
        );
    } else {
      res.send(sendy("email_invalid"));
    }
  }

});


module.exports = router;