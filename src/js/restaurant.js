import { loadHeaderFooter,updateBagNumeric, getParams } from './utils.js';
import Geographic from './geographic.js';

await loadHeaderFooter().then(async ()=>{
  await new Geographic().init();
  updateBagNumeric();

  let keywords = getParams('keywords');
  if(keywords){
    document.getElementById('searchInputGroup').value = keywords.split(',').join(' ');
  }

  document.getElementById('iconSearch').addEventListener('click', function () {
    document
      .querySelector('header .mobile-input-search')
      .classList.toggle('hide');
    document.getElementById('closeSearch').classList.toggle('hide');
    this.classList.toggle('hide');
  });

  document.getElementById('closeSearch').addEventListener('click', function () {
    document
      .querySelector('header .mobile-input-search')
      .classList.toggle('hide');
    document.getElementById('iconSearch').classList.toggle('hide');
    this.classList.toggle('hide');
  });

  document
    .getElementById('iconLocation')
    .addEventListener('click', function () {
      document.getElementById('site-modal').classList.remove('hide');
    });

  document
    .getElementById('iconLocationGroup')
    .addEventListener('click', function () {
      document.getElementById('site-modal').classList.remove('hide');
    });

  document.getElementById('cartbutton').addEventListener('click', function (){
    window.location.href = '/views/cart.html';
  });
  
  document.getElementById('searchbutton').addEventListener('click', function (){
    let keywords = document.getElementById('searchInputGroup').value;
    if(keywords){
      keywords = keywords.split(' ').join(',');
      window.location.href = `/views/restaurants.html?keywords=${keywords}`;
    } else {
      window.location.href = '/views/restaurants.html';
    }
  });

});