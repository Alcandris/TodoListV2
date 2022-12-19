const form = document.querySelector("form");
const list = document.querySelector(".list-group");
let todoList = [];

let tasks = [];
let taskAdded = String;
let idCount = 0;
let filter = "all";
let todosArray = [];
/*CLASSES*/

class Task {
  constructor(id, chekedAttribute, title) {
    this.id = id;
    this.chekedAttribute = chekedAttribute;
    this.title = title;
    const test = `
    <input class="form-check-input" type="checkbox" id="todo-${id}" ${chekedAttribute} />
    <label class="ms-2 form-check-label" for="todo-${id}">
      ${title}
    </label>
    <label class="ms-auto btn btn-danger btn-sm">
      <i class="bi-trash"> </i>
    </label>
      `;
    const li = document.createElement("li");

    li.classList.add(`todo`);
    li.classList.add(`list-group-item`);
    li.classList.add(`d-flex`);
    li.classList.add(`align-items-center`);

    li.innerHTML = test;

    document.querySelector(".list-group").appendChild(li);
    const etat = document.getElementById(`todo-${id}`);
    if (etat.checked) {
      li.classList.add("is-completed");
    } else {
      li.classList.add("is-todo");
    }
    checkbox();
  }
}

/*FONCTIONS*/

async function importTasks() {
  if (localStorage.todosArray) {
    list.innerHTML = localStorage.getItem("todosArray");
  } else {
    return;
  }
  checkbox();
  todoList = document.querySelectorAll(".todo");
  removeTodo(todoList);
}

function addTask(event) {
  event.preventDefault();
  let id = Date.now();
  const newli = new Task(id, "", event.target.childNodes[1].value);
  // idCount++;
  event.target.childNodes[1].value = "";
  todoList = document.querySelectorAll(".todo");
  removeTodo(todoList);
  onUpadte();
}

function removeTodo(todoList) {
  todoList.forEach((todo) => {
    const trash = todo.lastElementChild;

    trash.addEventListener("click", () => {
      todo.remove();
      onUpadte();
    });
  });
}

function onUpadte() {
  localStorage.setItem("todosArray", list.innerHTML);
}

function checkbox() {
  const checkbox = document.querySelectorAll(".form-check-input");

  checkbox.forEach((box) => {
    console.log(box.checked);
    if (box.parentElement.classList.contains("is-completed")) {
      box.checked = true;
    }

    box.addEventListener("change", (e) => {
      console.log(e);
      if (box.checked) {
        box.parentElement.classList.add("is-completed");
        box.parentElement.classList.remove("is-todo");
        onUpadte();
      } else {
        box.parentElement.classList.add("is-todo");
        box.parentElement.classList.remove("is-completed");
        onUpadte();
      }
    });
  });
}
/***********ECOUTES */
window.addEventListener("load", importTasks);

form.addEventListener("submit", (e) => {
  addTask(e);
});

document.querySelectorAll(".btn-group .btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.parentElement.querySelector(".active").classList.remove("active");
    btn.classList.add("active");
    filter = e.target.dataset.filter;
    if (filter === "todo") {
      document.querySelector(".list-group").classList.remove("done");
      document.querySelector(".list-group").classList.add("todo");
    } else if (filter === "done") {
      document.querySelector(".list-group").classList.remove("todo");
      document.querySelector(".list-group").classList.add("done");
    } else {
      document.querySelector(".list-group").classList.remove("todo");
      document.querySelector(".list-group").classList.remove("done");
    }
  });
});
