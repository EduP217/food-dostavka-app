import { getShipmentAddressComponents, getParams } from './utils.js';
import ExternalServices from './ExternalServices.js';
import RestaurantList from './restaurantList.js';
import MenuList from './menuList.js';

const services = new ExternalServices();

export default class RestaurantListing {
    constructor(){}
    async init(){
        const topRestaurantsParent = document.getElementById('top-restaurants-list');
        const restaurantsParent = document.getElementById('restaurants-list');
        const menusParent = document.getElementById('menu-card-list');
        if(topRestaurantsParent){
            const shipmentAddressComponents = getShipmentAddressComponents();
            const restaurants = await services.getRestaurants();
            const topRestaurantList = new RestaurantList(topRestaurantsParent,restaurants,shipmentAddressComponents.shipmentCountryCode,true);
            await topRestaurantList.init();
        } else if(restaurantsParent){
            const keywords = getParams('keywords');
            const shipmentAddressComponents = getShipmentAddressComponents();
            const restaurants = await services.getRestaurants();
            const restaurantsList = new RestaurantList(restaurantsParent,restaurants,shipmentAddressComponents.shipmentCountryCode,false,keywords);
            await restaurantsList.init();
            document.getElementById('sorting').addEventListener('change',(e) => {
                restaurantsList.sortRestaurants(e.target.value);
            });
        } else if(menusParent){
            const restaurantId = getParams("id");
            const restaurant = await services.findRestaurantById(restaurantId);
            const menuList = new MenuList(menusParent, restaurant);
            await menuList.init();
        }
    }
}
