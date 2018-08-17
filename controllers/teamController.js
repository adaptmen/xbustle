var express = require('express');
var router = express.Router();
var session = require('express-session');
var Cookies = require('cookies');
var socketContext = require('../core/socket');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var db = require("../core/db")();
var sendy = require("../core/sendy/sendy");
var userService = require("../core/user-service");

router.get('/api/team/getall', (req, res) => {
  
  db
    .table('users')
    .where({
      teamNum: userService.currentUser.teamNum
    })
    .get()
    .then(
      (result) => {
        userService.sock.connect((s) => {
          userService.sock.send.self('test', result)
        });
        result !== []
          ? res.send(sendy("db_success", result))
          : res.send(sendy("team_not_found"));
      },
      (error) => {
        res.send(sendy("db_connection_error", error));
      }
    );
});

module.exports = router;