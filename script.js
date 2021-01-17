"use script;"

let items = ["item 1","item 2","item 3","item 4","Lorem loedf sdmksdfsd kisprum spritidmcsd spiritualized"],
    listContent = document.querySelector('.list-container__list-content');

    if(document.cookie){
        console.log(document.cookie);
    }

items.forEach(function(i){
    createItem(i);
});

//create list items and close buttons
function createItem(i){
    let item = document.createElement('div'),
        text = document.createTextNode(i);
    item.className = "list-container__list-item";
    item.appendChild(text);

    let span = document.createElement('span');
    span.className="icon-close";
    item.appendChild(span);

    listContent.appendChild(item);

    span.onclick = function(){
        this.parentElement.classList.remove('list-item-delete');
        this.parentElement.style.display="none";
    }
}

//add toggle class for each div
listContent.addEventListener('click',function(listItem){
    if(listItem.target.tagName == 'DIV'){
        listItem.target.classList.toggle('list-item-delete');
        deleteButton();
    }
});

function deleteButton(){
    var selectItem = document.querySelectorAll('.list-item-delete');
    if(selectItem.length){
        listContent.classList.add('list-content-delete');
    } else{
        listContent.classList.remove('list-content-delete');
    }
}

//delete all
var deleteAllButton = document.querySelector('.delete-all-select-list');
deleteAllButton.onclick = function(){
    var allList = document.querySelectorAll('.list-item-delete');
    allList.forEach(function(i){
        i.classList.remove('list-item-delete');
        i.style.display = "none";
    })
    listContent.classList.remove('list-content-delete');
}

//add new item
let addNewItemButton = document.querySelector('.list-container__form button'),
    addNewItemInput = document.querySelector('.list-container__form input');

addNewItemButton.addEventListener('click',function(){
    let newItem = addNewItemInput.value;
    if(newItem){
       createItem(newItem);
    }
});


window.addEventListener('beforeunload', (event) => {
  let cookieData = document.querySelectorAll('list-container__list-item'),
      newDate = new Date();
      date = newDate.toLocaleTimeString();
  document.cookie = "data="+cookieData+'; expires='+date;
})