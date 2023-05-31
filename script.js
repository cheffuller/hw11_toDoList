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
