const input = document.getElementById("item-input");

const postBt = document.getElementById("post-item");

const addBt = document.getElementById("add-item-closed");

const cancelBt = document.getElementById("cancel-item");

const addClosed = document.querySelector(".add-closed");

const addItem = document.querySelector(".add-item");

// input
input.addEventListener("focus", () => {
  input.placeholder = "";
});

input.addEventListener("blur", () => {
  input.placeholder = "Escreva o item";
});

// post button
postBt.addEventListener("click", () => {
  console.log(input.value);
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
});