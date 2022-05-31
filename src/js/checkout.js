import {
    loadHeaderFooter,
    insideAlert,
    getShipmentAddressComponents
} from './utils.js';

new Promise(async () => {
    await loadHeaderFooter(true).then(()=>{
        const shipmentAddressComponenta = getShipmentAddressComponents();
        document.getElementById('address').value = shipmentAddressComponenta.shipmentAddress;
        document.getElementById('city').value = shipmentAddressComponenta.shipmentCity;
        document.getElementById('country').value = shipmentAddressComponenta.shipmentCountry;
        document.getElementById('pcode').value = shipmentAddressComponenta.shipmentPostalCode;
    });
    
    

    document.getElementById('formCheckout').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('PreventDefault');
        const parent = document.querySelector('.alert-container');
        insideAlert(parent,"Alert Example","This is an alert example",true);
    });
});