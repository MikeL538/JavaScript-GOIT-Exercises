let counterValue = document.querySelector('#value');
const incBtn = document.querySelector('[data-action="increment"]');
const decBtn = document.querySelector('[data-action="decrement"]');

incBtn.addEventListener('click', function () {
  counterValue.innerHTML = +counterValue.innerHTML + 1;
});

decBtn.addEventListener('click', function () {
  counterValue.innerHTML = +counterValue.innerHTML - 1;
});
