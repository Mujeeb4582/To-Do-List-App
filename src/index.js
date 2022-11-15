import './style.css';
import ItemDetails from './modules/object.js';
// eslint-disable-next-line import/no-cycle
import {
  updateListField, deleteItem, updateIndex, refresh,
} from './modules/functions.js';

// grab the element
const form = document.querySelector('#form');
const toDoList = document.querySelector('.toDoList');
const clearTask = document.querySelector('.clearTask');
const rotateIcon = document.querySelector('.fa-rotate');

// eslint-disable-next-line prefer-const, import/no-mutable-exports
let itemList = [];

// functions --------------
const storeData = () => {
  localStorage.setItem('data', JSON.stringify(itemList));
};

const clearInputField = () => {
  form.toDoTitle.value = '';
};

// CRUD STAND FOR Create Read Update Delete

const CRUD = (newItem, indexNum) => {
  const itemWrapper = document.createElement('div');
  itemWrapper.className = 'itemWrapper';
  const li = document.createElement('li');
  li.className = 'toDO';
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'box';
  const listInput = document.createElement('label');
  listInput.id = 'description';
  listInput.innerHTML = newItem;
  /// Icons
  const dotIcon = document.createElement('i');
  dotIcon.className = 'fas fa-ellipsis-vertical';
  const trashIcon = document.createElement('i');
  trashIcon.className = 'fas fa-trash-alt';
  // -----------------------------------
  itemWrapper.appendChild(checkBox);
  itemWrapper.appendChild(listInput);
  li.appendChild(itemWrapper);
  li.appendChild(dotIcon);
  li.appendChild(trashIcon);
  toDoList.appendChild(li);

  dotIcon.addEventListener('click', () => {
    dotIcon.style.display = 'none';
    trashIcon.style.display = 'block';
  });

  checkBox.addEventListener('click', () => {
    if (checkBox.checked === true) {
      listInput.style.textDecoration = 'line-through';
      listInput.style.textDecorationColor = '#000';
      listInput.style.textDecorationThickness = '4px';
      itemList[indexNum].completed = true;
      storeData();
    } else {
      itemList[indexNum].completed = false;
      listInput.style.textDecoration = 'none';
      storeData();
    }
  });

  if (itemList[indexNum].completed === true) {
    checkBox.checked = true;
    listInput.style.textDecoration = 'line-through';
    listInput.style.textDecorationColor = '#000';
    listInput.style.textDecorationThickness = '4px';
  } else {
    checkBox.checked = false;
  }

  li.onclick = () => {
    listInput.contentEditable = 'true';
  };

  listInput.addEventListener('keyup', (e) => {
    if ((e.target.id === 'description')) {
      updateListField(e.target, indexNum);
    }
  });

  trashIcon.addEventListener('click', (el) => {
    el.target.parentElement.remove();
    deleteItem(indexNum);
  });
};

const renderItem = (dataList) => {
  dataList.forEach((element, index) => {
    CRUD(element.item, index);
  });
};

const getStoreData = () => {
  const getData = localStorage.getItem('data');
  if (getData) {
    const previousData = JSON.parse(getData);
    itemList = previousData;
    renderItem(previousData);
  }
};

getStoreData();

// clear all task which are completed
clearTask.addEventListener('click', () => {
  itemList = itemList.filter((item) => item.completed === false);
  updateIndex();
  storeData();
  refresh();
});

// refresh the browser when click on rotate Icon
rotateIcon.addEventListener('click', () => {
  refresh();
});

// add event listenser to the form
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const item = form.toDoTitle.value.trim();
  // form Validation if field is empty or just enter spaces
  // grab main element
  const main = document.querySelector('main');
  // grab first child of main element
  const { firstChild } = main;
  if (item === '') {
    // create new element
    const msg = document.createElement('small');
    msg.innerHTML = 'This field is required and cannot be empty!';
    main.insertBefore(msg, firstChild);
    setTimeout(() => {
      msg.style.display = 'none';
      clearInputField();
    }, 2500);
  } else {
    const indexNumber = itemList.length + 1;
    const itemInfo = new ItemDetails(item, indexNumber);
    itemList.push(itemInfo);
    CRUD(item, itemList.length - 1);
    storeData();
    clearInputField();
  }
});
export { storeData, itemList };