import {
  convertToJson
} from './utils.js';

export default class ExternalServices {
  constructor() {}
  getRestaurants() {
    return fetch('https://mocki.io/v1/8268b548-6a9c-4c3c-814a-a7828e95df39')
      .then(convertToJson)
      .then(res => res);
  }
  
  async findRestaurantById(id) {
    const restaurants = await this.getRestaurants();
    const restaurant = restaurants.find((item) => item.id === id);
    await restaurant.menu.map((m)=>{
      m["restaurant"] = restaurant.name;
      return m;
    });
    return restaurant;
  }

  validatePayment(payment) {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'wallet-test-payment.p.rapidapi.com',
        'X-RapidAPI-Key': 'e62242969bmsh1e454af0a24e4acp10cf2djsnc0789a5b1f25'
      },
      body: JSON.stringify(payment)
    };

    return fetch('https://wallet-test-payment.p.rapidapi.com/checkout', options)
      .then(convertToJson)
      .then(res => res)
      .catch(err => {
        throw err
      });
  }

  createOrder(purchaseOrder) {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'my-store2.p.rapidapi.com',
        'X-RapidAPI-Key': 'e62242969bmsh1e454af0a24e4acp10cf2djsnc0789a5b1f25'
      },
      body: JSON.stringify(purchaseOrder)
    };

    return fetch('https://my-store2.p.rapidapi.com/order/new', options)
      .then(convertToJson)
      .then(res => res)
      .catch(err => {
        throw err
      });
  }

  getOrder(purchaseOrderId) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'my-store2.p.rapidapi.com',
        'X-RapidAPI-Key': 'e62242969bmsh1e454af0a24e4acp10cf2djsnc0789a5b1f25'
      }
    };
    return fetch(`https://my-store2.p.rapidapi.com/order/${purchaseOrderId}`, options)
      .then(convertToJson)
      .then(res => res)
      .catch(err => {
        throw err
      });
  }
}
