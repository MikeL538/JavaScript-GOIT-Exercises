import Notiflix from 'notiflix';

const button = document.querySelector('[data-start-promises]');
const firstDelayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');
const resetPromisesButton = document.querySelector('[data-promises-stop]');

let createPromises = true;
let currentDelay = 0;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!createPromises) {
        return;
      }
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        resolve({ position, delay });
      } else {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromisesRecursive(position, amountValue, stepValue) {
  if (!createPromises) {
    return; // Stop creating promises
  }

  if (position > amountValue) {
    // All promises created
    button.disabled = false;
    return;
  }

  createPromise(position, currentDelay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    .finally(() => {
      currentDelay += stepValue;
      createPromisesRecursive(position + 1, amountValue, stepValue);
    });
}

button.addEventListener('click', event => {
  event.preventDefault();
  const firstDelayValue = parseInt(firstDelayInput.value);
  const stepValue = parseInt(stepInput.value);
  const amountValue = parseInt(amountInput.value);

  currentDelay = firstDelayValue;
  createPromises = true;
  button.disabled = true;

  createPromisesRecursive(1, amountValue, stepValue);
});

resetPromisesButton.addEventListener('click', () => {
  createPromises = false;
  button.disabled = false;
});
