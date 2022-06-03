import {renderListWithTemplate, sortListByKey} from './utils';

export default class RestaurantList {
    constructor(parent, restaurants, countryCode, limited, keywords) {
        this.parent = parent;
        this.restaurants = restaurants;
        this.countryCode = countryCode;
        this.limited = limited;
        this.keywords = keywords;
    }
    async init() {
        this.restaurants = await this.filterRestaurantByCountry(this.countryCode);
        if(this.keywords){
            this.restaurants = await this.filterRestaurantByKeyword(this.keywords.split(',').join(' '));
        }
        this.renderList(this.restaurants);
    }
    async filterRestaurantByCountry(countryCode) {
        let restaurantFiltered = this.restaurants.filter((r) => r.country === countryCode);
        if(this.limited){
            restaurantFiltered = restaurantFiltered.slice(0, 5);
        }
        return restaurantFiltered;
    }
    async filterRestaurantByKeyword(keyword){
        let restaurantFiltered = [];
        await this.restaurants.map((r) => {
            console.log(r.keywords);
            if(r.keywords.includes(keyword)){
                restaurantFiltered.push(r);
            }
        });
        return restaurantFiltered;
    }
    async sortRestaurants(sort){
        if(sort == 'asc'){
            this.restaurants = await sortListByKey(this.restaurants,'name', false);
        } else {
            this.restaurants = await sortListByKey(this.restaurants,'name');
        }
        this.renderList(this.restaurants);
    }
    prepareTemplate(template, item) {
        let url = template.querySelector('a').getAttribute('href');
        template.querySelector('a').setAttribute('href',`${url}?id=${item.id}`);
        template.querySelector('img').src = item.img;
        template.querySelector('img').setAttribute('alt',item.name);
        template.querySelector('.restaurant-card__name').textContent = item.name;
        template.querySelector('.restaurant-card__text').textContent = '30 minutes';
        if(template.querySelector('.restaurant-card__addres')){
            template.querySelector('.restaurant-card__addres').textContent += item.address;
        }
        return template;
    }
    renderList(list) {
        this.parent.innerHTML = '';
        const template = document.getElementById('restaurant-card-template');
        renderListWithTemplate(
            template,
            this.parent,
            list,
            this.prepareTemplate
        );
    }
}