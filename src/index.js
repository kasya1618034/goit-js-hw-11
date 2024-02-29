import axios from 'axios';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');

let page = 1;

const searchParams = new URLSearchParams({
  key: '21423072-0f941905d82a42377d360632a',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: page,
  per_page: 40,
});

