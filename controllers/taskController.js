var express = require('express');
var router = express.Router();
var db = require('../core/db')();
var Cookies = require('cookies');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});


router.get('/task/add', (req, res) => {
    return res.render('task/add')
});


router.post('/task/add', urlencodedParser, (req, res) => {

    let task = req.body.task; //as Object (task: { start: ..., end: ... })


    // Validator must be here


    db.table('tasks').insert(task).then(result => res.send('Задача успешно сохранена'),
        err => res.send('Задача не сохранена!'));

});


router.get('/task/from-user/:user_id', (req, res) => {
    
    //Simple validate
    
    let token = (new Cookies(req, res)).get('token');
    let user_id = req.params.user_id;

    db.table('users').where({
            token: token,
            userNum: user_id
        })
        .get()
        .then((result) => {
            if (!result[0])
                return res.send('Access denied');

            db.table('task').where({
                    executer: user_id
                })
                .get()
                .then((tasks) => { return res.send(tasks) },
                     (err) => { return res.send(err) });

        });
});

router.post('/task/update/:task_id', (req, res) => {
    
    let task_id = req.params.task_id;
    let new_task = req.body.task;
    
    //Validator must be here!!!
    
    
    db.table('tasks').where({taskNum: task_id}).set(new_task).update().then((result) => {
        return res.send('Результат выполнения: ' + result)
    });
});

module.exports = router;