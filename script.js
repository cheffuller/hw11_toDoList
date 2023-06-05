// This function fetches the array of objects fom the API
const fetchTodos = () => {
  return fetch("https://jsonplaceholder.typicode.com/todos");
};

// This function logs the response from the fetch command to the console
const logFetchTodos = () => console.log(fetchTodos());

// This function logs the array to the console
const logTodos = () => {
  returnTodos.then((todos) => {
    console.log(todos);
  });
};

// This variable returns the value of the array when called
const returnTodos = fetchTodos()
  .then((res) => res.json())
  .then((todos) => {
    return todos;
  });

// This function writes the todos to the webpage
const writeTodos = (todos, index, list) => {
  // This if statement allows for a two-column list when needed but defaults to writing to a single
  // column if the second column isn't specified
  if (typeof list === "undefined") {
    list = document.getElementById("todo-list");
  }

  // This section creates and writes the list elements to the html
  const newListItem = document.createElement("li");
  const newCheckBox = document.createElement("input");
  newCheckBox.type = "checkbox";
  newCheckBox.checked = todos[index].completed;
  const newUser = document.createTextNode(`user: ${todos[index].userId} - `);
  const newTitle = document.createTextNode(` - ${todos[index].title}`);
  newListItem.appendChild(newUser);
  newListItem.appendChild(newCheckBox);
  newListItem.appendChild(newTitle);
  list.appendChild(newListItem);
};

// This function writes all the todos in the json
const populateTodos = () => {
  clearTodos();
  clearButtons();
  returnTodos.then((todos) => {
    todos.forEach((currentElement, index) => {
      writeTodos(todos, index);
    });
  });
};

// This function writes the userId sorted todos that have a completed value of true
const completedTodos = (filteredList) => {
  clearTodos();
  filteredList.forEach((currentElement, index) => {
    if (filteredList[index].completed === true) {
      writeTodos(filteredList, index);
    }
  });
};

// This function writes the userId sorted todos that have a completed value of false
const incompleteTodos = (filteredList) => {
  clearTodos();
  filteredList.forEach((currentElement, index) => {
    if (filteredList[index].completed === false) {
      writeTodos(filteredList, index);
    }
  });
};

// This function writes the userId sorted todos in two columns, one that has a
// completed value of true and the other a completed value of false
const twoColumnTodos = (filteredList) => {
  clearTodos();
  const list = document.getElementById("todo-list-two");
  filteredList.forEach((currentElement, index) => {
    if (filteredList[index].completed === true) {
      writeTodos(filteredList, index);
    } else {
      writeTodos(filteredList, index, list);
    }
  });
};

// This function filters the todos by userId and writes them to the webpage. It also adds
// new buttons for further sorting by the completed key
const filterTodos = () => {
  returnTodos.then((todos) => {
    // gets userId from input box
    const userId = document.getElementById("user-id").valueAsNumber;
    // checks if userId is a number between 1 and 10
    if (isNaN(userId) || userId < 1 || userId > 10) {
      alert("Please enter a number between 1 and 10");
      document.getElementById("user-id").value = "";
      return;
    }
    clearTodos();
    clearButtons();

    // filters todo list by userId
    const filteredList = todos.filter((index) => {
      return index.userId === userId;
    });

    filteredList.forEach((currentElement, index) => {
      writeTodos(filteredList, index);
    });

    const newCompletedButton = document.createElement("button");
    newCompletedButton.onclick = () => completedTodos(filteredList);
    const newCompletedText = document.createTextNode("Completed Todos");
    newCompletedButton.appendChild(newCompletedText);

    const newIncompleteButton = document.createElement("button");
    newIncompleteButton.onclick = () => incompleteTodos(filteredList);
    const newIncompleteText = document.createTextNode("Incomplete Todos");
    newIncompleteButton.appendChild(newIncompleteText);

    const twoColumnButton = document.createElement("button");
    twoColumnButton.onclick = () => twoColumnTodos(filteredList);
    const twoColumnText = document.createTextNode("Two Column Todos");
    twoColumnButton.appendChild(twoColumnText);

    const newButtons = document.getElementById("new-button-section");
    newButtons.appendChild(newCompletedButton);
    newButtons.appendChild(newIncompleteButton);
    newButtons.appendChild(twoColumnButton);
  });
};

// Removes todo list(s) from webpage
const clearTodos = () => {
  const listOne = document.getElementById("todo-list");
  const listTwo = document.getElementById("todo-list-two");
  listOne.innerHTML = null;
  listTwo.innerHTML = null;
};

// Removes buttons added when sorting by userId
const clearButtons = () => {
  const newButtons = document.getElementById("new-button-section");
  newButtons.innerHTML = null;
};