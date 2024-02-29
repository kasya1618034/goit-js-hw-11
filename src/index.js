import axios from 'axios';
import Notiflix from 'notiflix';

const searchQuery = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

let page = 1;
let currentQuery;

const searchParams = new URLSearchParams({
  key: '21423072-0f941905d82a42377d360632a',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: page,
  per_page: 40,
});

const fetchPhotos = async () => {
  searchParams.set('q', searchQuery.elements[0].value.split(' ').join('+'));
  searchParams.set('page', page);
  const searchResults = await axios.get(
    `https://pixabay.com/api/?${searchParams}`
  );
  return searchResults.data;
};

function renderPhotos(data, addToGallery = false) {
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    const markup = data.hits.map(({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
    }) =>
      `<div class="photo-card">
         <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`
      )
      .join('');

    if (addToGallery) {
      gallery.insertAdjacentHTML('beforeend', markup);
    } else {
      gallery.innerHTML = markup;
    }
  }
}

searchQuery.addEventListener('submit', async event => {
  event.preventDefault();

  const searchElem = searchQuery.elements[0].value.trim();
  if (searchElem === '') {
    Notiflix.Notify.warning('Please enter what you are looking for.');
  } else {
    currentQuery = searchElem;
    page = 1;
  }

  try {
    const photos = await fetchPhotos(searchQuery, page);
    renderPhotos(photos);
  } catch (error) {
    Notiflix.Notify.failure(`${error}`);
  }
});




