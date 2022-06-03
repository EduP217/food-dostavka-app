import {renderListWithTemplate} from './utils.js';
import ExternalServices from "./ExternalServices";
const services = new ExternalServices();

export default class HistoryOrders {
    constructor(parent, username){
        this.parent = parent;
        this.username = username;
    }
    async init(){
        const orders = await services.getOrders();
        console.log(orders);
        this.renderList(orders);
    }
    prepareTemplate(template, order) {
        let panel = document.createElement('div');
        panel.classList.add('panel');
        let orderId = document.createElement('h2');
        orderId.textContent = `${order.id} - ${order.date}`;
        panel.append(orderId);

        order.items.map((i) => {
            let templateClone = template.cloneNode(true);
            templateClone.querySelector('img').setAttribute('src',i.image);
            templateClone.querySelector('img').setAttribute('alt',i.name);
            templateClone.querySelector('h3').textContent = i.name;
            templateClone.querySelector('p.description').innerHTML = i.description;
            templateClone.querySelector('.restaurant').textContent = i.restaurant;
            templateClone.querySelector('.qty').textContent = i.qty;
            templateClone.querySelector('.price').textContent = parseFloat(i.price).toFixed(2);
            panel.append(templateClone);
        })

        return panel;
    }
    renderList(list) {
        this.parent.innerHTML = '';
        const template = document.getElementById('panel-item-template');
        renderListWithTemplate(
            template,
            this.parent,
            list,
            this.prepareTemplate
        );
    }
}