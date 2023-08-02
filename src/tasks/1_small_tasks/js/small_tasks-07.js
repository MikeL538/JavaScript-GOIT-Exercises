const fontInput = document.querySelector('#font-size-control');
const text = document.querySelector('#text');

fontInput.value = 15;
text.style.fontSize = fontInput.value + 'px';

fontInput.addEventListener('input', () => {
  text.style.fontSize = fontInput.value + 'px';
});
