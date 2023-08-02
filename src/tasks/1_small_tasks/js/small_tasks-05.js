const nameInput = document.querySelector('#name-input');
let nameOutput = document.querySelector('#name-output');

nameInput.addEventListener('input', function (nickname) {
  if (nickname.currentTarget.value === '') {
    nameOutput.textContent = 'Anonymous';
  } else {
    nameOutput.textContent = nickname.currentTarget.value;
  }
});
