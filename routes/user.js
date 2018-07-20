var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var Cookies = require('cookies');
var dbScript = require("../db/dbscript.js");
var socketContext = require('../core/socket');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var sha1 = require('sha1');
var sqlGen = require('../db/sqlGenerator');
var io = require('socket.io').listen(4000);
var db = require("../core/db")();

var connSockets = {
    room: '',
    clients: {}
};

var usersDict = {};


router.get('/user', function (req, res) {
    var cookie = new Cookies(req, res);
    
    var ctx = socketContext(io);

    ctx.connect((socket) => {
        db.table('users').where({
                token: cookie.get("token")
            }).get()
            .then((result) => {
                
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
            (err) => {});
    });
    
    res.render('user', {user: {name: 'denis'}});
    
});


module.exports = router;