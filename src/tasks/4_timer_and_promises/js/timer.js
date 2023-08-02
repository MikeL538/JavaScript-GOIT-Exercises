import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start-timer]');
const stopButton = document.querySelector('[data-stop-timer]');
const datePicker = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      if (isStarted) return;
      Notiflix.Notify.failure('Please choose a date in the future.');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const fp = flatpickr(datePicker, options);

let isStarted = false;
let interval;

startButton.disabled = true;

//Time-converting function.
function convertMs(ms) {
  // Number of milliseconds per unit of time.
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Function adding '0' in front, if time is single number.
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Start counter if date is in the future
startButton.addEventListener('click', () => {
  datePicker.disabled = true; // Disable choosing new date
  isStarted = true; // Counting started info
  Notiflix.Notify.success('Counting started, press stop to choose new date.');
  const selectedDate = flatpickr.formatDate(
    new Date(datePicker.value),
    'Y-m-d H:i'
  );
  const endDate = new Date(selectedDate).getTime();
  interval = setInterval(() => {
    const now = new Date().getTime();
    const remainingTime = endDate - now;

    if (remainingTime <= 0) {
      datePicker.disabled = false;
      clearInterval(interval);
      document
        .querySelectorAll('.value')
        .forEach(element => (element.textContent = '00'));
      isStarted = false;
      startButton.disabled = true;
      Notiflix.Notify.info('Counting ended, choose new date.');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
    startButton.disabled = true;
  });
});

// Stop counter allowing to choose new date with date reset
stopButton.addEventListener('click', () => {
  fp.setDate(new Date());
  clearInterval(interval);
  document
    .querySelectorAll('.value')
    .forEach(element => (element.textContent = '00'));
  if (isStarted) {
    Notiflix.Notify.info('Counting stopped, choose new date.');
  }
  isStarted = false;
  startButton.disabled = true;
  datePicker.disabled = false;
});
