const storeData = (itemList) => {
  localStorage.setItem('data', JSON.stringify(itemList));
};

export default storeData;