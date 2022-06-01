import {renderListWithTemplate} from './utils';

export default class RestaurantList {
    constructor(parent, restaurants, countryCode, limited) {
        this.parent = parent;
        this.restaurants = restaurants;
        this.countryCode = countryCode;
        this.limited = limited;
    }
    async init() {
        const restaurantFiltered = await this.filterRestaurantByCountry(this.countryCode);
        this.renderList(restaurantFiltered);
    }
    async filterRestaurantByCountry(countryCode) {
        let restaurantFiltered = this.restaurants.filter((r) => r.country === countryCode);
        if(this.limited){
            restaurantFiltered = restaurantFiltered.slice(0, 5);
        }
        return restaurantFiltered;
    }
    prepareTemplate(template, item) {
        template.querySelector('img').src = item.img;
        template.querySelector('.restaurant-card__name').textContent = item.name;
        template.querySelector('.restaurant-card__text').textContent = '30 minutes';
        return template;
    }
    renderList(list) {
        this.parent.innerHTML = '';
        const template = document.getElementById('product-card-template');
        renderListWithTemplate(
            template,
            this.parent,
            list,
            this.prepareTemplate
        );
    }
}