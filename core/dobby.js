var nodemailer = require('nodemailer');
var fs = require('fs');
var emailConfig = require('../config/config.json').email.gmail;
var smtpTransport = require('nodemailer-smtp-transport');

var dobby = {

    sendMail: (email, name, password) => {

        let transport = nodemailer.createTransport(emailConfig);


        function generateMailHtml (email, name, password) {
            return fs.readFileSync('./views/mail.html', 'utf-8').replace('{login}', email)
                .replace('{name}', name)
                .replace('{password}', password);
        };

        let options = {
            to: email,
            subject: "XBustle - регистрация",
            html: generateMailHtml(email, name, password)
        };
      
        return new Promise((resolve, reject) => {
            transport.sendMail(options, (err, info) => {
                err ? reject(err) : resolve(info)
            });
        });

    },

    sendNotify: {
        self: (socketContext, eventName, data) => {
            socketContext.send.self(eventName, data)
        },

        toRoom: (socketContext, roomId, eventName, data) => {
            socketContext.send.toRoom(roomId, eventName, data)
        },

        toSocket: (socketContext, socketId, eventName, data) => {
            socketContext.send.toSocket(socketId, eventName, data)
        }
    }
  
}

module.exports = dobby;