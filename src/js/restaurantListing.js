import { getShipmentAddressComponents } from './utils.js';
import ExternalServices from './ExternalServices.js';
import RestaurantList from './restaurantList.js';

const services = new ExternalServices();

export default class RestaurantListing {
    constructor(){}
    async init(){
        const shipmentAddressComponents = getShipmentAddressComponents();
        const restaurants = await services.getRestaurants();
        const topRestaurantsParent = document.getElementById('top-restaurants-list');
        const restaurantsParent = document.getElementById('restaurants-list');
        if(topRestaurantsParent){
            const topRestaurantList = new RestaurantList(topRestaurantsParent,restaurants,shipmentAddressComponents.shipmentCountryCode,true);
            await topRestaurantList.init();
        } else if(restaurantsParent){
            const restaurantsList = new RestaurantList(restaurantsParent,restaurants,shipmentAddressComponents.shipmentCountryCode,false);
            await restaurantsList.init();
            document.getElementById('sorting').addEventListener('change',(e) => {
                restaurantsList.sortRestaurants(e.target.value);
            });
        }
    }
}
