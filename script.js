const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('taskButton');
const taskList = document.getElementById('taskList');
let liArray = [];

const addTask = function() {
    const taskText = taskInput.value.trim(); 
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const li = document.createElement('li');
    li.className = 'taskItem';
    liArray.push(li);
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.className = 'taskText';

    const buttons = document.createElement('span');
    buttons.className = 'FuncBtn';


    const markButton = document.createElement('button');
    markButton.innerHTML = '<i class="fas fa-check"></i>';
    markButton.className = 'markBtn';


    
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = 'deleteBtn';

    buttons.appendChild(markButton);
    buttons.appendChild(deleteButton);
    li.appendChild(taskSpan);
    li.appendChild(buttons);
    
    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();

    taskSpan.addEventListener('click', () => editTask(li, taskSpan));
    deleteButton.addEventListener('click', () => deleteTask(li));
    markButton.addEventListener('click', () => markTask(taskSpan, markButton));
}
function markTask(x, y){
    const text = x.style.textDecoration;
    if(text !== 'line-through')
    {
    x.style.textDecoration = "line-through";
    y.style.backgroundColor = "#2d3748d6";
    }
    else{
        x.style.textDecoration = "none";
        y.style.backgroundColor = "inherit";
    }

}

function editTask(li, taskSpan) {
    const newText = prompt('Edit your task:', taskSpan.textContent);
    
    if (newText !== null && newText.trim() !== '') {
        taskSpan.textContent = newText.trim();
    }
}

function deleteTask(li) {
    li.remove();
}

taskButton.addEventListener('click', function (e) {
    e.preventDefault(); 
    addTask(); 
});

document.addEventListener('DOMContentLoaded', ()=>{
    taskInput.focus();
});

const menuBtn = document.getElementById('taskbox-menubtn');
const menuList = document.getElementById('menulist');

menuBtn.addEventListener('click', () => {
    menuList.style.display = "block";
});

document.addEventListener('click', (event) => {
    if (!menuList.contains(event.target) && !menuBtn.contains(event.target)) {
        menuList.style.display = "none";
    }
});

const showAll = document.getElementById('all');
const showCompleted = document.getElementById('completed');
const showIncomplete = document.getElementById('incomplete');


showAll.addEventListener('click', ()=>{
    for (const element of liArray) {
        element.style.display = "flex";
    }
    menuList.style.display = "none";
})
showCompleted.addEventListener('click', ()=>{
    for (const element of liArray) {
        const text = element.querySelector('.taskText');
        if (text && text.style.textDecoration == "line-through") {
            element.style.display = "flex";
        }
        else{
            element.style.display = "none";
        }
    }
    menuList.style.display = "none";
})
showIncomplete.addEventListener('click', ()=>{
    for (const element of liArray) {
        const text = element.querySelector('.taskText');
        if (text && text.style.textDecoration === "line-through") {
            element.style.display = "none";
        }
        else{
            element.style.display = "flex";
        }
    }
    menuList.style.display = "none";
});

// Function to save the task list to local storage
function saveListToLocalStorage(tasks) {
    const taskContents = tasks.map(task => task.outerHTML);  // Convert each element to HTML string
    localStorage.setItem("tasks", JSON.stringify(taskContents)); // Store array of strings
}

// Save button event listener
document.querySelector("#taskbox-savebtn").addEventListener('click', () => {
    saveListToLocalStorage(liArray);
});

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        for (const taskHTML of storedTasks) {
            const taskElement = document.createElement('li');  // Temporary wrapper element
            taskElement.innerHTML = taskHTML;
            taskList.appendChild(taskElement.firstChild);  // Append the actual task element
        }
    }
});


