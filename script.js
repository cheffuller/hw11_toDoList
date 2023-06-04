const fetchTodos = () => {
  return fetch("https://jsonplaceholder.typicode.com/todos");
};

const logFetchTodos = () => console.log(fetchTodos());

const logTodos = () => {
  fetchTodos()
    .then((res) => res.json())
    .then((json) => console.log(json));
};

const writeTodos = (todos, index, list) => {
  const user = todos[index]["userId"];
  const completed = todos[index]["completed"];
  const title = todos[index]["title"];
  if (typeof list === "undefined") {
    list = document.getElementById("todo-list");
  }
  const newListItem = document.createElement("li");
  const newUser = document.createTextNode(`user: ${user} - `);
  const newCheckBox = document.createElement("input");
  newCheckBox.type = "checkbox";
  newCheckBox.checked = completed;
  const newTitle = document.createTextNode(` - ${title}`);
  newListItem.appendChild(newUser);
  newListItem.appendChild(newCheckBox);
  newListItem.appendChild(newTitle);
  list.appendChild(newListItem);
};

const populateTodos = () => {
  clearTodos();
  clearButtons();
  fetchTodos()
    .then((res) => res.json())
    .then((todos) => {
      todos.forEach((currentElement, index) => {
        writeTodos(todos, index);
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
        writeTodos(filteredList, index);
      }
    });
  };

  const incompleteTodos = () => {
    clearTodos();
    filteredList.forEach((currentElement, index) => {
      if (filteredList[index]["completed"] === false) {
        writeTodos(filteredList, index);
      }
    });
  };

  const twoColumnTodos = () => {
    clearTodos();
    const list = document.getElementById("todo-list-two");
    filteredList.forEach((currentElement, index) => {
      if (filteredList[index]["completed"] === true) {
        writeTodos(filteredList, index);
      } else {
        writeTodos(filteredList, index, list);
      }
    });
  };

  fetchTodos()
    .then((res) => res.json())
    .then((todos) => {
      const userId = document.getElementById("user-id").valueAsNumber;
      if (isNaN(userId)) {
        alert("Please enter a number between 1 and 10");
        return;
      }

      filteredList = todos.filter(index => {
        return index.userId === userId;
      });
    
      filteredList.forEach((currentElement, index) => {
        writeTodos(filteredList, index);
      })

      // todos.forEach((currentElement, index) => {
      //   if (todos[index]["userId"] === userId) {
      //     writeTodos(todos, index);
      //     filteredList.push(todos[index]);
      //   }
      // });

      const newCompletedButton = document.createElement("button");
      newCompletedButton.onclick = completedTodos;
      const newCompletedText = document.createTextNode("Completed Todos");
      newCompletedButton.appendChild(newCompletedText);

      const newIncompleteButton = document.createElement("button");
      newIncompleteButton.onclick = incompleteTodos;
      const newIncompleteText = document.createTextNode("Incomplete Todos");
      newIncompleteButton.appendChild(newIncompleteText);

      const twoColumnButton = document.createElement("button");
      twoColumnButton.onclick = twoColumnTodos;
      const twoColumnText = document.createTextNode("Two Column Todos");
      twoColumnButton.appendChild(twoColumnText);

      const newButtons = document.getElementById("new-button-section");
      newButtons.appendChild(newCompletedButton);
      newButtons.appendChild(newIncompleteButton);
      newButtons.appendChild(twoColumnButton);
    });
};

const clearTodos = () => {
  const listOne = document.getElementById("todo-list");
  const listTwo = document.getElementById("todo-list-two");
  listOne.innerHTML = null;
  listTwo.innerHTML = null;
};

const clearButtons = () => {
  const newButtons = document.getElementById("new-button-section");
  newButtons.innerHTML = null;
};