const allPerfumes = [
  // --- Original 4 from Screenshot ---
  { id: 1, name: "Floral Essence", price: 500, category: "Floral", description: "A delicate blend of jasmine, rose, and white musk, soft, elegant, and timeless.", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, name: "Amber Veil", price: 540, category: "Warm", description: "Rich amber resin and warm vanilla wrapped with saffron for a polished evening trail.", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "Velvet Smoke", price: 620, category: "Woody", description: "Smoked cedar, iris, and dark musk give this bottle a sharper, more mysterious finish.", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, name: "Citrine Bloom", price: 470, category: "Citrus", description: "Bright citrus and neroli open fresh before settling into a creamy floral heart.", image: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?q=80&w=1000&auto=format&fit=crop" },

  // --- New Additions to reach 20 ---
  { id: 5, name: "Midnight Azure", price: 590, category: "Fresh", description: "Deep sea salt and mineral notes meet a heart of white orchid.", image: "https://images.unsplash.com/photo-1595425959632-34f2822322ce?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, name: "Golden Hour", price: 485, category: "Citrus", description: "Sun-drenched bergamot and honeyed apricot that capture the warmth of summer.", image: "https://images.unsplash.com/photo-1557170334-a7c3cd167c74?q=80&w=1000&auto=format&fit=crop" },
  { id: 7, name: "Terra Antiqua", price: 610, category: "Woody", description: "Earthy patchouli and vetiver grounded by ancient sandalwood.", image: "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?q=80&w=1000&auto=format&fit=crop" },
  { id: 8, name: "Silk Petal", price: 525, category: "Floral", description: "A soft, powdery embrace of peony and white tea leaves.", image: "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?q=80&w=1000&auto=format&fit=crop" },
  { id: 9, name: "Oud Noir", price: 750, category: "Woody", description: "Rare agarwood blended with dark leather and spiced cardamom.", image: "https://images.unsplash.com/photo-1588405748347-463ac395610e?q=80&w=1000&auto=format&fit=crop" },
  { id: 10, name: "Silver Mist", price: 420, category: "Fresh", description: "Crisp mountain air, frosted juniper berries, and white sage.", image: "https://images.unsplash.com/photo-1615037563043-022e43859bc3?q=80&w=1000&auto=format&fit=crop" },
  { id: 11, name: "Royal Nectar", price: 680, category: "Warm", description: "A gourmand masterpiece of wild honey, tonka bean, and roasted almonds.", image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1000&auto=format&fit=crop" },
  { id: 12, name: "Desert Rose", price: 530, category: "Floral", description: "Damask rose blooming against a backdrop of dry sand and warm spice.", image: "https://images.unsplash.com/photo-1616948055677-18451f28b261?q=80&w=1000&auto=format&fit=crop" },
  { id: 13, name: "Ivory Coast", price: 460, category: "Fresh", description: "Clean linen and coastal breeze mixed with a hint of green apple.", image: "https://images.unsplash.com/photo-1512203530485-25a2ae20993a?q=80&w=1000&auto=format&fit=crop" },
  { id: 14, name: "Saffron Sky", price: 510, category: "Warm", description: "Exotic saffron and toasted marshmallow with a dry cedar finish.", image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop" },
  { id: 15, name: "Botanical Zen", price: 440, category: "Fresh", description: "Crushed bamboo leaves and green matcha tea for ultimate clarity.", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop" },
  { id: 16, name: "Crimson Muse", price: 580, category: "Warm", description: "Deep red wine accords, black cherry, and aged oak wood.", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop" },
  { id: 17, name: "Lush Fig", price: 495, category: "Fresh", description: "Ripe Mediterranean figs, milky sap, and sun-warmed earth.", image: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?q=80&w=1000&auto=format&fit=crop" },
  { id: 18, name: "Tobacco Gold", price: 710, category: "Woody", description: "Sweet tobacco leaf, vanilla bean, and a hint of fine whiskey.", image: "https://images.unsplash.com/photo-1541108564883-fa813d39578f?q=80&w=1000&auto=format&fit=crop" },
  { id: 19, name: "Violet Ray", price: 475, category: "Floral", description: "Ethereal violet petals and white suede for a soft, skin-like scent.", image: "https://images.unsplash.com/photo-1595535373192-fc8935bacd89?q=80&w=1000&auto=format&fit=crop" },
  { id: 20, name: "Oceanic Drift", price: 550, category: "Fresh", description: "Cold surf, driftwood, and aquatic musk for a bold marine energy.", image: "https://images.unsplash.com/photo-1590735204551-5a507a216262?q=80&w=1000&auto=format&fit=crop" }
];


//productContainer.innerHTML = productHTML;

let cart = [];
const productContainer = document.getElementById('product');
const dropdown = document.getElementById('category-dropdown');
const dropdownButton = dropdown ? dropdown.querySelector('.dropbtn') : null;
const searchInputs = document.querySelectorAll('[data-search]');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

let activeCategory = "All";
let searchTerm = "";

// 2. The Render Function (This is what builds the HTML)
function displayProducts(productsToDisplay) {
    if (productsToDisplay.length === 0) {
        productContainer.innerHTML = "<p>No products found in this category.</p>";
        return;
    }

    productContainer.innerHTML = productsToDisplay.map(perfume => `
        <article class="product-card">
            <div class="product-image">
                <img src="${perfume.image}" alt="${perfume.name}">
            </div>
            <div class="product-details">
                <h2 class="product-name">${perfume.name}</h2>
                <p class="product-price">$${perfume.price}</p>
                <p class="product-desc">${perfume.description}</p>
                <button class="product-card-btn" data-id="${perfume.id}">
                    Add to Collection
                </button>
            </div>
        </article>
    `).join('');
}

function applyFilters() {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filtered = allPerfumes.filter((perfume) => {
        const matchesCategory = activeCategory === "All" || perfume.category === activeCategory;
        if (!matchesCategory) return false;

        if (!normalizedSearch) return true;
        const haystack = `${perfume.name} ${perfume.description} ${perfume.category}`.toLowerCase();
        return haystack.includes(normalizedSearch);
    });

    displayProducts(filtered);
}

function setActiveCategory(category) {
    activeCategory = category;
    if (dropdownButton) {
        dropdownButton.textContent = category === "All" ? "Categories" : category;
    }
    applyFilters();
}

// 3. Category Filtering
const categoryLinks = document.querySelectorAll('[data-category]');
categoryLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCategory = e.currentTarget.getAttribute('data-category') || "All";
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

// Dropdown open/close behavior
if (dropdown && dropdownButton) {
    dropdownButton.addEventListener('click', (e) => {
        e.preventDefault();
        const willOpen = !dropdown.classList.contains('is-open');
        dropdown.classList.toggle('is-open');
        dropdownButton.setAttribute('aria-expanded', String(willOpen));
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('is-open');
            dropdownButton.setAttribute('aria-expanded', 'false');
        }
    });
}

// Search
if (searchInputs.length) {
    searchInputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            searchTerm = e.target.value || "";
            searchInputs.forEach((other) => {
                if (other !== e.target) {
                    other.value = searchTerm;
                }
            });
            applyFilters();
        });
    });
}

// 4. "Add to Collection" (Using Event Delegation)
productContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-card-btn')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = allPerfumes.find(p => p.id === productId);
        
        if (product) {
            cart.push(product);
            alert(`✨ ${product.name} has been added to your collection!`);
        }
    }
});

// 5. Cart Button Total
const cartBtn = document.getElementById('cart');
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your collection is currently empty.");
        } else {
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            const itemNames = cart.map(item => item.name).join("\n- ");
            alert(`YOUR COLLECTION:\n- ${itemNames}\n\nTOTAL VALUE: $${total}`);
        }
    });
}

// --- CRITICAL STEP: INITIAL RENDER ---
// This line makes sure the products show up as soon as the page loads
applyFilters();

