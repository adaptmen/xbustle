var sha1 = require('sha1');
var nodemailer = require('nodemailer');
var fs = require('fs');
var emailConfig = require('../config/config.json').email.gmail;
var smtpTransport = require('nodemailer-smtp-transport');

var dobby = () => {

    var sendMail = (email, name, password) => {

        let trans = nodemailer.createTransport(emailConfig);

        let options = {
            to: email,
            subject: "XBustle - регистрация",
            html: generateMailHtml(email, name, password)
        };

        let generateMailHtml = function (email, name, password) {
            let html_file = fs.readFileSync('./views/mail.html', 'utf-8').replace('{login}', email)
                .replace('{name}', name)
                .replace('{password}', password);

            console.log(html_file);

            return html_file

        };

        return new Promise((resolve, reject) => {
            trans.sendMail(options, (err, info) => {
                err ? reject(err) : resolve(info)
            });
        });

    };



    var sendNotify = {
        self: (socketContext, eventName, data, period) => {
            setInterval(() => {
                socketContext.send.self(eventName, data)
            }, period);
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