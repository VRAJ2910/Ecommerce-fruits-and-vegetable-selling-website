// Wishlist System - Robust Version
(function() {
    // Get wishlist from localStorage or initialize
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Helper: Save wishlist to localStorage
    function saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // Helper: Update wishlist count in header
    function updateWishlistCount() {
        const wishlistCount = document.getElementById('wishlistCount');
        if (wishlistCount) wishlistCount.textContent = wishlist.length;
    }

    // Add product to wishlist
    function addToWishlist(productId) {
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
            saveWishlist();
            updateWishlistCount();
            showNotification('Product added to wishlist!', 'success');
            if (window.location.pathname.includes('wishlist.html')) loadWishlist();
        } else {
            showNotification('Product already in wishlist!', 'info');
        }
    }

    // Remove product from wishlist
    function removeFromWishlist(productId) {
        wishlist = wishlist.filter(id => id !== productId);
        saveWishlist();
        updateWishlistCount();
        showNotification('Product removed from wishlist!', 'info');
        if (window.location.pathname.includes('wishlist.html')) loadWishlist();
    }

    // Check if product is in wishlist
    function isInWishlist(productId) {
        return wishlist.includes(productId);
    }

    // Toggle wishlist status
    function toggleWishlist(productId) {
        if (isInWishlist(productId)) removeFromWishlist(productId);
        else addToWishlist(productId);
    }

    // Render wishlist products on wishlist.html
    function loadWishlist() {
        const wishlistContainer = document.getElementById('wishlistContainer');
        if (!wishlistContainer) return;
        if (!window.products) {
            wishlistContainer.innerHTML = '<p style="color:red">Product data not loaded.</p>';
            return;
        }
        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = `<div class="empty-state"><h3>Your wishlist is empty</h3><p>Start adding your favorite fruits and vegetables!</p><a href="shop.html" class="btn btn-primary">Start Shopping</a></div>`;
            return;
        }
        let html = '<div class="products-grid">';
        wishlist.forEach(id => {
            const product = window.products.find(p => p.id === id);
            if (!product) return;
            html += `<div class="product-card reveal" data-product-id="${product.id}">
                <button class="wishlist-toggle active" onclick="removeFromWishlist(${product.id})"><i class="fas fa-heart"></i></button>
                <div class="product-image"><img src="${product.image}" alt="${product.name}">${product.isOrganic ? '<span class=\"product-badge\">Organic</span>' : ''}</div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="rating">${typeof createRatingStars === 'function' ? createRatingStars(product.rating) : ''}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-price">$${product.price.toFixed(2)}${product.originalPrice ? `<span class=\"original-price\">$${product.originalPrice.toFixed(2)}</span>` : ''}</div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                        <button class="view-details-btn" onclick="viewProductDetails(${product.id})"><i class="fas fa-eye"></i></button>
                    </div>
                </div>
            </div>`;
        });
        html += '</div>';
        wishlistContainer.innerHTML = html;
        if (typeof initScrollReveal === 'function') initScrollReveal();
    }

    // Expose functions globally for button onclicks
    window.addToWishlist = addToWishlist;
    window.removeFromWishlist = removeFromWishlist;
    window.isInWishlist = isInWishlist;
    window.toggleWishlist = toggleWishlist;
    window.loadWishlist = loadWishlist;

    // On DOMContentLoaded, update count and load wishlist if on wishlist.html
    document.addEventListener('DOMContentLoaded', function() {
        updateWishlistCount();
        if (window.location.pathname.includes('wishlist.html')) {
            // Wait for products.js to load products
            if (window.products) {
                loadWishlist();
            } else {
                // If products not loaded yet, wait for it
                let tries = 0;
                const waitForProducts = setInterval(() => {
                    if (window.products) {
                        clearInterval(waitForProducts);
                        loadWishlist();
                    } else if (++tries > 20) {
                        clearInterval(waitForProducts);
                        document.getElementById('wishlistContainer').innerHTML = '<p style="color:red">Failed to load products.</p>';
                    }
                }, 100);
            }
        }
    });
})(); 