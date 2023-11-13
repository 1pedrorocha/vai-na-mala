const input = document.getElementById("item-input");
const postBt = document.getElementById("post-item");
const addBt = document.getElementById("add-item-closed");
const cancelBt = document.getElementById("cancel-item");
const addClosed = document.querySelector(".add-closed");
const addItem = document.querySelector(".add-item");
const items = JSON.parse(localStorage.getItem("items")) || [];

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

      // If the verified item is not checked, it makes it checked.
      //   checkItem(verifiedItem);

      // Then, it updates the local storage
      localStorage.setItem("items", JSON.stringify(items));

      updateList();

      highlightExistingItem(verifiedItem);

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

// CHECK ITEM
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
  updateList();
});

// This function creates the item on the interface, receiving data from the local storage
function createItem(item) {
  let listItem = document.createElement("li");
  listItem.dataset.id = `li${item.id}`;
  listItem.classList.add("list-item-container");

  let a = document.createElement("a");
  a.classList.add("list-item");
  a.dataset.id = `parent${item.id}`;
  a.classList.add(`parent-class${item.id}`);

  // CLICK ON THE LIST ITEM TO CHECK IT \/
  a.addEventListener("click", () => {
    if (item.isChecked == false) {
      item.isChecked = true;
    } else if (item.isChecked == true) {
      item.isChecked = false;
    }
    localStorage.setItem("items", JSON.stringify(items));
    updateList();
  });

  const checkIcon = document.createElement("div");
  checkIcon.classList.add("hidden");
  checkIcon.innerHTML = `<img src="/img/checkmark.png" alt="remove button icon">`;

  //verifies if the option is checked and updates the list on the interface
  if (item.isChecked == true) {
    a.classList.add("checked");
    checkIcon.classList.remove("hidden");
  } else {
    a.classList.remove("checked");
    checkIcon.classList.add("hidden");
  }

  let itemContent = document.createElement("h3");
  itemContent.textContent = item.name;
  itemContent.dataset.id = item.id;

  //   CANCEL BUTTON \/
  const btnElement = document.createElement("button");
  btnElement.innerHTML = `
    <img src="/img/remove.png" alt="remove button icon">`;
  btnElement.classList.add("delete-button");

  btnElement.addEventListener("click", function () {
    deleteItem(item.id);
  });

  a.appendChild(itemContent);
  a.appendChild(checkIcon);

  listItem.appendChild(a);
  listItem.appendChild(btnElement);
  itemList.appendChild(listItem);
}

function deleteItem(id) {
  //   To remove an item from the Array, we use the method splice()
  items.splice(
    items.findIndex((element) => element.id === id),
    1
  );

  localStorage.setItem("items", JSON.stringify(items));

  updateList();
}

// function deleteButton() {
//   const btnElement = document.createElement("button");
//   btnElement.innerHTML = `
//     <img src="/img/remove.png" alt="remove button icon">`;
//   btnElement.classList.add("delete-button");
// }

///
function highlightExistingItem(existingItem) {
  const itemToBeHighlighted = document.querySelector(
    `.parent-class${existingItem.id}`
  );

  console.log(itemToBeHighlighted);

  itemToBeHighlighted.classList.add("highlighted");
}
