const date = document.querySelector(".date");
const time = document.querySelector(".time");

//Time va Date
function getDates() {
  const now = new Date();
  const dates = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const seconds =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  date.textContent = `${dates}.${month}.${year}`;
  time.textContent = ` ${hours}:${minutes}:${seconds}`;
  return `${hours}:${minutes}:${seconds}; ${dates}.${month}.${year}`;
}
setInterval(getDates, 1000);

//Todo

let editItemId;

//mesageError
function messageError(elems, message) {
  document.querySelector(`${elems}`).style.display = message;
  setTimeout(() => {
    document.querySelector(`${elems}`).style.display = "none";
  }, 3000);
}

//showTodos
const listTodos = document.querySelector(".collection");
function showTodos() {
  let todost = JSON.parse(localStorage.getItem("list"));
  listTodos.innerHTML = "";
  todost.forEach((item, i) => {
    listTodos.innerHTML += `<li ondblclick="setCompleted(${i})" class="collection-item ${
      item.completed == true ? "active" : ""
    }">${item.text}
    <i onclick=(deleteTodos(${i})) class="material-icons right delete">delete</i>
    <i onclick=(editTodos(${i})) class="material-icons right edit">edit</i>
    <span class="times right">${item.times}</span></li>`;
  });
}

//localStorage
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];
if (todos.length) showTodos();

//setTodos
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

//cereateTodos
const btnCreate = document.querySelector(".btn-create");
const formCreate = document.querySelector(".form-create");

btnCreate.addEventListener("click", (e) => {
  e.preventDefault();
  const todoText = formCreate["create-todo"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({
      text: todoText,
      times: getDates(),
      completed: false,
    });
    setTodos();
    showTodos();
  } else {
    messageError(".error", "block");
  }
});

//deleteTodos
function deleteTodos(id) {
  const delTodos = todos.filter((item, i) => {
    return i !== id;
  });
  todos = delTodos;
  setTodos();
  showTodos();
}

//setCompleted
function setCompleted(id) {
  const completedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = completedTodos;
  setTodos();
  showTodos();
}

//modal
const modals = document.querySelector(".modal");
const btnEdit = document.querySelector(".btn-edit");
const card = document.querySelector(".col");

//editForm
const formEdit = document.querySelector(".form-edit");
btnEdit.addEventListener("click", (e) => {
  e.preventDefault();
  const editText = formEdit["edit-todo"].value.trim();
  formEdit.reset();
  if (editText.length) {
    todos.splice(editItemId, 1, {
      text: editText,
      times: getDates(),
      completed: false,
    });
    modals.style.display = "none";
    card.style.opacity = "1";
    setTodos();
    showTodos();
  } else {
    messageError(".errors", "block");
  }
});

//editTodos
function editTodos(id) {
  open();
  editItemId = id;
}

function open() {
  modals.style.display = "block";
  card.style.opacity = "0.5";
}
