var express = require('express');
var router = express.Router();
var db = require('../core/db')();
var Cookies = require('cookies');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});


router.post('/tasks/add', urlencodedParser, (req, res) => {
    let task = req.body.task;
  
    db.table('tasks').insert(task).then(
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