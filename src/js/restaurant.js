import { getShipmentAddressComponents } from './utils.js';
import ExternalServices from './ExternalServices.js';
import RestaurantList from './restaurantList.js';

const services = new ExternalServices();

export default class Restaurant {
    constructor(){}
    async init(){
        const shipmentAddressComponents = getShipmentAddressComponents();
        const restaurants = await services.getRestaurants();
        const parent = document.getElementById('top-restaurants-list');
        if(parent){
            const restaurantList = new RestaurantList(parent,restaurants,shipmentAddressComponents.shipmentCountryCode,true);
            await restaurantList.init();
        }
    }
}
