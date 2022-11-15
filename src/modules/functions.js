// eslint-disable-next-line import/no-cycle
import { itemList, storeData } from '../index.js';

const refresh = () => {
  window.location.reload();
};

const updateIndex = () => {
  itemList.forEach((element, index) => {
    element.index = index + 1;
  });
};

const updateListField = (field, index) => {
  itemList[index].item = field.textContent;
  storeData();
};

const deleteItem = (indexValue) => {
  itemList.splice(indexValue, 1);
  updateIndex();
  storeData();
  refresh();
};

const clearCompleted = () => {
  itemList = itemList.filter((item) => item.completed === false);
  updateIndex();
  storeData();
  refresh();
};

export {
  updateListField, deleteItem, refresh, clearCompleted,
};