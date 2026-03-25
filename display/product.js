import { products } from './products.js';

const STORAGE_SELECTED_KEY = 'selectedProductId';
const CART_KEY = 'cart';

const productHero = document.getElementById('product-hero');
const imageEl = document.getElementById('product-image');
const nameEl = document.getElementById('product-name');
const priceEl = document.getElementById('product-price');
const oldPriceEl = document.getElementById('product-old-price');
const discountBadge = document.getElementById('discount-badge');
const shippingBadge = document.getElementById('shipping-badge');
const longDescEl = document.getElementById('product-long');
const shortDescEl = document.getElementById('product-short');
const ratingEl = document.getElementById('product-rating');
const reviewsList = document.getElementById('reviews-list');
const recommendationsEl = document.getElementById('recommendations');
const addToCartBtn = document.getElementById('add-to-cart');
const buyNowBtn = document.getElementById('buy-now');

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderStars(rating) {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const total = 5;

  for (let i = 0; i < total; i += 1) {
    if (i < full) {
      stars.push('<span class="star">★</span>');
    } else if (i === full && hasHalf) {
      stars.push('<span class="star is-half">★</span>');
    } else {
      stars.push('<span class="star is-empty">★</span>');
    }
  }

  return `<span class="stars">${stars.join('')}</span>`;
}

function applyTheme(product) {
  if (!product || !product.colors) return;
  const root = document.documentElement;
  root.style.setProperty('--product-bg', product.colors.bg);
  root.style.setProperty('--product-text', product.colors.text);
  root.style.setProperty('--product-accent', product.colors.accent);
  root.style.setProperty('--accent', product.colors.accent);

  if (productHero && product.backgroundEffect) {
    productHero.style.background = product.backgroundEffect;
  }
}

function renderProduct(product) {
  if (!product) return;

  document.title = `Maison Logos - ${product.name}`;
  applyTheme(product);

  if (imageEl) {
    imageEl.src = product.image;
    imageEl.alt = product.name;
  }

  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `$${product.price}`;

  if (oldPriceEl) {
    if (product.oldPrice) {
      oldPriceEl.textContent = `$${product.oldPrice}`;
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }
  }

  if (discountBadge) {
    if (product.discount) {
      discountBadge.textContent = product.discount;
      discountBadge.style.display = 'inline-flex';
    } else {
      discountBadge.style.display = 'none';
    }
  }

  if (shippingBadge) {
    shippingBadge.textContent = product.freeShipping ? 'Free Shipping' : 'Ships Worldwide';
  }

  if (longDescEl) longDescEl.textContent = product.longDescription;
  if (shortDescEl) shortDescEl.textContent = product.shortDescription;

  if (ratingEl) {
    ratingEl.innerHTML = `${renderStars(product.rating)}<span>${product.rating.toFixed(1)} / 5</span>`;
  }

  if (reviewsList) {
    reviewsList.innerHTML = product.reviews
      .map(
        (review) => `
          <article class="review-card">
            <div class="review-name">${review.name}</div>
            <div class="review-stars">${renderStars(review.rating)}</div>
            <p class="review-comment">${review.comment}</p>
          </article>
        `
      )
      .join('');
  }

  if (recommendationsEl) {
    const recommendations = products
      .filter((item) => item.id !== product.id)
      .slice(0, 3);

    recommendationsEl.innerHTML = recommendations
      .map(
        (item) => `
          <article class="product-card" data-product-id="${item.id}" role="button" tabindex="0">
            <div class="product-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-details">
              <h2 class="product-name">${item.name}</h2>
              <p class="product-price">$${item.price}</p>
              <p class="product-desc">${item.shortDescription}</p>
              <button class="product-card-btn" data-product-id="${item.id}" type="button">View Details</button>
            </div>
          </article>
        `
      )
      .join('');
  }

  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      const cart = getCart();
      cart.push(product);
      saveCart(cart);
      alert(`${product.name} has been added to your cart.`);
    };
  }

  if (buyNowBtn) {
    buyNowBtn.onclick = () => {
      window.location.href = 'checkout.html';
    };
  }
}

function getSelectedProduct() {
  const selectedId = Number(localStorage.getItem(STORAGE_SELECTED_KEY));
  if (!Number.isNaN(selectedId)) {
    return products.find((product) => product.id === selectedId);
  }
  return null;
}

function wireRecommendationClicks() {
  if (!recommendationsEl) return;

  recommendationsEl.addEventListener('click', (event) => {
    const card = event.target.closest('[data-product-id]');
    if (!card) return;
    const productId = Number(card.dataset.productId);
    if (!Number.isNaN(productId)) {
      localStorage.setItem(STORAGE_SELECTED_KEY, String(productId));
      window.location.href = 'product.html';
    }
  });

  recommendationsEl.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('[data-product-id]');
    if (!card) return;
    event.preventDefault();
    const productId = Number(card.dataset.productId);
    if (!Number.isNaN(productId)) {
      localStorage.setItem(STORAGE_SELECTED_KEY, String(productId));
      window.location.href = 'product.html';
    }
  });
}

function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  window.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
}

const selectedProduct = getSelectedProduct() || products[0];
renderProduct(selectedProduct);
wireRecommendationClicks();
initCursor();
