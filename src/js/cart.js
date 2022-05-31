import {
    loadHeaderFooter
} from './utils.js';
import CartCheckout from './cart-checkout.js';

new Promise(async () => {
    await loadHeaderFooter(true);

    const cartParent = document.getElementById('cart-parent');
    const cartCheckout = new CartCheckout(cartParent, 'so-cart');
    cartCheckout.init().then(() => {
        document.querySelectorAll('button[data-id]').forEach((c) => {
            c.addEventListener('click', cartCheckout.removeItem.bind(cartCheckout, c));
        })
    });
});