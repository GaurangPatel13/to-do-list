document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');
    const todoList = document.getElementById('todo-list');
  
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoElement(todo));
  
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newTodo = {
        text: todoInput.value,
        date: todoDate.value,
        completed: false
      };
      todos.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(todos));
      addTodoElement(newTodo);
      todoInput.value = '';
      todoDate.value = '';
    });
  
    function addTodoElement(todo) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${todo.text}</span>
        <span>${todo.date}</span>
        <button class="complete">${todo.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete">Delete</button>
      `;
  
      if (todo.completed) {
        li.classList.add('completed');
      }
  
      const completeButton = li.querySelector('.complete');
      completeButton.addEventListener('click', () => {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        li.classList.toggle('completed');
        completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
      });
  
      const deleteButton = li.querySelector('.delete');
      deleteButton.addEventListener('click', () => {
        todos = todos.filter(t => t !== todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        li.remove();
      });
  
      todoList.appendChild(li);
    }
  });
  