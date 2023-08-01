const form = document.querySelector('.task06-08__login-form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const {
    elements: { email, password },
  } = event.currentTarget;

  if (email.value === '' || password.value === '') {
    alert('All fields must be filled');
  } else {
    const formData = {
      email: email.value,
      password: password.value,
    };

    console.log(`Data: Email=${email.value}; Password=${password.value}`);
    event.currentTarget.reset();
  }
});
