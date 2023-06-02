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
  fetchTodos()
    .then((res) => res.json())
    .then((todos) => {
      const userId = document.getElementById("user-id").value;
      console.log(userId);
      let filteredList = [];
      todos.forEach((currentElement, index) => {
        
        if (todos[index]["userId"] == userId) {
          const user = todos[index]["userId"];
          console.log(user);
        }
      });
      // console.log(filteredList);
    });
  // console.log(listOfTodos);
};

// console.log(listOfTodos());

// const userId = document.getElementById("user-id");
// const filteredList = listOfTodos.filter((id) => (id = userId));
