import { getParams } from './utils.js';
import HistoryOrders from './history-order.js';

const user = getParams('user');
console.log(user);

if(user){
    const parent = document.getElementById("historyOrdersPanels");
    const historyorders = new HistoryOrders(parent, user);
    const orders = await historyorders.init();
    //console.log(orders);
    document.getElementById('username').innerHTML = user;
}