// Load todos from localStorage when page loads
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Initialize the app
function init() {
    renderTodos();
    updateTaskCount();
}

// Add new todo
function addTodo() {
    const input = document.getElementById('todoInput');
    const dateInput = document.getElementById('todoDate');
    const priority = document.getElementById('priority');
    
    if (input.value.trim() !== '') {
        const todo = {
            id: Date.now(),
            text: input.value,
            date: dateInput.value,
            priority: priority.value,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        todos.unshift(todo); // Add to beginning of array
        saveTodos();
        renderTodos();
        updateTaskCount();
        
        // Clear inputs
        input.value = '';
        dateInput.value = '';
        priority.value = 'low';
    }
}

// Toggle todo completion status
function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    
    saveTodos();
    renderTodos();
    updateTaskCount();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
    updateTaskCount();
}

// Clear completed todos
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
    updateTaskCount();
}

// Filter todos
function filterTodos(filter) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`button[onclick="filterTodos('${filter}')"]`).classList.add('active');
    
    // Filter todos
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    let filteredTodos = todos;
    if (filter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }
    
    renderTodoList(filteredTodos);
}

// Render todos
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    renderTodoList(todos);
}

// Render todo list
function renderTodoList(todosToRender) {
    const todoList = document.getElementById('todoList');
    
    todosToRender.forEach(todo => {
        const li = document.createElement('li');
        li.className = `priority-${todo.priority} ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                onclick="toggleComplete(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            ${todo.date ? `<span class="date">Due: ${todo.date}</span>` : ''}
            <span class="priority-badge">${todo.priority}</span>
            <button onclick="deleteTodo(${todo.id})" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        todoList.appendChild(li);
    });
}

// Update task count
function updateTaskCount() {
    const count = todos.length;
    const activeCount = todos.filter(todo => !todo.completed).length;
    document.getElementById('taskCount').textContent = 
        `${activeCount} active / ${count} total tasks`;
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Initialize the app when page loads
window.onload = init;

// Add keyboard shortcut for adding todos
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});