var nodemailer = require('nodemailer');
var fs = require('fs');
var emailConfig = require('../config/config.json').email.gmail;
var smtpTransport = require('nodemailer-smtp-transport');

var dobby = () => {

    var sendMail = (email, name, password) => {

        let transport = nodemailer.createTransport(emailConfig);

        let options = {
            to: email,
            subject: "XBustle - регистрация",
            html: generateMailHtml(email, name, password)
        };

        let generateMailHtml = (email, name, password) => {
            return fs.readFileSync('./views/mail.html', 'utf-8').replace('{login}', email)
                .replace('{name}', name)
                .replace('{password}', password);
        };

        return new Promise((resolve, reject) => {
            transport.sendMail(options, (err, info) => {
                err ? reject(err) : resolve(info)
            });
        });

    };



    var sendNotify = {
        self: (socketContext, eventName, data) => {
            socketContext.send.self(eventName, data)
        },

        toRoom: (socketContext, roomId, eventName, data) => {
            socketContext.send.toRoom(roomId, eventName, data)
        },

        toSocket: (socketContext, socketId, eventName, data) => {
            socketContext.send.toSocket(socketId, eventName, data)
        }
    };


    return {
        sendMail: sendMail,
        sendNotify: sendNotify
    }
}

module.exports = dobby;