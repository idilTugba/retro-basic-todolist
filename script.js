"use script;"

let items,
    listContent = document.querySelector('.list-container__list-content');

   

//localStorage.clear();
loadItems();


function loadItems(){
    items = getItemsFromLS();
    items.forEach(function(i){
        createItem(i);
    });
}

//get LocalStorage
function getItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

//set LocalStorage
function setItemsToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

//delete item from LocalStrage
function deleteItemFromLS(e){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === e){
            items.splice(index,1);
        }
    })
    localStorage.setItem('items',JSON.stringify(items));
    
}

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
        this.parentElement.remove();
        deleteItemFromLS(this.parentElement.textContent);
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
        i.remove();
    })
    listContent.classList.remove('list-content-delete');
    localStorage.clear();
}

//add new item
let addNewItemButton = document.querySelector('.list-container__form button'),
    addNewItemInput = document.querySelector('.list-container__form input');

addNewItemButton.addEventListener('click',function(){
    let newItem = addNewItemInput.value;
    if(newItem){
       createItem(newItem);

       setItemsToLS(newItem);
    }
    
});

