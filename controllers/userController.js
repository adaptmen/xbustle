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
var errorer = require("../core/error_module/error_module");

var connSockets = {
    room: '',
    clients: {}
};

var usersDict = {};

router.post('/api/user/login', (req, res) => {
	let cookie = new Cookies(req, res);
	let user = req.body.user;
    console.log(user);
	let isValidUser = user;
  
	if (isValidUser) {
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
					? (() => {
                        cookie.set('token', result[0].token);
                        res.send(errorer(200));
                      })()
					: res.send(errorer(900));
			},
			(error) => {
				res.send(errorer(700, error));
			}
		);
	}
    else {
		res.send(errorer(800));
	}			
});


router.get('/user', function (req, res) {
    var cookie = new Cookies(req, res);

    var ctx = socketContext(io);

    ctx.connect((socket) => {

        ctx._socket = socket;
        ctx.send.self('msg', socket.id);

        db
            .table('users')
            .where({
                token: cookie.get("token")
            })
            .get()
            .then((result) => {
                    console.log(result);
                    var user = result[0];
                    var roomNum = user.teamNum;

                    ctx.joinTo(roomNum);

                    var room = ctx.getRoom(roomNum);
                    var clients = room.sockets;

                    socket.username = user;

                    connSockets.room = roomNum;
                    connSockets.clients[socket.id] = {
                        room: room.id,
                        data: socket.username
                    };

                    usersDict[user.userNum] = {
                        id: socket.id,
                        name: user.name
                    };

                    ctx.send.self('complete', {
                        user: user,
                        team: usersDict
                    });

                    ctx.send.toRoom('msg', 'Пользователь ' + user.name + ' присоединён к сети');

                    ctx.listen('event', function (data) {
                        ctx.send.toSocket(data.to, 'task', data.task);
                        ctx.send.toRoomAndSelf(roomNum, 'msg', {
                            user: user.name,
                            users: usersDict
                        });
                    });

                    ctx.listen('test', function (data) {
                        ctx.send.self('test', 'Test Completed!');
                    });

                    ctx.listen('view', function (viewName) {
                        let view = () => {
                            return express().render('user', {
                                1: 1
                            })
                        };
                        ctx.send.self('view', view);
                    });

                    ctx.reconnect(function () {
                        let userNum = connSockets.clients[socket.id].userNum;
                        delete connSockets.clients[socket.id];
                        delete usersDict[userNum];
                        console.log('Переподключение сокета');
                    });

                    ctx.disconnect(function () {
                        let userNum = connSockets.clients[socket.id].userNum;
                        delete connSockets.clients[socket.id];
                        delete usersDict[userNum];
                        console.log('Отключение сокета');
                    });


                },
                (err) => {
                    console.log(err);
                });
    });

    res.render('user', {
        user: {
            name: 'denis'
        }
    });

});


module.exports = router;