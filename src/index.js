// grab the elements
const form = document.querySelector('#form');
const toDoList = document.querySelector('.toDoList');

// add event listenser to the form
form.addEventListener('submit', e => {
  e.preventDefault();

  const item = form.toDoTitle.value.trim();
});