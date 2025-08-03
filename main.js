// DOM Elements
const searchInput = document.getElementById('searchInput');

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query === '') {
        loadProducts();
        return;
    }

    const searchResults = searchProducts(query);
    displayProducts(searchResults);
});

// Initialize the application
function init() {
    // Load featured products
    const featuredProducts = products.filter(product => product.rating >= 4.5);
    displayProducts(featuredProducts);

    // Update cart and wishlist counts
    updateCartCount();
    updateWishlistCount();

    // Initialize hero slider
    initHeroSlider();
}

// Hero Slider functionality
function initHeroSlider() {
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Start auto-sliding
    startAutoSlide();
}

// Load products based on category
function loadProducts(category = 'all') {
    const filteredProducts = filterProducts(category);
    displayProducts(filteredProducts);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeHeader();
    initializeSearch();
    initializeModals();
    loadFeaturedProducts();
    initializeTestimonialsSlider();
    initializeNewsletter();
    initializeScrollEffects();
    
    // Update counts - ensure cart is initialized first
    if (typeof initializeCart === 'function') {
        initializeCart();
    } else if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
    
    if (typeof updateWishlistCount === 'function') {
        updateWishlistCount();
    }
});

function initializeHeader() {
    // Header navigation
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // Cart and Wishlist button functionality
    const cartBtn = document.getElementById('cartBtn');
    const wishlistBtn = document.getElementById('wishlistBtn');

    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'cart.html';
        });
    }

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'wishlist.html';
        });
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-bar button');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        // Store search query and redirect to shop page
        localStorage.setItem('searchQuery', query);
        window.location.href = 'shop.html';
    }
}

function initializeModals() {
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');

    // Close modal when clicking on X
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modals.forEach(modal => modal.style.display = 'none');
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Show login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginModal').style.display = 'block';
        });
    }

    // Show register modal
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('registerModal').style.display = 'block';
        });
    }

    // Switch between login and register
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginModal').style.display = 'none';
            document.getElementById('registerModal').style.display = 'block';
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('registerModal').style.display = 'none';
            document.getElementById('loginModal').style.display = 'block';
        });
    }
}

function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;

    // Get first 6 products as featured
    const featuredProducts = products.slice(0, 6);
    
    let productsHTML = '';
    featuredProducts.forEach(product => {
        const isInCart = cart.some(item => item.id === product.id);
        productsHTML += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" 
                            onclick="toggleWishlistItem(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="rating">
                        ${generateStars(product.rating)}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn ${isInCart ? 'in-cart' : ''}" 
                                onclick="addToCart(${product.id})" 
                                ${isInCart ? 'disabled' : ''}>
                            ${isInCart ? '<i class="fas fa-check"></i> In Cart' : 'Add to Cart'}
                        </button>
                        <button class="quick-view-btn" onclick="viewProductDetails(${product.id})">
                            <i class='fas fa-eye'></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    featuredContainer.innerHTML = productsHTML;
}

function toggleWishlistItem(productId) {
    if (isInWishlist(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(productId);
    }
    
    // Update the button state
    const wishlistBtn = document.querySelector(`[onclick="toggleWishlistItem(${productId})"]`);
    if (wishlistBtn) {
        wishlistBtn.classList.toggle('active');
    }
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt star"></i>';
        } else {
            stars += '<i class="fas fa-star star empty"></i>';
        }
    }
    return stars;
}

function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Create modal for product details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content product-detail-modal">
            <span class="close-btn" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div class="product-detail">
                <div class="product-detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-detail-info">
                    <h2>${product.name}</h2>
                    <div class="product-detail-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="rating">
                        ${generateStars(product.rating)}
                    </div>
                    <p class="product-detail-description">${product.description}</p>
                    <div class="product-detail-actions">
                        <div class="quantity-selector">
                            <label>Quantity:</label>
                            <input type="number" id="detailQuantity" value="1" min="1" max="${product.stock}">
                        </div>
                        <button class="add-to-cart-detail" onclick="addToCartFromDetail(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                    <div class="product-detail-meta">
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Stock:</strong> ${product.stock} available</p>
                        ${product.isOrganic ? '<p><strong>Organic:</strong> Yes</p>' : ''}
                        ${product.isExotic ? '<p><strong>Exotic:</strong> Yes</p>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function addToCartFromDetail(productId) {
    const quantity = parseInt(document.getElementById('detailQuantity').value) || 1;
    addToCart(productId, quantity);
    
    // Close the modal
    const modal = document.querySelector('.product-detail-modal').parentElement;
    modal.remove();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ed573' : type === 'error' ? '#ff4757' : '#3742fa'};
        color: white;
        padding: 0.4rem 1rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 500;
        font-size: 0.95rem;
        min-height: 28px;
        max-width: 300px;
        display: flex;
        align-items: center;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Testimonials Slider Functionality
function initializeTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length === 0) return;

    let currentTestimonial = 0;
    let slideInterval;

    function showTestimonial(index) {
        // Remove active class from all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        // Add active class to current testimonial
        testimonials[index].classList.add('active');
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Start auto-sliding
    startAutoSlide();

    // Pause on hover
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', stopAutoSlide);
        testimonialsContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Show first testimonial
    showTestimonial(0);
}

// Newsletter Functionality
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    const nameInput = document.getElementById('newsletterName');
    const emailInput = document.getElementById('newsletterEmail');
    
    // Real-time validation feedback
    nameInput.addEventListener('input', function() {
        validateField(this, this.value.trim().length > 0, 'Name is required');
    });
    
    emailInput.addEventListener('input', function() {
        const isValid = isValidEmail(this.value.trim());
        validateField(this, isValid, 'Please enter a valid email address');
    });

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = newsletterForm.querySelector('.newsletter-submit-btn');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        // Validation
        if (!name || !email) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Subscribing...';

        // Simulate API call
        setTimeout(() => {
            // Store subscription in localStorage
            const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions')) || [];
            const newSubscription = {
                name: name,
                email: email,
                subscribedAt: new Date().toISOString()
            };
            
            // Check if email already exists
            const existingSubscription = subscriptions.find(sub => sub.email === email);
            if (existingSubscription) {
                showNotification('You are already subscribed to our newsletter!', 'info');
            } else {
                subscriptions.push(newSubscription);
                localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
                showNotification('Successfully subscribed to newsletter!', 'success');
                
                // Add success animation
                const formContainer = document.querySelector('.newsletter-form-container');
                formContainer.classList.add('newsletter-success');
                setTimeout(() => {
                    formContainer.classList.remove('newsletter-success');
                }, 500);
            }

            // Reset form
            newsletterForm.reset();
            
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<span>Subscribe Now</span><i class="fas fa-paper-plane"></i>';
        }, 1500);
    });
}

// Field validation helper
function validateField(field, isValid, errorMessage) {
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (!isValid) {
        field.classList.add('error');
        if (!errorElement) {
            const error = document.createElement('div');
            error.className = 'field-error';
            error.textContent = errorMessage;
            error.style.cssText = `
                color: #ff4757;
                font-size: 0.8rem;
                margin-top: 0.25rem;
                animation: fadeInUp 0.3s ease-out;
            `;
            field.parentNode.appendChild(error);
        }
    } else {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize scroll effects for About and Contact pages
function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.value-card, .team-member, .timeline-item, .contact-card, .faq-item, .social-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button
window.addEventListener('scroll', () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Initialize search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    localStorage.setItem('searchQuery', query);
                    window.location.href = 'shop.html';
                }
            }
        });
    }
    
    // Initialize search button
    const searchBtn = document.querySelector('.search-bar button');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('searchInput');
            const query = searchInput.value.trim();
            if (query) {
                localStorage.setItem('searchQuery', query);
                window.location.href = 'shop.html';
            }
        });
    }
});

// Export functions
window.viewProductDetails = viewProductDetails;
window.addToCartFromDetail = addToCartFromDetail;
window.toggleWishlistItem = toggleWishlistItem;
window.showNotification = showNotification; 