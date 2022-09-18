$(document).ready(function(){
    console.log('jQuery sourced.');
    refreshTasks();
    addClickHandlers()
  });

  function addClickHandlers() {
    $('#submitBtn').on('click', submitButton);
    $('#taskList').on('click', '.delete-button', deleteButton);
    $('#taskList').on('click', '.tasks-button', handleTasks);
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
  function fetchTasks(animal) {
    $('#taskList').empty();

    for(let i = 0; i < animal.length; i += 1) {
        let animal = tasks[i];
    // append new task to the DOM 
    $('#taskList').append(`
    <tr data-tasksid = ${animal.id}>
    <td>${animal.creator}</td>
    <td>${animal.date_created}</td>
    <td> ${animal.task}</td>
        <td>
          ${animal.completed ? 'yes' : 'no'}
          <button class='task-button'
            data-tasksid='${animal.id}'
          >${animal.completed ? 'Mark unread' : 'Mark read'}</button>
      </td>
        <td>
          <button 
            class='delete-button'
            data-tasksid='${animal.id}'
          >delete</button>
      </tr>
    `);
    console.log("hello", animal);
  }
}