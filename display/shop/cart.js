import {
  clearCart,
  formatCurrency,
  getCart,
  getCartSubtotal,
  getCurrentUser,
  getShippingCost,
  groupCartItems,
  removeCartItemByIndex
} from '../shared/app-data.js';
import { initCommerceMotion, wirePageProgress } from '../shared/commerce.js';

const cartList = document.getElementById('cart-list');
const clearCartBtn = document.getElementById('clear-cart-btn');
const cartAccountChip = document.getElementById('cart-account-chip') || document.getElementById('store-user-label');
const profileButton = document.getElementById('profile-button');

function updateSummary(cart) {
  const grouped = groupCartItems(cart);
  const subtotal = getCartSubtotal(cart);
  const shipping = getShippingCost(cart);
  const total = subtotal + shipping;

  document.getElementById('cart-metric-items').textContent = String(cart.length);
  document.getElementById('cart-metric-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('cart-metric-shipping').textContent = shipping === 0 ? 'Free' : formatCurrency(shipping);
  document.getElementById('summary-items').textContent = `${cart.length} item${cart.length === 1 ? '' : 's'}`;
  document.getElementById('summary-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('summary-shipping').textContent = shipping === 0 ? 'Free' : formatCurrency(shipping);
  document.getElementById('summary-total').textContent = formatCurrency(total);

  const note = document.getElementById('cart-summary-note');
  if (note) {
    note.textContent = grouped.length
      ? 'Your collection is ready for checkout. You can still remove single items or clear everything.'
      : 'Your collection is empty right now. Explore the store and add a few signature scents.';
  }
}

function renderCart() {
  const cart = getCart();
  const grouped = groupCartItems(cart);

  if (!grouped.length) {
    cartList.innerHTML = `
      <article class="empty-state" data-card>
        <p class="eyebrow">Collection Empty</p>
        <h2 class="panel-title">No fragrances in your tray yet.</h2>
        <p class="muted">Try the store, add a bottle you love, and come back here to review your order.</p>
        <a class="primary-btn" href="../store.html">Browse Store</a>
      </article>
    `;
    updateSummary(cart);
    return;
  }

  cartList.innerHTML = grouped
    .map(
      (item) => `
        <article class="product-card" data-card>
          <div class="product-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-line__meta">
            <p class="eyebrow">${item.category}</p>
            <h3>${item.name}</h3>
            <p>${item.shortDescription}</p>
            <div class="chip-row">
              <span class="inline-pill">Qty ${item.quantity}</span>
              <span class="inline-pill">${item.freeShipping ? 'Free Shipping' : 'Standard Shipping'}</span>
            </div>
          </div>
          <div class="cart-line__actions">
            <strong class="price-tag">${formatCurrency(item.price * item.quantity)}</strong>
            <button class="ghost-btn" type="button" data-remove-index="${item.indices[0]}">Remove One</button>
          </div>
        </article>
      `
    )
    .join('');

  updateSummary(cart);
}

cartList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove-index]');
  if (!button) return;

  const itemIndex = Number(button.dataset.removeIndex);
  removeCartItemByIndex(itemIndex);
  renderCart();
});

clearCartBtn?.addEventListener('click', () => {
  clearCart();
  renderCart();
});

const currentUser = getCurrentUser();
if (cartAccountChip) {
  cartAccountChip.textContent = currentUser ? `Signed in: ${currentUser.username}` : 'Guest Mode';
}

profileButton?.addEventListener('click', () => {
  window.location.href = './profile.html';
});

renderCart();
initCommerceMotion();
wirePageProgress();
