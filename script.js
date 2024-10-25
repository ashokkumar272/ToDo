const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('taskButton');
const taskList = document.getElementById('taskList');
let liArray = [];

// Function to save the task list to local storage
function saveListToLocalStorage() {
    const taskContents = liArray.map(task => ({
        text: task.querySelector('.taskText').textContent,
        completed: task.querySelector('.taskText').style.textDecoration === "line-through"
    }));
    localStorage.setItem("tasks", JSON.stringify(taskContents));
}

// Function to create and append a task item
const addTask = function(text = '', completed = false) {
    const taskText = text || taskInput.value.trim(); 

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

    if (completed) taskSpan.style.textDecoration = "line-through";

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

    saveListToLocalStorage();  // Save the updated list
    checkForPendingTasks();
};

function markTask(x, y) {
    const text = x.style.textDecoration;
    if (text !== 'line-through') {
        x.style.textDecoration = "line-through";
        y.style.backgroundColor = "#2d3748d6";
    } else {
        x.style.textDecoration = "none";
        y.style.backgroundColor = "inherit";
    }
    saveListToLocalStorage();  // Save the updated list
}

function editTask(li, taskSpan) {
    const newText = prompt('Edit your task:', taskSpan.textContent);
    if (newText !== null && newText.trim() !== '') {
        taskSpan.textContent = newText.trim();
        saveListToLocalStorage();  // Save the updated list
    }
}

function deleteTask(li) {
    liArray = liArray.filter(task => task !== li);  // Remove from the array
    li.remove();
    saveListToLocalStorage();  // Save the updated list
    checkForPendingTasks();
}


// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        for (const task of storedTasks) {
            addTask(task.text, task.completed);
        }
    }
    taskInput.focus();
    checkForPendingTasks();
});

// Event listeners for menu interactions
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

// Filters for showing tasks
const showAll = document.getElementById('all');
const showCompleted = document.getElementById('completed');
const showIncomplete = document.getElementById('incomplete');

showAll.addEventListener('click', () => {
    liArray.forEach(task => task.style.display = "flex");
    menuList.style.display = "none";
});

showCompleted.addEventListener('click', () => {
    liArray.forEach(task => {
        const text = task.querySelector('.taskText');
        task.style.display = text && text.style.textDecoration === "line-through" ? "flex" : "none";
    });
    menuList.style.display = "none";
});

showIncomplete.addEventListener('click', () => {
    liArray.forEach(task => {
        const text = task.querySelector('.taskText');
        task.style.display = text && text.style.textDecoration === "line-through" ? "none" : "flex";
    });
    menuList.style.display = "none";
});

taskButton.addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});


function checkForPendingTasks() {
    if (liArray.length === 0) {
        taskList.innerHTML = "<p class='emptyMsg'>No tasks pending....</p>";
    } else {
        const emptyMsg = taskList.querySelector('.emptyMsg');
        if (emptyMsg) {
            emptyMsg.remove();  // Remove the message if there are tasks
        }
    }
}
