import {
  createOrder,
  formatCurrency,
  getCart,
  getCartSubtotal,
  getCurrentUser,
  getShippingCost,
  groupCartItems
} from '../shared/app-data.js';
import { initCommerceMotion, setButtonBusy, wirePageProgress } from '../shared/commerce.js';

const checkoutForm = document.getElementById('checkout-form');
const placeOrderBtn = document.getElementById('place-order-btn');
const checkoutItems = document.getElementById('checkout-items');
const checkoutAccountChip = document.getElementById('checkout-account-chip');

function renderSummary(cart) {
  const grouped = groupCartItems(cart);
  const subtotal = getCartSubtotal(cart);
  const shipping = getShippingCost(cart);
  const total = subtotal + shipping;

  checkoutItems.innerHTML = grouped.length
    ? grouped
        .map(
          (item) => `
            <div class="summary-row">
              <span>${item.name} x${item.quantity}</span>
              <strong>${formatCurrency(item.price * item.quantity)}</strong>
            </div>
          `
        )
        .join('')
    : '<p class="muted">Your cart is empty. Add something beautiful before checkout.</p>';

  document.getElementById('checkout-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'Free' : formatCurrency(shipping);
  document.getElementById('checkout-total').textContent = formatCurrency(total);

  const note = document.getElementById('checkout-note-box');
  if (note) {
    note.textContent = grouped.length
      ? 'Orders placed here are saved locally so they appear on the profile page.'
      : 'Your cart is empty. Head back to the store before placing an order.';
  }
}

function prefillUser() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    checkoutAccountChip.textContent = 'Guest Checkout';
    return;
  }

  checkoutAccountChip.textContent = `Signed in: ${currentUser.username}`;
  document.getElementById('checkout-name').value = currentUser.username;
  document.getElementById('checkout-email').value = currentUser.email;
}

checkoutForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const cart = getCart();

  if (!cart.length) {
    alert('Your cart is empty. Add a product before checking out.');
    return;
  }

  const formData = new FormData(checkoutForm);
  const subtotal = getCartSubtotal(cart);
  const shipping = getShippingCost(cart);
  const total = subtotal + shipping;

  setButtonBusy(placeOrderBtn, true, 'Place Order', 'Placing Order...');
  await new Promise((resolve) => window.setTimeout(resolve, 850));

  const order = createOrder({
    customer: {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      address: String(formData.get('address') || '').trim(),
      city: String(formData.get('city') || '').trim(),
      country: String(formData.get('country') || '').trim()
    },
    payment: {
      last4: String(formData.get('card') || '').replace(/\s+/g, '').slice(-4)
    },
    note: String(formData.get('note') || '').trim(),
    items: cart,
    subtotal,
    shipping,
    total
  });

  setButtonBusy(placeOrderBtn, false, 'Place Order', 'Placing Order...');
  alert(`Order ${order.id} confirmed. Your collection is on its way.`);
  window.location.href = './profile.html';
});

renderSummary(getCart());
prefillUser();
initCommerceMotion();
wirePageProgress();
