var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var emailConfig = require('../config/config.json');
var session = require('express-session');
var Cookies = require('cookies');
var db = require("../core/db")();
var dobby = require("../core/dobby")();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var sha1 = require('sha1');




router.get('/signup', function (req, res) {
    res.render('signup');
});

router.post('/signup', urlencodedParser, function (req, res) {
    let email = req.body.email;
    let cookie = new Cookies(req, res, {
        expires: 1000000000
    });

    let name = req.body.username;
    let token = sha1(name + email + Math.random(161825));
    let password = sha1(token + Math.random(161825)).slice(0, 12);

    let userData = {
        name: name,
        password: password,
        created_at: (new Date()).toISOString(),
        token: token
    };

    db.table('users').insert(userData)
        .then(successH, errorH);

    function successH(result) {
        dobby.sendMail(email, name, password)
            .then((info) => {
                    res.send({
                        redirect: '/login'
                    });
                    console.log("\x1b[32m", 'Добби: сообщение отправлено - ', '\x1b[0m', info.accepted + ', ' + info.response);
                },
                (err) => {
                    console.log("\x1b[31m", 'Добби: сообщение не отправлено - ', '\x1b[0m', info.accepted + ', ' + info.response);
                    console.log(err);
                });

    }

    function errorH(err) {
        res.render('error', {
            err: err
        })
    }



});

module.exports = router;