const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));

// static files 
app.use(express.static('server/public'));

const tasksRouter = require('./routes/tasks.router.js');
app.use('/tasks', tasksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log('listening on port', PORT);
});