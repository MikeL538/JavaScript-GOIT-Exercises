import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryList = document.querySelector('.gallery-lightbox');

galleryItems.forEach(item => {
  const listItem = document.createElement('li');
  listItem.classList.add('gallery-lightbox__item');

  const link = document.createElement('a');
  link.classList.add('gallery-lightbox__link');
  link.setAttribute('href', item.original);

  const image = document.createElement('img');
  image.classList.add('gallery-lightbox__image');
  image.setAttribute('src', item.preview);
  image.setAttribute('alt', item.description);

  link.appendChild(image);
  listItem.appendChild(link);
  galleryList.appendChild(listItem);
});

document.addEventListener('DOMContentLoaded', function () {
  const lightbox = new SimpleLightbox('.gallery-lightbox a', {
    captionsData: 'alt',
    captionDelay: 200,
  });
});
