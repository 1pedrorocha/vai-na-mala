const itemList = document.querySelector(".item-list");

function createItem(itemName) {
  console.log(itemName);

  let listItem = document.createElement("li");

  let div = document.createElement("div");
  div.classList.add("list-item");

  let item = document.createElement("h3");
  item.textContent = itemName;

  div.appendChild(item);
  listItem.appendChild(div);
  itemList.appendChild(listItem);

  console.log(listItem);
  console.log(div);
  console.log(item);
}

const clearListBt = document.querySelector(".clear-list");

// Clear list btn
clearListBt.addEventListener("click", () => {
  itemList.innerHTML = "";
  localStorage.clear();
});
