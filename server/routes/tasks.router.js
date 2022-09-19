const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// get tasks from postgres library 
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});


// adds new tasks to task list 
//req.body is a task object with creator, date created, notes on task
// and it completed (boolean)
router.post('/', (req,res) => {
    let newTask = req.body;
    console.log('Adding tasks', newTask);

    let queryText = `INSERT INTO "tasks" ("creator", "date_created", "task")
                    VALUES ($1, $2, $3);`;
    pool.query(queryText, [newTask.creator, newTask.date_created, newTask.task])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding new task`, error);
            res.sendStatus(500)
        });
});

router.delete('/:taskid', (req,res)=> {
    const taskid = req.params.taskid;

    const queryText = `DELETE FROM "tasks" WHERE id=$1;`;
    pool.query(queryText, [taskid])
    .then(() => {
        res.sendStatus(204)
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
     });
});

router.put('/:taskid', (req, res)=> {
    const taskid = req.params.taskid;

    const queryText = `UPDATE "tasks" SET "completed" = (NOT "completed") WHERE id=$1 RETURNING *;`;
    pool.query(queryText, [taskid])
    .then((response) => {
    res.send(response.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    });
});

module.exports = router;


