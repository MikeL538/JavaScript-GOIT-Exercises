import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import axios from 'axios';

const catInfoDiv = document.querySelector('.cat_browser__div');
const breedSelect = document.querySelector('.cat_browser__select');
const xApiKey =
  'live_Xqmc7C92q9l9fMBe384z4RNI063q7JOQ0hZCXP5zi9i0nysYuEsuaYGO9UEfujTt';

// API key
axios.defaults.headers.common['x-api-key'] = `${xApiKey}`;

// Function to fetch the list of cat breeds
function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

// Function to fetch cat information by breed ID
function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url).then(response => response.data);
}

// Function to populate the breed selector with options
function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  new SlimSelect({
    select: breedSelect,
  });
}

// Function to display cat information
function displayCatInfo(cat) {
  catInfoDiv.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}" />
      <div>
      <h2>${cat.breeds[0].name}</h2>
      <p>
      <span>Description</span>: ${cat.breeds[0].description}</p>
      <p>
      <span>Temperament</span>: ${cat.breeds[0].temperament}.</p>
    </div>
    `;
}

// Handle breed select change event
breedSelect.addEventListener('change', () => {
  Notiflix.Loading.standard('Loading data, please wait...');
  const selectedBreedId = breedSelect.value;
  catInfoDiv.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      displayCatInfo(catData[0]);
      catInfoDiv.style.display = 'flex';

      Notiflix.Loading.remove();
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.error(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.error('Error fetching cat data:', error);
    });
});

// Fetch the list of cat breeds on page load
fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
  })
  .catch(error => {
    Notiflix.Loading.remove();
    Notiflix.Notify.error(
      'Oops! Something went wrong! Try reloading the page!'
    );
    console.error('Error fetching breed data:', error);
  });
