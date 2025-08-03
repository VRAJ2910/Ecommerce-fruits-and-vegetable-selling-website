window.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Sample product data
const products = [
    {
        id: 1,
        name: "Organic Apples",
        category: "fruits",
        price: 2.99,
        originalPrice: 3.99,
        description: "Fresh organic apples from local farms.<br>Sweet and crispy, perfect for snacking or baking.<br>Enjoy a healthy treat every day!",
        image: "newimag/organic_apple.webp",
        rating: 4.5,
        isOrganic: true,
        isExotic: false,
        stock: 100,
        inWishlist: false
    },
    {
        id: 2,
        name: "Fresh Spinach",
        category: "vegetables",
        price: 1.99,
        originalPrice: 2.49,
        description: "Organic spinach leaves, rich in iron.<br>Perfect for salads, smoothies, and cooking.<br>Boost your nutrition with every bite!",
        image: "newimag/spinach.jpg",
        rating: 4.2,
        isOrganic: true,
        isExotic: false,
        stock: 50,
        inWishlist: false
    },
    {
        id: 3,
        name: "Dragon Fruit",
        category: "fruits",
        price: 4.99,
        originalPrice: 5.99,
        description: "Exotic dragon fruit, vibrant and sweet.<br>Rich in antioxidants and vitamin C.<br>Make your snack time exciting!",
        image: "newimag/dragonfruit.avif",
        rating: 4.8,
        isOrganic: false,
        isExotic: true,
        stock: 30,
        inWishlist: false
    },
    {
        id: 4,
        name: "Organic Carrots",
        category: "vegetables",
        price: 1.49,
        originalPrice: 1.99,
        description: "Fresh organic carrots, sweet and crunchy.<br>Perfect for snacking, salads, and cooking.<br>Enjoy natural goodness every day!",
        image: "newimag/carrot.webp",
        rating: 4.3,
        isOrganic: true,
        isExotic: false,
        stock: 75,
        inWishlist: false
    },
    {
        id: 5,
        name: "Mango",
        category: "fruits",
        price: 2.49,
        originalPrice: 2.99,
        description: "Sweet and juicy mangoes, full of flavor.<br>Perfect for smoothies, desserts, or fresh eating.<br>Bring tropical delight to your table!",
        image: "newimag/mang3.jpg",
        rating: 4.6,
        isOrganic: false,
        isExotic: false,
        stock: 60,
        inWishlist: false
    },
    {
        id: 6,
        name: "Organic Broccoli",
        category: "vegetables",
        price: 2.29,
        originalPrice: 2.79,
        description: "Fresh organic broccoli. High in vitamins and perfect for steaming or stir-frying.",
        image: "newimag/brocoli2.jpg",
        rating: 4.4,
        isOrganic: true,
        isExotic: false,
        stock: 40,
        inWishlist: false
    },
    {
        id: 7,
        name: "Strawberries",
        category: "fruits",
        price: 3.99,
        originalPrice: 4.49,
        description: "Sweet and juicy strawberries. Perfect for desserts, smoothies, or eating fresh.",
        image: "newimag/stawberries.jpg",
        rating: 4.7,
        isOrganic: false,
        isExotic: false,
        stock: 45,
        inWishlist: false
    },
    {
        id: 8,
        name: "Organic Tomatoes",
        category: "vegetables",
        price: 1.79,
        originalPrice: 2.29,
        description: "Fresh organic tomatoes. Perfect for salads, sauces, or cooking.",
        image: "newimag/tomatoes.webp",
        rating: 4.1,
        isOrganic: true,
        isExotic: false,
        stock: 80,
        inWishlist: false
    },
    {
        id: 9,
        name: "Pineapple",
        category: "fruits",
        price: 3.49,
        originalPrice: 3.99,
        description: "Sweet and tangy pineapple. Perfect for tropical dishes or fresh eating.",
        image: "newimag/pineapple.jpg",
        rating: 4.5,
        isOrganic: false,
        isExotic: false,
        stock: 35,
        inWishlist: false
    },
    {
        id: 10,
        name: "Organic Bell Peppers",
        category: "vegetables",
        price: 2.99,
        originalPrice: 3.49,
        description: "Colorful organic bell peppers. Sweet and crunchy, perfect for salads or cooking.",
        image: "newimag/bell_peppers.jpg",
        rating: 4.3,
        isOrganic: true,
        isExotic: false,
        stock: 55,
        inWishlist: false
    },
    {
        id: 11,
        name: "Kiwi",
        category: "fruits",
        price: 0.99,
        originalPrice: 1.29,
        description: "Tangy and sweet kiwi fruit. Rich in vitamin C and perfect for fruit salads.",
        image: "newimag/kiwi.webp",
        rating: 4.4,
        isOrganic: false,
        isExotic: false,
        stock: 70,
        inWishlist: false
    },
    {
        id: 12,
        name: "Organic Cucumber",
        category: "vegetables",
        price: 1.29,
        originalPrice: 1.59,
        description: "Fresh organic cucumbers. Crisp and refreshing, perfect for salads or pickling.",
        image: "newimag/cucumber.jpg",
        rating: 4.0,
        isOrganic: true,
        isExotic: false,
        stock: 90,
        inWishlist: false
    },
    {
        id: 13,
        name: "Blueberries",
        category: "fruits",
        price: 4.49,
        originalPrice: 4.99,
        description: "Sweet and antioxidant-rich blueberries. Perfect for smoothies, baking, or fresh eating.",
        image: "newimag/blueberries.jpeg",
        rating: 4.8,
        isOrganic: false,
        isExotic: false,
        stock: 25,
        inWishlist: false
    },
    {
        id: 14,
        name: "Organic Onions",
        category: "vegetables",
        price: 1.19,
        originalPrice: 1.49,
        description: "Fresh organic onions. Essential for cooking and adding flavor to dishes.",
        image: "newimag/onion.jpg",
        rating: 4.2,
        isOrganic: true,
        isExotic: false,
        stock: 100,
        inWishlist: false
    },
    {
        id: 15,
        name: "Grapes",
        category: "fruits",
        price: 3.29,
        originalPrice: 3.79,
        description: "Sweet and juicy grapes. Perfect for snacking, wine making, or fruit salads.",
        image: "newimag/Grapes.jpg",
        rating: 4.6,
        isOrganic: false,
        isExotic: false,
        stock: 40,
        inWishlist: false
    },
    {
        id: 16,
        name: "Organic Potatoes",
        category: "vegetables",
        price: 1.99,
        originalPrice: 2.39,
        description: "Fresh organic potatoes. Versatile and perfect for baking, frying, or boiling.",
        image: "newimag/Potatoes.jpeg",
        rating: 4.1,
        isOrganic: true,
        isExotic: false,
        stock: 120,
        inWishlist: false
    },
    {
        id: 17,
        name: "Oranges",
        category: "fruits",
        price: 2.79,
        originalPrice: 3.19,
        description: "Sweet and juicy oranges. Rich in vitamin C and perfect for juicing or fresh eating.",
        image: "newimag/oranges.jpg",
        rating: 4.5,
        isOrganic: false,
        isExotic: false,
        stock: 65,
        inWishlist: false
    },
    {
        id: 18,
        name: "Organic Garlic",
        category: "vegetables",
        price: 1.59,
        originalPrice: 1.89,
        description: "Fresh organic garlic. Essential for flavoring dishes and has many health benefits.",
        image: "newimag/garlic.avif",
        rating: 4.3,
        isOrganic: true,
        isExotic: false,
        stock: 85,
        inWishlist: false
    },
    {
        id: 19,
        name: "Bananas",
        category: "fruits",
        price: 1.99,
        originalPrice: 2.29,
        description: "Sweet and nutritious bananas. Perfect for smoothies, baking, or quick energy boost.",
        image: "newimag/banana.jpg",
        rating: 4.4,
        isOrganic: false,
        isExotic: false,
        stock: 95,
        inWishlist: false
    },
    {
        id: 20,
        name: "Organic Kale",
        category: "vegetables",
        price: 2.49,
        originalPrice: 2.89,
        description: "Nutrient-rich organic kale. Perfect for salads, smoothies, or cooking.",
        image: "newimag/kale-leaves.webp",
        rating: 4.2,
        isOrganic: true,
        isExotic: false,
        stock: 35,
        inWishlist: false
    },
    {
        id: 21,
        name: "Pomegranate",
        category: "fruits",
        price: 3.99,
        originalPrice: 4.49,
        description: "Sweet and tart pomegranate. Rich in antioxidants and perfect for garnishing.",
        image: "newimag/pomegranate.webp",
        rating: 4.6,
        isOrganic: false,
        isExotic: true,
        stock: 30,
        inWishlist: false
    },
    {
        id: 22,
        name: "Organic Cauliflower",
        category: "vegetables",
        price: 2.79,
        originalPrice: 3.19,
        description: "Fresh organic cauliflower. Versatile and perfect for roasting, steaming, or making rice.",
        image: "newimag/cauliflower.jpg",
        rating: 4.1,
        isOrganic: true,
        isExotic: false,
        stock: 45,
        inWishlist: false
    },
    {
        id: 23,
        name: "Peaches",
        category: "fruits",
        price: 3.29,
        originalPrice: 3.79,
        description: "Sweet and juicy peaches. Perfect for desserts, canning, or fresh eating.",
        image: "newimag/peaches.jpg",
        rating: 4.5,
        isOrganic: false,
        isExotic: false,
        stock: 40,
        inWishlist: false
    },
    {
        id: 24,
        name: "Organic Zucchini",
        category: "vegetables",
        price: 1.89,
        originalPrice: 2.19,
        description: "Fresh organic zucchini. Perfect for grilling, baking, or making noodles.",
        image: "newimag/zucchini.jpg",
        rating: 4.0,
        isOrganic: true,
        isExotic: false,
        stock: 60,
        inWishlist: false
    },
    {
        id: 25,
        name: "Watermelon",
        category: "fruits",
        price: 4.99,
        originalPrice: 5.49,
        description: "Sweet and refreshing watermelon. Perfect for summer picnics and hydration.",
        image: "newimag/watermelon.jpg",
        rating: 4.7,
        isOrganic: false,
        isExotic: false,
        stock: 20,
        inWishlist: false
    }
];
window.products = products;

// Product filtering and sorting
function filterProducts(category) {
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = products.filter(product => {
            if (category === 'organic') return product.isOrganic;
            if (category === 'exotic') return product.isExotic;
            return product.category === category;
        });
    }
    
    return filteredProducts;
}

function sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    
    switch (sortBy) {
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    return sortedProducts;
}

// Product display functions
function createProductCard(product) {
    const isInCart = cart.some(item => item.id === product.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.isOrganic ? '<span class="product-badge">Organic</span>' : ''}
            <button class="wishlist-btn ${product.inWishlist ? 'active' : ''}" 
                    onclick="toggleWishlist(${product.id}, event)">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="rating">
                ${createRatingStars(product.rating)}
            </div>
            <div class="product-price">
                $${product.price.toFixed(2)}
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="add-to-cart-btn ${isInCart ? 'in-cart' : ''}" 
                        onclick="addToCart(${product.id})" 
                        ${isInCart ? 'disabled' : ''}>
                    ${isInCart ? '<i class="fas fa-check"></i> In Cart' : 'Add to Cart'}
                </button>
                <button class="quick-view-btn" onclick="showProductDetail(${product.id})">Quick View</button>
            </div>
        </div>
    `;
    return card;
}

function createRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star">★</span>';
        } else if (i - 0.5 <= rating) {
            stars += '<span class="star">★</span>';
        } else {
            stars += '<span class="star empty">☆</span>';
        }
    }
    return stars;
}

function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Update cart state in all product cards
    updateCartStateInCards();
}

// Update cart state in all product cards
function updateCartStateInCards() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        const productId = parseInt(button.getAttribute('onclick').match(/\d+/)[0]);
        const isInCart = cart.some(item => item.id === productId);
        
        if (isInCart) {
            button.classList.add('in-cart');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-check"></i> In Cart';
        } else {
            button.classList.remove('in-cart');
            button.disabled = false;
            button.innerHTML = 'Add to Cart';
        }
    });
}

// Product detail functions
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create modal for product detail
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content product-detail-modal">
            <span class="close-btn">&times;</span>
            <div class="product-detail">
                <div class="product-detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-detail-info">
                    <h2>${product.name}</h2>
                    <div class="rating">
                        ${createRatingStars(product.rating)}
                    </div>
                    <div class="product-detail-price">
                        $${product.price.toFixed(2)}
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <p class="product-detail-description">${product.description}</p>
                    <div class="product-detail-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="updateDetailQuantity(-1)">-</button>
                            <input type="number" id="detailQuantity" value="1" min="1" max="${product.stock}">
                            <button class="quantity-btn" onclick="updateDetailQuantity(1)">+</button>
                        </div>
                        <button class="add-to-cart-detail" onclick="addToCartFromDetail(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                    <div class="product-detail-meta">
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Stock:</strong> ${product.stock} units</p>
                        ${product.isOrganic ? '<p><strong>Organic Product</strong></p>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function updateDetailQuantity(change) {
    const quantityInput = document.getElementById('detailQuantity');
    const newQuantity = parseInt(quantityInput.value) + change;
    const maxStock = parseInt(quantityInput.max);
    
    if (newQuantity >= 1 && newQuantity <= maxStock) {
        quantityInput.value = newQuantity;
    }
}

// Search functionality
function searchProducts(query) {
    query = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
}

// Load products based on category
function loadProducts(category = 'all') {
    const filteredProducts = filterProducts(category);
    displayProducts(filteredProducts);
    
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === category) {
            btn.classList.add('active');
        }
    });
}

// Handle sorting
function handleSort(sortBy) {
    const currentProducts = Array.from(document.querySelectorAll('.product-card')).map(card => {
        const productId = parseInt(card.querySelector('.add-to-cart-btn').getAttribute('onclick').match(/\d+/)[0]);
        return products.find(p => p.id === productId);
    });
    
    const sortedProducts = sortProducts(currentProducts, sortBy);
    displayProducts(sortedProducts);
}

// Add to cart from detail modal
function addToCartFromDetail(productId) {
    const quantityInput = document.getElementById('detailQuantity');
    const quantity = parseInt(quantityInput.value) || 1;
    
    addToCart(productId, quantity);
    
    // Close the modal
    const modal = document.querySelector('.product-detail-modal').closest('.modal');
    if (modal) {
        modal.remove();
    }
    
    // Show success message
    showNotification(`Added ${quantity} item(s) to cart!`, 'success');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ed573' : '#ff4757'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Export functions for use in other files
window.filterProducts = filterProducts;
window.sortProducts = sortProducts;
window.displayProducts = displayProducts;
window.showProductDetail = showProductDetail;
window.updateDetailQuantity = updateDetailQuantity;
window.searchProducts = searchProducts;
window.loadProducts = loadProducts;
window.handleSort = handleSort;
window.addToCartFromDetail = addToCartFromDetail;
window.showNotification = showNotification;
window.updateCartStateInCards = updateCartStateInCards;

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const wishlistCount = document.querySelector('.wishlist-btn .count');

// Initialize wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
updateWishlistCount();

// Render Products
function renderProducts() {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card reveal" data-product-id="${product.id}">
            <button class="wishlist-toggle ${wishlist.includes(product.id) ? 'active' : ''}" 
                    onclick="toggleWishlist(${product.id}, event)">
                <i class="fas fa-heart"></i>
            </button>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.isOrganic ? '<span class="product-badge">Organic</span>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="quick-view-btn" onclick="quickView(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Initialize scroll reveal
    initScrollReveal();
}

// Toggle Wishlist
function toggleWishlist(productId, event) {
    event.preventDefault();
    const index = wishlist.indexOf(productId);
    const button = event.currentTarget;
    
    if (index === -1) {
        wishlist.push(productId);
        button.classList.add('active');
        showNotification('Product added to wishlist!', 'success');
    } else {
        wishlist.splice(index, 1);
        button.classList.remove('active');
        showNotification('Product removed from wishlist!', 'info');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

// Update Wishlist Count
function updateWishlistCount() {
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// Initialize Scroll Reveal
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });
    
    reveals.forEach(reveal => observer.observe(reveal));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    // Sorting dropdown event listener
    const sortSelect = document.querySelector('.sort-controls select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const value = sortSelect.value;
            if (value === 'default') {
                loadProducts();
            } else {
                handleSort(value);
            }
        });
    }
    // Filter buttons event listener
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const text = btn.textContent.trim().toLowerCase();
            if (text === 'all') loadProducts('all');
            else if (text === 'fruits') loadProducts('fruits');
            else if (text === 'vegetables') loadProducts('vegetables');
            else if (text === 'organic') loadProducts('organic');
        });
    });
});

// Quick View Modal
function quickView(productId) {
    let modal = document.getElementById('quickViewModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quickViewModal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '99999';
        modal.innerHTML = '<div id="quickViewContent" style="background:#fff; border-radius:12px; max-width:400px; width:90vw; padding:2rem; position:relative;"></div>';
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.style.display = 'none';
        });
    } else {
        modal.style.display = 'flex';
    }
    const product = window.products.find(p => p.id === productId);
    if (!product) return;
    const content = document.getElementById('quickViewContent');
    content.innerHTML = `
        <button onclick="document.getElementById('quickViewModal').style.display='none'" style="position:absolute;top:10px;right:10px;background:none;border:none;font-size:1.5rem;cursor:pointer;">&times;</button>
        <img src="${product.image}" alt="${product.name}" style="width:100%;border-radius:10px;margin-bottom:1rem;">
        <h2 style="margin-bottom:0.5rem;">${product.name}</h2>
        <div style="color:#2ed573;font-weight:600;font-size:1.2rem;margin-bottom:0.5rem;">$${product.price.toFixed(2)}</div>
        <p style="color:#555;">${product.description}</p>
    `;
} 