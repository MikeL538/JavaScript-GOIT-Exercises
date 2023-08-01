const textInput = document.querySelector('.task06-06__validation-input');

textInput.addEventListener('blur', () => {
  textInput.classList.remove('valid', 'invalid');
  if (textInput.value.length === 0) {
    return;
  } else if (textInput.value.length === 6) {
    textInput.classList.toggle('valid');
  } else {
    textInput.classList.toggle('invalid');
  }
});
