const fetchTodos = () => {
  return fetch("https://jsonplaceholder.typicode.com/todos");
};

const logFetchTodos = () => console.log(fetchTodos());

const logTodos = () => {
  fetchTodos()
    .then((res) => res.json())
    .then((json) => console.log(json));
};

const populateTodos = () => {
  fetchTodos()
    .then((res) => res.json())
    .then((todos) => {
      todos.forEach((currentElement, index) => {
        const title = todos[index]["title"];
        const list = document.getElementById("todo-list");
        const newListItem = document.createElement("li");
        const newTitle = document.createTextNode(title);
        newListItem.appendChild(newTitle);
        list.appendChild(newListItem);
      });
    });
};

const filterTodos = () => {
  clearTodos()

  fetchTodos()
    .then((res) => res.json())
    .then((todos) => {
      const userId = document.getElementById("user-id").valueAsNumber;
      console.log(userId);
      let filteredList = [];
      todos.forEach((currentElement, index) => {
        
        if (todos[index]["userId"] === userId) {
          const title = todos[index]["title"];
          const user = todos[index]["userId"];
          const list = document.getElementById("todo-list");
          const newListItem = document.createElement("li");
          const newUser = document.createTextNode(`user: ${user} - `);
          const newTitle = document.createTextNode(title);
          newListItem.appendChild(newUser);
          newListItem.appendChild(newTitle);
          list.appendChild(newListItem);
          filteredList.push(todos[index]);
        }
      });
      console.log(filteredList);
    });

};

const clearTodos = () => {
  const list = document.getElementById("todo-list");
  list.remove();

  const todoSection = document.getElementById("todo-section");
  const newOL = Object.assign(document.createElement("ol"),{id:"todo-list"});
  todoSection.appendChild(newOL)
}
