import {
    loadHeaderFooter,
    getOrder,
    getParams,
    formatDate
} from './utils.js';

new Promise(async () => {
    await loadHeaderFooter(true).then(async ()=>{
        const paramValue = getParams('orderId');
        console.log(paramValue);
        const order = await getOrder(paramValue);
        console.log(order);
        document.getElementById('orderId').textContent = order.order.id;
        document.getElementById('orderClient').textContent = order.order.customer;
        document.getElementById('orderDate').textContent = formatDate(order.order.created);
        document.getElementById('orderAddress').textContent = order.order.address;
    });
});