var express = require('express');
var router = express.Router();
var session = require('express-session');
var Cookies = require('cookies');
var dbScript = require("../db/dbscript.js");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var sha1 = require('sha1');
var db = require("../core/db")();

router.get('(/|/login)', function (req, res) {
    res.render('login');

});

router.post('/login', urlencodedParser, function (req, res) {
    let cookie = new Cookies(req, res);

    var username = req.body.username;
    var password = req.body.password;

    db.table('users').where({
        name: username,
        password: password
    }).get().then((result) => {
        if (result.length != 0) {
            cookie
                .set('token', result[0]["token"], {
                    expires: new Date(2019, 0, 1)
                });

            res.send({
                redirect: '/user'
            });
        }
    }, (err) => {
        res.render('login', {
            msg: err
        });
    });
});

router.get('/logout', function (req, res) {
    let cookie = new Cookies(req, res);
    cookie
        .set('token', '');
    return res.redirect('/login');
});

module.exports = router;