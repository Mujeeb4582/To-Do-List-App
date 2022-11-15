import { itemList } from '../index.js';

const updateIndex = () => {
  itemList.forEach((element, index) => {
    element.index = index + 1;
  });
};

const updateListField = (field, index) => {
  itemList[index].item = field.textContent;
};

const deleteItem = (indexValue) => {
  itemList.splice(indexValue, 1);
  updateIndex();
};

const refresh = () => {
  window.location.reload();
};

export { updateListField, deleteItem, refresh };