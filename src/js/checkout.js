import {
    loadHeaderFooter,
    getShipmentAddressComponents,
    insideAlert,
    validateForm,
    removeLocalStorage,
    validatePayment,
    createOrder
} from './utils.js';

new Promise(async () => {
    await loadHeaderFooter(true).then(()=>{
        const shipmentAddressComponenta = getShipmentAddressComponents();
        document.getElementById('address').value = shipmentAddressComponenta.shipmentAddress;
        document.getElementById('city').value = shipmentAddressComponenta.shipmentCity;
        document.getElementById('country').value = shipmentAddressComponenta.shipmentCountry;
        document.getElementById('pcode').value = shipmentAddressComponenta.shipmentPostalCode;
    });

    document.getElementById('formCheckout').addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('PreventDefault');
        const form = e.target;
        console.log(form);

        const validation = validateForm(form);
        console.log(validation);
        const parent = document.querySelector('.alert-container');
        if(validation.errors.length > 0){
            validation.errors.reverse().forEach((v)=>{
                insideAlert(parent,v[0],v[1],true);
            });
        } else {
            try {
                let newOrder = {
                    "customer": validation.map.lastname + " " + validation.map.name,
                    "address": validation.map.address + ", " + validation.map.city + ", " + validation.map.country
                }

                const paymentServiceResp = await validatePayment();
                console.log(paymentServiceResp);

                let paymentValid = (paymentServiceResp && paymentServiceResp.transactionId);
                if(paymentValid){
                    newOrder["transactionId"] = paymentServiceResp.transactionId;
                    const orderServiceResp = await createOrder(newOrder);
                    console.log(orderServiceResp);
                    removeLocalStorage('so-cart');
                    window.location.assign(`/views/checkedout.html?orderId=${orderServiceResp.id}`);
                }
            } catch (err) {
                console.log(err);
                for (let key in err.message) {
                    insideAlert(parent,"Service Error Message",err.message[key], true);
                }
            }
        }
    });
});