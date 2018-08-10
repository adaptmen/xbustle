var express = require('express');
var router = express.Router();
var session = require('express-session');
var Cookies = require('cookies');
var socketContext = require('../core/socket');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var sha1 = require('sha1');
var io = require('socket.io').listen(4040);
var db = require("../core/db")();
var sendy = require("../core/sendy/sendy");
var userService = require("../core/user-service");
var isEmail = require('validator').isEmail;
var isEmpthy = require('validator').isEmpthy;

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
            userService.currentUser = result[0];
            res.cookie.set('token', result[0].token);
            res.send(sendy("db_success"));
          })()
          : res.send(sendy("user_not_found"));
      },
      (error) => {
        res.send(sendy("db_connection_error", error));
      }
    );
});

router.get('/api/user/islogged', (req, res) => {
  db
    .table('users')
    .where({
      token: req.cookies.token
    })
    .get()
    .then(
      (result) => {
        result !== []
          ? (() => {
            userService.currentUser = result[0];
            res.send(sendy("user_found"))
          })()
          : res.send(sendy("user_not_found"))
      },
      (error) => {
        res.send(sendy("db_connection_error", error))
      }
    )
});


router.get('/api/user/logout', function (req, res) {
  res.cookie.set('token', '');
  return res.redirect('/login');
});



router.post('/api/user/signup', urlencodedParser, (req, res) => {
  let email = req.body.email;

  if (!isEmpthy(req.body.email)) {
    if (isEmail(email)) {
      let token = userService.generateToken();

      db.table('users')
        .insert({
          login: userService.generateLogin(email),
          password: userService.generatePassword(),
          token: token,
          created_at: (new Date()).toISOString()
        })
        .then(successH, errorH);
    } else {
      res.send(sendy("email_invalid"));
    }
  }


  function successH(result) {
    dobby.sendMail(email, name, password)
      .then(
        (info) => {
          res.send(sendy("email_success"))
        },
        (err) => {
          res.send(sendy("email_error", err))
        }
      )
  }

  function errorH(err) {
    res.send(sendy("db_connection_error"));
  }
});


module.exports = router;