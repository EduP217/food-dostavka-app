import {renderWithTemplate, reduceObjByNumber} from './utils';

export default class RestaurantList {
    constructor(listParent) {
        this.listParent = listParent;
    }
    async init() {
        let list = await this.getRestaurants();
        this.renderList(list);
    }
    async getRestaurantsFilteredByLocation(countryCode) {
        if (!countryCode) {
            return;
        }
        let list = await this.getRestaurants();
        list = Object.fromEntries(Object.entries(list).filter((item) => item[1].country === countryCode));
        list = reduceObjByNumber(list, 5);
        this.renderList(list);
    }
    getRestaurants() {
        return fetch("../json/Restaurants.json")
            .then(response => response.json());
    }
    renderList(list) {
        // make sure the list is empty
        this.listParent.innerHTML = '';
        //get the template
        const template = document.getElementById('product-card-template');
        for (let key in list) {
            let item = list[key];
            item.Name = key;

            renderWithTemplate(
                template,
                this.listParent,
                item,
                this.prepareTemplate
            );
        }
    }
    prepareTemplate(template, item) {
        template.querySelector('img').src = item.img;
        template.querySelector('.restaurant-card__name').textContent = item.Name;
        template.querySelector('.restaurant-card__text').textContent = '30 minutes';

        return template;
    }
}