import {
  clearCurrentUser,
  formatCurrency,
  getCart,
  getCurrentUser,
  getOrders,
  getSavedReviewCount
} from '../shared/app-data.js';
import { initCommerceMotion, wirePageProgress } from '../shared/commerce.js';

const currentUser = getCurrentUser();
const orders = getOrders();

function renderProfile() {
  const avatar = document.getElementById('profile-avatar');
  const name = document.getElementById('profile-name');
  const email = document.getElementById('profile-email');
  const heroTitle = document.getElementById('profile-hero-title');
  const heroCopy = document.getElementById('profile-hero-copy');
  const accountBtn = document.getElementById('account-btn');
  const signoutBtn = document.getElementById('signout-btn');

  if (currentUser) {
    const displayName =
      String(currentUser.username || currentUser.name || currentUser.email || 'Maison Client').trim();
    const avatarText = displayName.slice(0, 2).toUpperCase() || 'ML';
    const displayEmail = currentUser.email || 'No email saved';

    avatar.textContent = avatarText;
    name.textContent = displayName;
    email.textContent = displayEmail;
    heroTitle.textContent = `Welcome back, ${displayName}`;
    heroCopy.textContent = 'Your account center keeps track of saved reviews, local orders, and the fragrances waiting in your cart.';
    accountBtn.textContent = 'Account Ready';
    accountBtn.href = '../login.html';
    signoutBtn.disabled = false;
    return;
  }

  avatar.textContent = 'ML';
  name.textContent = 'Guest Client';
  email.textContent = 'Sign in to personalize this space.';
  heroTitle.textContent = 'Your Profile';
  heroCopy.textContent = 'Sign in to keep your fragrance preferences, checkout history, and review activity connected across the store.';
  accountBtn.textContent = 'Account';
  accountBtn.href = '../login.html';
  signoutBtn.disabled = true;
}

function renderStats() {
  document.getElementById('profile-cart-count').textContent = String(getCart().length);
  document.getElementById('profile-order-count').textContent = String(orders.length);
  document.getElementById('profile-review-count').textContent = String(getSavedReviewCount());
}

function renderOrders() {
  const ordersList = document.getElementById('orders-list');

  if (!orders.length) {
    ordersList.innerHTML = `
      <article class="empty-state" data-card>
        <h3 class="panel-title">No orders yet.</h3>
        <p class="muted">Once you place an order, it will appear here with totals and the order reference.</p>
        <a class="primary-btn" href="../store.html">Start Shopping</a>
      </article>
    `;
    return;
  }

  ordersList.innerHTML = orders
    .slice(0, 4)
    .map(
      (order) => `
        <article class="order-card" data-card>
          <span class="status-pill">${order.status}</span>
          <h3>${order.id}</h3>
          <p>${new Date(order.createdAt).toLocaleString()}</p>
          <p>${order.items.length} item${order.items.length === 1 ? '' : 's'} • ${formatCurrency(order.total)}</p>
          <p>${order.customer.name} • ${order.customer.city}, ${order.customer.country}</p>
        </article>
      `
    )
    .join('');
}

document.getElementById('signout-btn')?.addEventListener('click', () => {
  clearCurrentUser();
  window.location.href = '../login.html';
});

renderProfile();
renderStats();
renderOrders();
initCommerceMotion();
wirePageProgress();
