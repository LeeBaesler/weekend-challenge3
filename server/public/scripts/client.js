$(document).ready(function(){
    console.log('jQuery sourced.');
  });

//add tasks to postgres database
function addtask(tasksToAdd) {
    $.ajax({
        type:'POST',
        url: 'tasks',
        data: tasksToAdd,
    }).then(function(response){
        console.log('Response from server.', response);
        refreshTasks();
    }).catch(function(error){
        console.log('Error in POST', error)
        alert('Unable to add task at this time. P{lease try again laster.');
    });
    }


// post tasks from server and display on page
function refreshTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then (function(response){
        console.log(response);
        fetchTasks(response);
    }).catch(function(error){
        console.log('error in GET', error);
    });
    }


  //display tasks to DOM
  function fetchTasks(tasks) {
    $('#taskList').empty();

    for(let i = 0; i < tasks.length; i += 1) {
        let tasks = tasks[i];
    // append new task to the DOM 
    $('#taskList').append(`
    <tr>
        <td>${tasks.creator}</td>
        <td>${tasks.date_created}</td>
        <td> ${tasks.task}</td>
        <td>
          ${tasks.completed ? 'yes' : 'no'}
          <button class='task-button'
            data-tasksid='${tasks.id}'
          >${tasks.completed ? 'Mark unread' : 'Mark read'}</button>
      </td>
        <td>
          <button 
            class='delete-button'
            data-tasksid='${tasks.id}'
          >delete</button>
      </tr>
    `);
    console.log("hello", tasks);
  }
}