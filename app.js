const input = document.getElementById("item-input");
const postBt = document.getElementById("post-item");
const addBt = document.getElementById("add-item-closed");
const cancelBt = document.getElementById("cancel-item");
const addClosed = document.querySelector(".add-closed");
const addItem = document.querySelector(".add-item");
const items = JSON.parse(localStorage.getItem("items")) || [];

// console.log(JSON.parse(ot));

////

const itemList = document.querySelector(".item-list");
const listItem = document.querySelector(".list-item");
const clearListBt = document.querySelector(".clear-list");

// UPDATE LIST
function updateList() {
  if (items.length == 0) {
    const emptyList = document.querySelector(".empty-list");
    emptyList.classList.remove("hidden");

    const listOptions = document.querySelector(".list-options");
    listOptions.classList.add("hidden");
  } else {
    const emptyList = document.querySelector(".empty-list");
    emptyList.classList.add("hidden");

    const listOptions = document.querySelector(".list-options");
    listOptions.classList.remove("hidden");
  }

  itemList.innerHTML = "";
  items.forEach((element) => {
    createItem(element);
  });
}

updateList();

// input
input.addEventListener("focus", () => {
  input.placeholder = "";
});

input.addEventListener("blur", () => {
  input.placeholder = "Escreva o item";
});

// post button
postBt.addEventListener("click", () => {
  if (input.value != "") {
    const currentItem = {
      name: input.value,
      isChecked: false,
    };

    items.push(currentItem);
    localStorage.setItem("items", JSON.stringify(items));

    updateList();
  }
  //   items = JSON.parse(localStorage.getItem("items")) || [];

  input.value = "";
  addItem.classList.add("hidden");
  addClosed.classList.remove("hidden");
});

// cancel button
cancelBt.addEventListener("click", () => {
  input.value = "";
  addItem.classList.add("hidden");
  addClosed.classList.remove("hidden");
});

// add item closed button
addBt.addEventListener("click", () => {
  addItem.classList.remove("hidden");
  addClosed.classList.add("hidden");
  input.focus();
});

////////////////////

// Clear list btn
clearListBt.addEventListener("click", () => {
  localStorage.clear();
  items.length = 0;
  itemList.innerHTML = "";
  updateList();
});

const uncheckListlBt = document.querySelector(".uncheck-list");
// Uncheck list btn - Turns "isCheck" false for each element in the list \/
uncheckListlBt.addEventListener("click", () => {
  items.forEach((element) => {
    element.isChecked = false;
  });
  localStorage.setItem("items", JSON.stringify(items));
});

function createItem(item) {
  let listItem = document.createElement("li");

  let a = document.createElement("a");
  a.classList.add("list-item");

  let itemContent = document.createElement("h3");
  itemContent.textContent = item.name;

  a.appendChild(itemContent);
  listItem.appendChild(a);
  itemList.appendChild(listItem);
}
