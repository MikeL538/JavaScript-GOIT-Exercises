const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const resetButton = document.querySelector('[data-reset]');
let timer;

stopButton.disabled = true;

//Random color function
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Start button click event
startButton.addEventListener('click', () => {
  stopButton.disabled = false;
  startButton.disabled = true;
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 800);
});

stopButton.addEventListener('click', () => {
  stopButton.disabled = true;
  startButton.disabled = false;
  clearInterval(timer);
});

resetButton.addEventListener('click', () => {
  stopButton.disabled = true;
  startButton.disabled = false;
  document.body.style.backgroundColor = null;
  clearInterval(timer);
});
