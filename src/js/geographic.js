import { loadModalContent } from './utils.js';
import Geolocation from './geolocation.js';
import RestaurantList from "./restaurantList";

export async function init(){
  return new Promise(async () => {
    await loadModalContent('geographic-modal.html');

    document.querySelector('.close').addEventListener('click', function () {
      document.getElementById('site-modal').classList.add('hide');
    });
  const geolocation = new Geolocation();
  geolocation.init().then(() => {
    document
      .querySelector('.ship-address-cancel')
      .addEventListener('click', function () {
        document
          .getElementById('ship-address-selected-container')
          .classList.add('hide');
        document
          .getElementById('ship-address-container')
          .classList.remove('hide');
        document
          .getElementById('btn-save-geographic-place')
          .removeAttribute('disabled');
        document
          .getElementById('btn-save-geographic-place')
          .classList.remove('btn-disabled');
      });
    document
      .getElementById('btn-save-geographic-place')
      .addEventListener('click', function () {
        geolocation.savePlace();
        document.getElementById('ship-address-container').classList.add('hide');
        document
          .getElementById('ship-address-selected-container')
          .classList.remove('hide');
        this.setAttribute('disabled', 'disabled');
        this.classList.add('btn-disabled');
      });
    document
      .getElementById('btn-cancel-geographic-place')
      .addEventListener('click', function () {
        document.getElementById('ship-address-container').classList.add('hide');
        document
          .getElementById('ship-address-selected-container')
          .classList.remove('hide');
        document
          .getElementById('btn-save-geographic-place')
          .setAttribute('disabled', 'disabled');
        document
          .getElementById('btn-save-geographic-place')
          .classList.add('btn-disabled');
        document.getElementById('site-modal').classList.add('hide');
      });
  })
  .then(() => {
      const listElement = document.querySelector('#top-restaurants-list');
      const countryCode = geolocation.getCountryCode();
      const list = new RestaurantList(listElement);
      list.getRestaurantsFilteredByLocation(countryCode);
  });
}