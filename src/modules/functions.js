import storeData from './localStorage.js';

const refresh = () => {
  window.location.reload();
};

const updateIndex = (itemList) => {
  itemList.forEach((element, index) => {
    element.index = index + 1;
  });
};

const updateListField = (itemList, field, index) => {
  itemList[index].item = field.textContent;
  storeData(itemList);
};

const deleteItem = (itemList, indexValue) => {
  itemList.splice(indexValue, 1);
  updateIndex(itemList);
  storeData(itemList);
  refresh();
};

export {
  updateListField, deleteItem, refresh, updateIndex,
};