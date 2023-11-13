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

// VERIFY IF THE LIST IS EMPTY TO SHOW MESSAGE
function verifyClear() {
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
}

// UPDATE LIST
function updateList() {
  verifyClear();
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
      id: 0,
      name: input.value,
      isChecked: false,
    };

    const verifiedItem = items.find((element) => element.name === input.value);

    // Blocks the creation of the same element twice \/
    if (verifiedItem) {
      // In this first part, it closes the input
      input.value = "";
      addItem.classList.add("hidden");
      addClosed.classList.remove("hidden");

      currentItem.id = verifiedItem.id;
      //   console.log(currentItem.id);

      // If the verified item is not checked, it makes it checked.
      checkItem(verifiedItem);

      // Then, it updates the local storage
      localStorage.setItem("items", JSON.stringify(items));

      updateList();

      console.log(items[verifiedItem.id]);

      updateElement(currentItem);

      return;
    }

    // Cria um ID que sobe 1 pra cada novo item no array

    currentItem.id = items.length;

    items.push(currentItem);
    localStorage.setItem("items", JSON.stringify(items));

    updateList();
  }

  input.value = "";
  addItem.classList.add("hidden");
  addClosed.classList.remove("hidden");
});

function checkItem(itemToBeChecked) {
  if (itemToBeChecked.isChecked == false) {
    items[itemToBeChecked.id] = {
      id: itemToBeChecked.id,
      name: itemToBeChecked.name,
      isChecked: true,
    };
  } else {
    items[itemToBeChecked.id] = {
      id: itemToBeChecked.id,
      name: itemToBeChecked.name,
      isChecked: false,
    };
  }
}
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

// This function creates the item on the interface, receiving data from the local storage
function createItem(item) {
  let listItem = document.createElement("li");

  let a = document.createElement("a");
  a.classList.add("list-item");
  a.dataset.id = `parent${item.id}`;

  //verifies if the option is checked and updates the list on the interface
  if (item.isChecked == true) {
    a.classList.add("checked");
  } else {
    a.classList.remove("checked");
  }

  let itemContent = document.createElement("h3");
  itemContent.textContent = item.name;
  itemContent.dataset.id = item.id;

  a.appendChild(itemContent);
  listItem.appendChild(a);
  itemList.appendChild(listItem);
}

///

// dando check
function updateElement(item) {
  let test = document.querySelector("[data-id='" + item.id + "']");
  //   test.innerHTML = `${test.innerHTML} - checked`;

  //   let parentTest = document.querySelector("[data-id='parent" + item.id + "']");
  //   parentTest.classList.add("checked");

  console.log(test.textContent);
}
