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
  clearTodos();
  clearButtons();

  let filteredList = [];

  const completedTodos = () => {
    clearTodos();
    filteredList.forEach((currentElement, index) => {
      if (filteredList[index]["completed"] === true) {
        const title = filteredList[index]["title"];
        const user = filteredList[index]["userId"];
        const list = document.getElementById("todo-list");
        const newListItem = document.createElement("li");
        const newUser = document.createTextNode(`user: ${user} - `);
        const newTitle = document.createTextNode(title);
        newListItem.appendChild(newUser);
        newListItem.appendChild(newTitle);
        list.appendChild(newListItem);
      }
    });
  };

  const incompleteTodos = () => {
    clearTodos();
    filteredList.forEach((currentElement, index) => {
      if (filteredList[index]["completed"] === false) {
        const title = filteredList[index]["title"];
        const user = filteredList[index]["userId"];
        const list = document.getElementById("todo-list");
        const newListItem = document.createElement("li");
        const newUser = document.createTextNode(`user: ${user} - `);
        const newTitle = document.createTextNode(title);
        newListItem.appendChild(newUser);
        newListItem.appendChild(newTitle);
        list.appendChild(newListItem);
      }
    });
  };

  fetchTodos()
    .then((res) => res.json())
    .then((todos) => {
      const userId = document.getElementById("user-id").valueAsNumber;
      console.log(userId);

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



      const newCompletedButton = document.createElement("button");
      newCompletedButton.onclick = completedTodos;

      const newIncompleteButton = document.createElement("button");
      newIncompleteButton.onclick = incompleteTodos;
      

      const newCompletedText = document.createTextNode("Completed Todos");
      newCompletedButton.appendChild(newCompletedText);
      const newIncompleteText = document.createTextNode("Incomplete Todos");
      newIncompleteButton.appendChild(newIncompleteText);
      const newButtons = document.getElementById("new-button-section");
      newButtons.appendChild(newCompletedButton);
      newButtons.appendChild(newIncompleteButton);
    });
};

const clearTodos = () => {
  const list = document.getElementById("todo-list");
  list.innerHTML = null;
};

const clearButtons = () => {
  const newButtons = document.getElementById("new-button-section");
  newButtons.innerHTML = null;
};
