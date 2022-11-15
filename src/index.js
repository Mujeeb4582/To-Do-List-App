import './style.css';
import ItemDetails from './modules/object.js';
// eslint-disable-next-line import/no-cycle
import CRUD from './modules/CRUD.js';

// grab the element
const form = document.querySelector('#form');

// declear and empty array to store objects
// eslint-disable-next-line prefer-const, import/no-mutable-exports
let itemList = [];

// functions --------------
const storeData = () => {
  localStorage.setItem('data', JSON.stringify(itemList));
};

const clearInputField = () => {
  form.toDoTitle.value = '';
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
// ------------------------

getStoreData();

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