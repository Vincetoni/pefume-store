import { products } from './products.js';

const productContainer = document.getElementById('product');
const dropdown = document.getElementById('category-dropdown');
const dropdownButton = dropdown ? dropdown.querySelector('.dropbtn') : null;
const searchInputs = document.querySelectorAll('[data-search]');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const cartBtn = document.getElementById('cart');

const STORAGE_SELECTED_KEY = 'selectedProductId';
const CART_KEY = 'cart';

let activeCategory = 'All';
let searchTerm = '';
let currentFilter = 'all';
let currentSort = null;

function setSelectedProduct(productId) {
  localStorage.setItem(STORAGE_SELECTED_KEY, String(productId));
  window.location.href = 'product.html';
}

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function displayProducts(productsToDisplay) {
  if (!productContainer) return;

  if (productsToDisplay.length === 0) {
    productContainer.innerHTML = '<p>No products found in this category.</p>';
    return;
  }

  productContainer.innerHTML = productsToDisplay
    .map(
      (perfume) => `
        <article class="product-card" data-product-id="${perfume.id}" role="button" tabindex="0">
            <div class="product-image">
                <img src="${perfume.image}" alt="${perfume.name}">
            </div>
            <div class="product-details">
                <h2 class="product-name">${perfume.name}</h2>
                <p class="product-price">$${perfume.price}</p>
                <p class="product-desc">${perfume.shortDescription}</p>
                <div class="product-card-actions">
                    <button class="product-card-btn" data-product-id="${perfume.id}" type="button">
                        View Details
                    </button>
                    <button class="product-card-cart" data-product-id="${perfume.id}" type="button" aria-label="Add to cart">
                        <ion-icon name="cart-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </article>
    `
    )
    .join('');

  attachCursorEffects();
}

function applyFilters() {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  let filtered = products.filter((perfume) => {
    const matchesCategory = activeCategory === 'All' || perfume.category === activeCategory;
    if (!matchesCategory) return false;

    if (currentFilter !== 'all' && perfume.theme !== currentFilter) return false;

    if (!normalizedSearch) return true;
    const haystack = `${perfume.name} ${perfume.shortDescription} ${perfume.longDescription} ${perfume.category} ${perfume.theme}`.toLowerCase();
    return haystack.includes(normalizedSearch);
  });

  if (currentSort === 'low') {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (currentSort === 'high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

function setActiveCategory(category) {
  activeCategory = category;
  if (dropdownButton) {
    dropdownButton.textContent = category === 'All' ? 'Categories' : category;
  }
  applyFilters();
}

function attachCursorEffects() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.opacity = '0.2';
    });

    card.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.opacity = '1';
    });
  });

  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      cursor.style.width = '60px';
      cursor.style.height = '60px';
      cursor.style.border = '1px solid var(--text-dark)';
      cursor.style.background = 'transparent';
    });

    btn.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.border = 'none';
      cursor.style.background = 'var(--text-dark)';
    });
  });
}

// Category filtering
const categoryLinks = document.querySelectorAll('[data-category]');
categoryLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedCategory = event.currentTarget.getAttribute('data-category') || 'All';
    setActiveCategory(selectedCategory);

    if (dropdown) {
      dropdown.classList.remove('is-open');
      if (dropdownButton) dropdownButton.setAttribute('aria-expanded', 'false');
    }

    if (mobileMenuToggle) {
      mobileMenuToggle.checked = false;
    }
  });
});

// Dropdown open/close
if (dropdown && dropdownButton) {
  dropdownButton.addEventListener('click', (event) => {
    event.preventDefault();
    const willOpen = !dropdown.classList.contains('is-open');
    dropdown.classList.toggle('is-open');
    dropdownButton.setAttribute('aria-expanded', String(willOpen));
  });

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('is-open');
      dropdownButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// Search
if (searchInputs.length) {
  searchInputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      searchTerm = event.target.value || '';
      searchInputs.forEach((other) => {
        if (other !== event.target) {
          other.value = searchTerm;
        }
      });
      applyFilters();
    });
  });
}

// Mood filters
document.querySelectorAll('[data-filter]').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter || 'all';

    document.querySelectorAll('[data-filter]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    applyFilters();
  });
});

// Sort
document.querySelectorAll('[data-sort]').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentSort = btn.dataset.sort || null;

    document.querySelectorAll('[data-sort]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    applyFilters();
  });
});

// Product card click -> preview
if (productContainer) {
  productContainer.addEventListener('click', (event) => {
    const cartButton = event.target.closest('.product-card-cart');
    if (cartButton) {
      event.stopPropagation();
      const productId = Number(cartButton.dataset.productId);
      if (!Number.isNaN(productId)) {
        const cart = getCart();
        const product = products.find((item) => item.id === productId);
        if (product) {
          cart.push(product);
          localStorage.setItem(CART_KEY, JSON.stringify(cart));
          alert(`${product.name} has been added to your cart.`);
        }
      }
      return;
    }

    const card = event.target.closest('[data-product-id]');
    if (!card) return;

    const productId = Number(card.dataset.productId);
    if (!Number.isNaN(productId)) {
      setSelectedProduct(productId);
    }
  });

  productContainer.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('[data-product-id]');
    if (!card) return;
    event.preventDefault();
    const productId = Number(card.dataset.productId);
    if (!Number.isNaN(productId)) {
      setSelectedProduct(productId);
    }
  });
}

// Cart button summary
if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    const cart = getCart();
    if (!cart.length) {
      alert('Your collection is currently empty.');
      return;
    }

    const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
    const itemNames = cart.map((item) => item.name).join('\n- ');
    alert(`YOUR COLLECTION:\n- ${itemNames}\n\nTOTAL VALUE: $${total}`);
  });
}

applyFilters();

const cursor = document.querySelector('.cursor');
if (cursor) {
  window.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
}

const footer = document.querySelector('.site-footer');
const footerParallax = document.querySelector('.footer-parallax');

function updateFooterParallax() {
  if (!footer || !footerParallax) return;
  const rect = footer.getBoundingClientRect();
  const viewport = window.innerHeight || 0;
  const total = rect.height + viewport;
  const progress = Math.min(1, Math.max(0, (viewport - rect.top) / total));
  const translate = (progress * 60 - 30).toFixed(2);
  footerParallax.style.transform = `translateY(${translate}px)`;
}

if (footer && footerParallax) {
  updateFooterParallax();
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateFooterParallax);
  });
  window.addEventListener('resize', updateFooterParallax);
}
