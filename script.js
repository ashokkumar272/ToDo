const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('taskButton');
const taskList = document.getElementById('taskList');
let liArray = [];

// Function to save the task list to local storage
function saveListToLocalStorage() {
    let taskContents = liArray.map(task => {
        const taskText = task.querySelector('.taskText');
        const markBtn = task.querySelector('.markBtn');  // Access markBtn correctly
        return {
            text: taskText.textContent,
            completed: taskText.style.textDecoration === "line-through",
            markColor: markBtn.style.backgroundColor  // Save markBtn's background color
        };
    });
    localStorage.setItem("tasks", JSON.stringify(taskContents));
}

// Function to create and append a task item
const addTask = function(text = '', completed = false, markColor = 'inherit') {  // Added markColor parameter
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

    if (completed) taskSpan.style.textDecoration = "line-through";  // Apply line-through if completed

    const buttons = document.createElement('span');
    buttons.className = 'FuncBtn';

    const markButton = document.createElement('button');
    markButton.innerHTML = '<i class="fas fa-check"></i>';
    markButton.className = 'markBtn';
    markButton.style.backgroundColor = markColor;  // Apply markColor from local storage

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

    // Event listeners for task actions
    taskSpan.addEventListener('click', () => editTask(li, taskSpan));
    deleteButton.addEventListener('click', () => deleteTask(li));
    markButton.addEventListener('click', () => markTask(taskSpan, markButton));

    saveListToLocalStorage();  // Save the updated list
    checkForPendingTasks();
};

// Function to mark a task as completed or uncompleted
function markTask(taskSpan, markButton) {
    const textDecoration = taskSpan.style.textDecoration;
    if (textDecoration !== 'line-through') {
        taskSpan.style.textDecoration = "line-through";
        markButton.style.backgroundColor = "#2d3748d6";  // Set background for marked task
    } else {
        taskSpan.style.textDecoration = "none";
        markButton.style.backgroundColor = "inherit";  // Reset background for unmarked task
    }
    saveListToLocalStorage();  // Save the updated list
}

// Function to edit a task
function editTask(li, taskSpan) {
    const newText = prompt('Edit your task:', taskSpan.textContent);
    if (newText !== null && newText.trim() !== '') {
        taskSpan.textContent = newText.trim();
        saveListToLocalStorage();  // Save the updated list
    }
}

// Function to delete a task
function deleteTask(li) {
    liArray = liArray.filter(task => task !== li);  // Remove task from the array
    li.remove();
    saveListToLocalStorage();  // Save the updated list
    checkForPendingTasks();
}

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        for (const task of storedTasks) {
            addTask(task.text, task.completed, task.markColor);  // Pass markColor to addTask
        }
    }
    taskInput.focus();
    checkForPendingTasks();
});

// Menu interactions
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

// Task filters
const showAll = document.getElementById('all');
const showCompleted = document.getElementById('completed');
const showIncomplete = document.getElementById('incomplete');

showAll.addEventListener('click', () => {
    liArray.forEach(task => task.style.display = "flex");
    menuList.style.display = "none";  // Hide dropdown menu
});

showCompleted.addEventListener('click', () => {
    liArray.forEach(task => {
        const text = task.querySelector('.taskText');
        task.style.display = text && text.style.textDecoration === "line-through" ? "flex" : "none";
    });
    menuList.style.display = "none";  // Hide dropdown menu
});

showIncomplete.addEventListener('click', () => {
    liArray.forEach(task => {
        const text = task.querySelector('.taskText');
        task.style.display = text && text.style.textDecoration === "line-through" ? "none" : "flex";
    });
    menuList.style.display = "none";  // Hide dropdown menu
});

taskButton.addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

// Function to check for pending tasks
function checkForPendingTasks() {
    if (liArray.length === 0) {
        taskList.innerHTML = "<p class='emptyMsg'>No tasks pending....</p>";
    } else {
        const emptyMsg = taskList.querySelector('.emptyMsg');
        if (emptyMsg) {
            emptyMsg.remove();  // Remove message if tasks are present
        }
    }
}
