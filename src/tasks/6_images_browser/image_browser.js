import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import InfiniteScroll from 'infinite-scroll';

const searchButton = document.querySelector(
  '.images_browser__search-form__button'
);
const searchInput = document.querySelector(
  '.images_browser__search-form__input'
);
const galleryList = document.querySelector('.images_browser__gallery__list');
const loadMoreButton = document.querySelector(
  '.images_browser__load-more__button'
);

const pixabayKey = '38531038-07b18ea2bd70e8e8bef0f3931';

let page = 1;
let totalPages = 0;
let isLoading = false;

loadMoreButton.style.display = 'none';

searchButton.addEventListener('click', async event => {
  event.preventDefault();
  galleryList.innerHTML = '';
  page = 1;
  isLoading = true; // Set isLoading to true when search button is clicked

  try {
    await getImages();
  } catch (error) {
    console.error('Error while fetching images:', error);
  }

  isLoading = false; // Set isLoading to false after images are loaded

  loadMoreButton.style.display = 'block';
});

async function getImages() {
  try {
    const data = await fetchImages(page);
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      totalPages = data.totalHits / 20;
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
  const markup = data.hits
    .map(
      ({ id, webformatURL, likes, views, comments, downloads, tags }) => `
        <li class="images_browser__gallery__list-item">
          <a href="${webformatURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
          <div class="info">
            <p class="info-item"><b>Likes</b> ${likes}</p>
            <p class="info-item"><b>Views</b> ${views}</p>
            <p class="info-item"><b>Comments</b> ${comments}</p>
            <p class="info-item"><b>Downloads</b> ${downloads}</p>
          </div>
        </li>
      `
    )
    .join('');

  galleryList.innerHTML += markup;
  lightBoxRender();
}
// Loading simplelightbox for new images
function lightBoxRender() {
  const lightBox = new SimpleLightbox('.images_browser__gallery__list-item a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

// Check if the user has reached the bottom of the page
function isAtBottom() {
  return (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 150
  );
}

// Load more images when the user reaches the bottom
async function loadMoreImages() {
  if (!isLoading && page < totalPages) {
    page++;
    isLoading = true;
    try {
      const data = await fetchImages(page);
      renderImages(data);
    } catch (error) {
      console.error('Error while fetching more images:', error);
      Notiflix.Notify.failure('Error occurred while fetching more images.');
    }
    isLoading = false;
  }

  if (page >= totalPages) {
    loadMoreButton.style.display = 'none';
  }
}

// Event listener to trigger loading more images when the user scrolls to the bottom
window.addEventListener('scroll', () => {
  if (isAtBottom()) {
    loadMoreImages();
  }
});

loadMoreButton.addEventListener('click', () => {
  loadMoreImages();
});
