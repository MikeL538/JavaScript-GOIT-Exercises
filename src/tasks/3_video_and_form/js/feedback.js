import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const form = document.querySelector('.video_and_form__feedback-form');
const email = document.querySelector('input[type="email"]');
const message = document.querySelector('textarea[name="message"]');

const saveFormState = throttle(() => {
  const formState = {
    email: email.value,
    message: message.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

form.addEventListener('input', saveFormState);

const storedFormState = localStorage.getItem('feedback-form-state');
if (storedFormState) {
  const parsedFormState = JSON.parse(storedFormState);
  email.value = parsedFormState.email;
  message.value = parsedFormState.message;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (email.value === '' || message.value === '') {
    Notiflix.Notify.failure('Both fields must be filled!');
    return;
  } else {
    console.log(`Email: ${email.value}`);
    console.log(`Message: ${message.value}`);

    localStorage.removeItem('feedback-form-state');
    form.reset();
  }
});
