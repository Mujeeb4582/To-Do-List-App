// grab the elements
const form = document.querySelector('#form');
const toDoList = document.querySelector('.toDoList');

// functions --------------
const clearInputField = () => {
  form.toDoTitle.value = '';
};
// ------------------------

// add event listenser to the form
form.addEventListener('submit', e => {
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
  }
});
