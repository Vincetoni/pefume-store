import { products } from '../products.js';

export const STORAGE_KEYS = {
  cart: 'cart',
  currentUser: 'currentUser',
  users: 'users',
  productReviews: 'productReviews',
  orders: 'orders',
  selectedProductId: 'selectedProductId'
};

function readJson(key, fallback) {
  const raw = localStorage.getItem(key);
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getProducts() {
  return products;
}

export function getProductById(productId) {
  return products.find((product) => product.id === Number(productId)) || null;
}

export function getCurrentUser() {
  return readJson(STORAGE_KEYS.currentUser, null);
}

export function setCurrentUser(user) {
  writeJson(STORAGE_KEYS.currentUser, user);
}

export function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
}

export function getUsers() {
  return readJson(STORAGE_KEYS.users, []);
}

export function getCart() {
  return readJson(STORAGE_KEYS.cart, []);
}

export function saveCart(cart) {
  writeJson(STORAGE_KEYS.cart, cart);
}

export function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  return cart;
}

export function removeCartItemByIndex(index) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return cart;
  cart.splice(index, 1);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function groupCartItems(cart = getCart()) {
  const grouped = new Map();

  cart.forEach((item, index) => {
    const existing = grouped.get(item.id);
    if (existing) {
      existing.quantity += 1;
      existing.indices.push(index);
      return;
    }

    grouped.set(item.id, {
      ...item,
      quantity: 1,
      indices: [index]
    });
  });

  return Array.from(grouped.values());
}

export function getCartSubtotal(cart = getCart()) {
  return cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
}

export function getShippingCost(cart = getCart()) {
  const subtotal = getCartSubtotal(cart);
  if (!cart.length) return 0;
  return subtotal >= 1000 ? 0 : 35;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

export function getOrders() {
  return readJson(STORAGE_KEYS.orders, []);
}

export function saveOrders(orders) {
  writeJson(STORAGE_KEYS.orders, orders);
}

export function createOrder(payload) {
  const orders = getOrders();
  const order = {
    id: `ML-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    ...payload
  };

  orders.unshift(order);
  saveOrders(orders);
  clearCart();
  return order;
}

export function getStoredReviews() {
  return readJson(STORAGE_KEYS.productReviews, {});
}

export function getSavedReviewCount() {
  const reviews = getStoredReviews();
  return Object.values(reviews).reduce((sum, list) => sum + list.length, 0);
}

export function setSelectedProduct(productId) {
  localStorage.setItem(STORAGE_KEYS.selectedProductId, String(productId));
}
