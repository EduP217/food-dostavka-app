import {renderListWithTemplate, addItemToCart} from './utils';

export default class MenuList {
    constructor(menuParent, restaurant) {
        this.menuParent = menuParent;
        this.restaurant = restaurant;
    }
    async init() {
        document.getElementById('restaurantTitle').textContent = this.restaurant.name;
        document.getElementById('restaurant-info-img').setAttribute('src', this.restaurant.img);
        document.getElementById('restaurant-info-img').setAttribute('alt', this.restaurant.name);
        document.querySelector('.restaurant-address').textContent = this.restaurant.address;
        this.renderList(this.restaurant.menu);
    }
    prepareTemplate(template, item) {
        template.querySelector('img').src = item.img;
        template.querySelector('img').setAttribute('alt',item.name);
        template.querySelector('.menu-title').textContent = item.name;
        template.querySelector('.menu-description').textContent = item.description;
        template.querySelector('.menu-price').textContent = `$ ${parseFloat(item.price).toFixed(2)}`;
        template.querySelector('button').addEventListener('click', addItemToCart.bind(this,item));
        return template;
    }
    renderList(list) {
        this.menuParent.innerHTML = '';
        const template = document.getElementById('menu-card-template');
        renderListWithTemplate(
            template,
            this.menuParent,
            list,
            this.prepareTemplate
        );
    }
}