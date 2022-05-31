import {setLocalStorage,getLocalStorage, renderListWithTemplate, addItemToCart, getShipmentAddressComponents, getShipmentAmmounts, insideAlert} from './utils.js';
  
export default class CartCheckout {
    constructor(cartParent, cartKey) {
        this.cartParent = cartParent;
        this.cartKey = cartKey;
    }
    init() {
        return new Promise(async (res) => {
            setLocalStorage(this.cartKey, [
                {
                    "id": "PE-001",
                "name": "Estofado de novillo",
                "description": "Estofado de novillo cocido lentamente, entomatado con ajo frito y majado de yuca con sobrasada casera",
                "unit-price": 16.00,
                "qty": 2,
                "image": "/images/restaurant1.jpg",
                "restaurant": "Astrid & Gaston"
                },
                {
                    "id": "PE-002",
                "name": "CORVINA Y OLLUCO",
                "description": "Limón Rugoso • Lechuga de Mar • Coco",
                "unit-price": 9.00,
                "qty": 1,
                "image": "/images/restaurant2.jpg",
                "restaurant": "KJOLLE"
                }
            ]);
            const cartData = getLocalStorage(this.cartKey);
            console.log(cartData);
            this.ableDisableCheckout(cartData.length);
            this.renderListCart(cartData);
            this.renderShipmentDetails(cartData);
            res();
        });
    }
    renderTemplate(template, item) {
        template.querySelector('img').src = item.image;
        template.querySelector('img').alt = item.name;
        template.querySelector('label').textContent = item.qty;
        template.querySelector('h3').textContent = item.name;
        template.querySelector('p').textContent = item.description;
        template.querySelector('span').innerHTML = `<b>Unit Price:</b> $${parseFloat(item['unit-price'])}`;
        template.querySelector('button').setAttribute('data-id', item.id);
        return template;
    }
    renderListCart(data) {
        this.cartParent.innerHTML = "";
        const template = document.getElementById('cart-item-template');
        renderListWithTemplate(template,this.cartParent,data,this.renderTemplate);
    }
    renderShipmentDetails(data) {
        const shipmentAddressComponenta = getShipmentAddressComponents();
        console.log(shipmentAddressComponenta);

        const shipmentAmounts = getShipmentAmmounts(data);

        document.getElementById('order-delivery-address').innerHTML = 
            shipmentAddressComponenta.shipmentAddress + '<br>' +
            shipmentAddressComponenta.shipmentCity + '<br>' +
            shipmentAddressComponenta.shipmentCountry + '<br>' +
            shipmentAddressComponenta.shipmentPostalCode;
        
        document.getElementById('order-subtotal').textContent = `$${shipmentAmounts.subtotal}`;
        document.getElementById('order-taxes').textContent = `$${shipmentAmounts.taxes}`;
        document.getElementById('order-total').textContent = `$${shipmentAmounts.total}`;
    }
    removeItem(c) {
        const itemId = c.getAttribute('data-id');
        console.log("hello "+ itemId);
        let storeData = getLocalStorage(this.cartKey);
        storeData = storeData.filter(i => {if(i.id != itemId) return i;});
        setLocalStorage(this.cartKey, storeData);
        this.ableDisableCheckout(storeData.length);
        this.renderShipmentDetails(storeData);
        const itemNode = c.parentNode;
        const rootNode = itemNode.parentNode;
        rootNode.removeChild(itemNode);
    }
    ableDisableCheckout(listSize){
        if(listSize>0){
            document.getElementById('checkout-button').removeAttribute('disabled');
            document.getElementById('checkout-button').classList.remove('btn-disabled');
        } else {
            document.getElementById('checkout-button').setAttribute('disabled', 'disabled');
            document.getElementById('checkout-button').classList.add('btn-disabled');
            const parent = document.querySelector('.alert-container');
            insideAlert(parent, "Empty Cart", "Your cart is currently empty. To continue with the checkout you must add some products.", true);
        }
    }
}