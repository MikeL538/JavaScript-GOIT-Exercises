function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btn = document.querySelector('.task06-09__button');
const Resetbtn = document.querySelector('.task06-09__reset-button');
const colorRgb = document.querySelector('.color');
const rgbDiv = document.querySelector('.task06-09');

btn.addEventListener('click', () => {
  rgbDiv.style.backgroundColor = getRandomHexColor();
  colorRgb.innerHTML = `${rgbDiv.style.backgroundColor}`;
});

Resetbtn.addEventListener('click', () => {
  rgbDiv.style.backgroundColor = null;
  colorRgb.innerHTML = 'RGB#Code';
});
