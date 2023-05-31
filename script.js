const fetchTodos = () => {
  return fetch("https://jsonplaceholder.typicode.com/todos");
};

const logFetchTodos = () => console.log(fetchTodos());

const logTodos = () => {
    fetchTodos()
        .then(res => res.json())
        .then(json => console.log(json))
}

const populateTodos = () => {

    fetchTodos()
        .then(res => res.json())
        .then(todos => {
            todos.forEach((currentElement, index) => {
                const title = todos[index]["title"]
                const newTitle = document.createTextNode(title);
                const list = document.getElementById("todo-list");
                const newListItem = document.createElement("li");
                newListItem.appendChild(newTitle)
                document.body.insertBefore(newListItem, list)
            });
        })
}