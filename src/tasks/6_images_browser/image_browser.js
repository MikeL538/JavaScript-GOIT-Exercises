import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';

const searchButton = document.querySelector(
  '.images_browser__search-form__button'
);
const searchInput = document.querySelector(
  '.images_browser__search-form__input'
);
const loadMoreButton = document.querySelector(
  '.images_browser__load-more__button'
);
const galleryList = document.querySelector('.images_browser__gallery__list');
const pixabayKey = '38531038-07b18ea2bd70e8e8bef0f3931';

let page = 1;
let totalPages = 0;

loadMoreButton.style.display = 'none';

searchButton.addEventListener('click', async event => {
  event.preventDefault();
  galleryList.innerHTML = '';
  loadMoreButton.style.display = 'none';

  try {
    await getImages();
  } catch (error) {
    console.error('Error while fetching images:', error);
  }
});

async function getImages() {
  page = 1;
  try {
    const data = await fetchImages(page);
    if (data.hits.length === 0) {
      loadMoreButton.style.display = 'none';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      totalPages = data.totalHits / 20;
      if (data.totalHits > 20) {
        loadMoreButton.style.display = 'block';
      }
      renderImages(data);

      const totalHits = data.totalHits;
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    }
  } catch (error) {
    console.error('Error while fetching images:', error);
    Notiflix.Notify.failure('Error occurred while fetching images.');
  }
}

async function fetchImages(page) {
  const response = await fetch(
    `https://pixabay.com/api/?key=${pixabayKey}&q=${searchInput.value}&image_type=photo&page=${page}&orientation=horizontal&safesearch=true`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }

  return response.json();
}

async function renderImages(data) {
  const markup = data.hits.map(
    ({ id, webformatURL, likes, views, comments, downloads, tags }, index) => {
      // ID for smooth scrolling
      const idAttribute = index === 0 ? `id="first-image-${page}"` : '';

      return `
        <li ${idAttribute}>
          <a href="${webformatURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
          <div class="info">
            <p class="info-item"><b>Likes</b> ${likes}</p>
            <p class="info-item"><b>Views</b> ${views}</p>
            <p class="info-item"><b>Comments</b> ${comments}</p>
            <p class="info-item"><b>Downloads</b> ${downloads}</p>
          </div>
        </li>
      `;
    }
  );
  galleryList.innerHTML += markup.join('');

  const lightBox = new SimpleLightbox('.images_browser__gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  // Smooth scrolling
  const firstImage = document.getElementById(`first-image-${page}`);
  if (firstImage) {
    firstImage.scrollIntoView({ behavior: 'smooth' });
  }
}

loadMoreButton.addEventListener('click', async () => {
  try {
    await loadMoreImages();
  } catch (error) {
    console.error('Error while fetching more images:', error);
  }
});

async function loadMoreImages() {
  page++;
  if (page <= totalPages) {
    try {
      const data = await fetchImages(page);
      renderImages(data);
    } catch (error) {
      console.error('Error while fetching more images:', error);
      Notiflix.Notify.failure('Error occurred while fetching more images.');
    }
  } else {
    loadMoreButton.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
