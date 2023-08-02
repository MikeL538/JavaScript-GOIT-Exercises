function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const boxes = document.querySelector('#boxes');
const createBox = document.querySelector('[data-create]');
const destroyAll = document.querySelector('[data-destroy]');
const boxAmount = document.querySelector('#controls input');
let size = 30;

createBox.addEventListener('click', () => {
  for (let i = 0; i < boxAmount.value; i++) {
    const div = document.createElement('div');
    div.style.width = size + 'px';
    div.style.height = size + 'px';
    div.style.margin = '2px auto';
    div.style.backgroundColor = getRandomHexColor();
    boxes.appendChild(div);
    size += 10;
  }
});

destroyAll.addEventListener('click', () => {
  boxes.innerHTML = '';
  size = 30;
});
