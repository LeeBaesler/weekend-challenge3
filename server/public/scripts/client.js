$(document).ready(function(){
    console.log('jQuery sourced.');
    refreshTasks();
    addClickHandlers();
  });

  function addClickHandlers() {
    $('#submitBtn').on('click', submitButton);
    $('#taskList').on('click', '.delete-button', deleteButton);
    $('#taskList').on('click', '.task-button', handleTasks);
  }

  
  function handleTasks(event) {
     // ask the button for the tasks id
    const tasksid = $(event.target).data('tasksid');
    $.ajax({
      method: 'PUT',
      url: `/tasks/${tasksid}`
    }).then(() => {
      refreshTasks()
    }).catch(err => {
      console.log(err)
    });
  }


  //delete on specific button clicked which will have id of
  //the book that we want to delete. 
  function deleteButton(event){
    const tasksid = $(event.target).data('tasksid');
    $.ajax ({
        method: 'DELETE',
        url: `/tasks/${tasksid}`
    }).then(()=>{
    refreshTasks()
    }).catch(err =>{
        console.log(err)
    })
    }

  function submitButton(){
    console.log('submit button clicked.');
    let tasks = {};
    tasks.creator = $("#creator").val();
    tasks.date_created = $("#date_created").val();
    tasks.task = $("#task").val();
    addTask(tasks);
  }

//add tasks to postgres database
function addTask(tasksToAdd) {
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
        let task = tasks[i];

      
      console.log(task.completed)
    // append new task to the DOM 
    $('#taskList').append(`
    <tr data-tasksid = ${task.id}>
    <td>${task.creator}</td>
    <td>${task.date_created}</td>
    <td> ${task.task}</td>
        <td>
          <button class='task-button'
            data-tasksid='${task.id}'
          >${task.completed ? 'Finished' : 'Unfinished'}</button>
      </td>
        <td>
          <button 
            class='delete-button'
            data-tasksid='${task.id}'
          >delete</button>
      </tr>
    `);
    console.log("hello", task);
  }
  if (task.completed === false){
    $('#tastList').css('background-color', 'red')
  } else {
    $('#tastList').css('background-color', 'orange')
  }
}
