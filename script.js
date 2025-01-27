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
        
        // Add animation class
        const list = document.getElementById('todoList');
        const li = document.createElement('li');
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        
        todos.unshift(todo);
        saveTodos();
        renderTodos();
        updateTaskCount();
        
        // Clear inputs
        input.value = '';
        dateInput.value = '';
        priority.value = 'low';
        
        // Focus back on input
        input.focus();
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

// Delete todo with animation
function deleteTodo(id) {
    const element = document.querySelector(`li[data-id="${id}"]`);
    element.style.opacity = '0';
    element.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
        updateTaskCount();
    }, 300);
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
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`button[onclick="filterTodos('${filter}')"]`).classList.add('active');
    
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
        li.setAttribute('data-id', todo.id);
        li.className = `${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                onclick="toggleComplete(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            ${todo.date ? `<span class="date">${formatDate(todo.date)}</span>` : ''}
            <span class="priority-badge priority-${todo.priority}">${todo.priority}</span>
            <button onclick="deleteTodo(${todo.id})" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        // Add animation
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        todoList.appendChild(li);
        
        // Trigger animation
        setTimeout(() => {
            li.style.opacity = '1';
            li.style.transform = 'translateX(0)';
        }, 50);
    });
}

// Format date
function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Update task count
function updateTaskCount() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    const totalCount = todos.length;
    document.getElementById('taskCount').textContent = 
        `${activeCount} active / ${totalCount} total`;
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