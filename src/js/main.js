import { loadHeaderFooter,updateBagNumeric } from './utils.js';
import { init } from './geographic.js';

new Promise(async () => {
  await loadHeaderFooter().then(()=>{
    init();
    updateBagNumeric();
  });

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
});
