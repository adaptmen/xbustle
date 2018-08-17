var express = require('express');
var router = express.Router();
var db = require('../core/db')();
var userService = require('../core/user-service');
var Cookies = require('cookies');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var sendy = require('../core/sendy/sendy.js');


router.post('/api/tasks/add', urlencodedParser, (req, res) => {
    let task = req.body.task;
    task.maker = userService.currentUser.userNum;
    db.table('tasks').params(task).insert().then(
      result => res.send(sendy('task_saved')),
      err => res.send(sendy('task_not_saved'))
    );

});

router.post('/task/update/:task_id', (req, res) => {
    
    let task_id = req.params.task_id;
    let new_task = req.body.task;    
    
    db.table('tasks').where({taskNum: task_id}).set(new_task).update().then(
      result => res.send(sendy('task_updated'))
    );
});

module.exports = router;