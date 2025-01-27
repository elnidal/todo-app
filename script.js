function addTodo() {
    // Get the input and list elements
    const input = document.getElementById('todoInput');
    const list = document.getElementById('todoList');
    
    // Check if input has a value
    if (input.value.trim() !== '') {
        // Create new list item
        const li = document.createElement('li');
        
        // Create text node
        const textNode = document.createTextNode(input.value);
        
        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            list.removeChild(li);
        };
        
        // Add text and button to list item
        li.appendChild(textNode);
        li.appendChild(deleteButton);
        
        // Add list item to list
        list.appendChild(li);
        
        // Clear input
        input.value = '';
    }
}