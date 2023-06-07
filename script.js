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
  if (list === undefined) {
    list = document.getElementById("todo-list");
  }
  // This section creates and writes the list elements to the html
  const newListItem = document.createElement("li");
  const newCheckBox = document.createElement("input");
  newCheckBox.type = "checkbox";
  newCheckBox.checked = todos[index].completed;
  newListItem.appendChild(document.createTextNode(`user: ${todos[index].userId} - `));
  newListItem.appendChild(newCheckBox);
  newListItem.appendChild(document.createTextNode(` - ${todos[index].title}`));
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

// This function sorts the userId sorted todos by completed value and writes them to the html
const completedTodos = (filteredList, filterValue) => {
  clearTodos();

  // If no filterValue is passed, two columns are written sorted by completed value
  if (filterValue === undefined) {
    const list = document.getElementById("todo-list-two");
    filteredList.forEach((currentElement, index) => {
      if (filteredList[index].completed === true) {
        writeTodos(filteredList, index);
      } else {
        writeTodos(filteredList, index, list);
      }
    });

    // If a filterValue is passed only one column is written, sorted by the filterValue
  } else {
    const compTodos = filteredList.filter((index) => {
      return index.completed === filterValue;
    });
    compTodos.forEach((currentElement, index) => {
      writeTodos(compTodos, index);
    });
  }
}

// This function writes a new button to the html based on parameters passed to it
const newButton = (buttonText, buttonFunction, filteredList, filterValue) => {
  const newButton = document.createElement("button");
  newButton.onclick = () => buttonFunction(filteredList, filterValue);
  newButton.appendChild(document.createTextNode(buttonText));
  document.getElementById("new-button-section").appendChild(newButton);
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
    // writes filtered todo list
    filteredList.forEach((currentElement, index) => {
      writeTodos(filteredList, index);
    });
    newButton("Completed Todos", completedTodos, filteredList, true);
    newButton("Incomplete Todos", completedTodos, filteredList, false);
    newButton("Two Column Todos", completedTodos, filteredList);
  });
};

// Removes todo list(s) from webpage
const clearTodos = () => {
  document.getElementById("todo-list").innerHTML = null;
  document.getElementById("todo-list-two").innerHTML = null;
};

// Removes buttons added when sorting by userId
const clearButtons = () => {
  document.getElementById("new-button-section").innerHTML = null;
};