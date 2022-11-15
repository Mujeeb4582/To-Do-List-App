/* eslint-disable import/no-cycle */
import { storeData, itemList } from '../index.js';
import { updateListField, deleteItem } from './functions.js';

const toDoList = document.querySelector('.toDoList');

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

export default { CRUD };