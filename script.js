const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('taskButton');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim(); 
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const li = document.createElement('li');
    li.className = 'taskItem';
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.className = 'taskText';

    const buttons = document.createElement('span');
    buttons.className = 'FuncBtn';


    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.className = 'editBtn';
    
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-check"></i>';
    deleteButton.className = 'deleteBtn';

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    li.appendChild(taskSpan);
    li.appendChild(buttons);
    
    
    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();

    editButton.addEventListener('click', () => editTask(li, taskSpan));
    deleteButton.addEventListener('click', () => deleteTask(li));
}

function editTask(li, taskSpan) {
    const newText = prompt('Edit your task:', taskSpan.textContent);
    
    if (newText !== null && newText.trim() !== '') {
        taskSpan.textContent = newText.trim();
    }
}

function deleteTask(li) {
    li.style.textDecoration = "line-through";
    deleteButton.style.backgroundColor = "black";
}

taskButton.addEventListener('click', function (e) {
    e.preventDefault(); 
    addTask(); 
});

document.addEventListener('DOMContentLoaded', ()=>{
    taskInput.focus();
});
