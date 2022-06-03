import {
    loadHeaderFooter,
    getParams,
    formatDate
} from './utils.js';
import ExternalServices from './ExternalServices.js';

const services = new ExternalServices();

new Promise(async () => {
    await loadHeaderFooter(true).then(async ()=>{
        const paramValue = getParams('orderId');
        console.log(paramValue);
        const order = await services.getOrder(paramValue);
        console.log(order);
        document.getElementById('orderId').textContent = order.order.id;
        document.getElementById('orderClient').textContent = order.order.customer;
        document.getElementById('orderDate').textContent = formatDate(order.order.created);
        document.getElementById('orderAddress').textContent = order.order.address;
    });
});