const itemList = document.querySelector(".item-list");

function createItem(item) {
  let listItem = document.createElement("li");

  let div = document.createElement("div");
  div.classList.add("list-item");

  let itemContent = document.createElement("h3");
  itemContent.textContent = item.name;

  div.appendChild(itemContent);
  listItem.appendChild(div);
  itemList.appendChild(listItem);

  //   console.log(listItem);
  //   console.log(div);
  //   console.log(item);
}

const clearListBt = document.querySelector(".clear-list");

// Clear list btn
clearListBt.addEventListener("click", () => {
  itemList.innerHTML = "";
  localStorage.clear();
});
