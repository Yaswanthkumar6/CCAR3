const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        // giving the original text to editLocalTodos before editing
        editLocalTodos(editTodo.target.closest('li').querySelector('p').innerHTML);
        editTodo.target.closest('li').querySelector('p').innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    } else {
        // li and p tag
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        // Delete Icon
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        // Edit Icon
        const editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}

// Function to update todo
const updateTodo = (e) => {
    const targetBtn = e.target.closest('button');  

    if (!targetBtn) return;  
    const li = targetBtn.parentElement;

    if (targetBtn.classList.contains('deleteBtn')) {
        li.classList.add('completed');

        setTimeout(()=>{
            todoList.removeChild(li);
            deleteLocalTodos(li);
        },1000);
         
    }

    if (targetBtn.classList.contains('editBtn')) {
        inputBox.value = li.querySelector('p').innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = { target: targetBtn };
    }
}

// Function to save local todo
const saveLocalTodos = (todo) => {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get local todo
const getLocalTodos = () => {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

    todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = todo;
        li.appendChild(p);

        const editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

// Function to delete local todo
const deleteLocalTodos = (todo) => {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const todoText = todo.querySelector('p').innerHTML;
    const todoIndex = todos.indexOf(todoText);
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    const todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
