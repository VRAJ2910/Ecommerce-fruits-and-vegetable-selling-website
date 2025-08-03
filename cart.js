window.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');

// Initialize cart properly
function initializeCart() {
    if (!Array.isArray(cart)) {
        cart = [];
        localStorage.removeItem('cart');
    }
    updateCartCount();
}

// Clear cart function
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
    showNotification('Cart cleared!', 'info');
}

// Reset cart count manually
function resetCartCount() {
    console.log('Resetting cart count...');
    cart = [];
    localStorage.removeItem('cart');
    if (cartCount) {
        cartCount.textContent = '0';
    }
    console.log('Cart count reset to 0');
}

// Cart functions
function addToCart(productId, quantity = 1) {
    // Check if user is logged in first
    if (!window.currentUser) {
        showNotification('Please login to add items to cart!', 'error');
        // Show new auth modal
        if (typeof showAuthForm === 'function') showAuthForm('login');
        return;
    }
    const product = products.find(p => p.id === productId);
    if (!product) return;
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        showNotification('This product is already in your cart!', 'info');
        return;
    }
    // Add product to cart
    cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
    });
    saveCart();
    updateCartCount();
    showNotification('Product added to cart!', 'success');
    if (typeof updateCartStateInCards === 'function') {
        updateCartStateInCards();
    }
}

function addToCartFromDetail(productId) {
    if (!window.currentUser) {
        showNotification('Please login to add items to cart!', 'error');
        if (typeof showAuthForm === 'function') showAuthForm('login');
        return;
    }
    const quantity = parseInt(document.getElementById('detailQuantity').value) || 1;
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        showNotification('This product is already in your cart!', 'info');
        return;
    }
    if (quantity > product.stock) {
        showNotification('Not enough stock available', 'error');
        return;
    }
    cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
    });
    saveCart();
    updateCartCount();
    showNotification(`Added ${quantity} item(s) to cart!`, 'success');
    if (typeof updateCartStateInCards === 'function') {
        updateCartStateInCards();
    }
    // Close the modal
    const modal = document.querySelector('.product-detail-modal');
    if (modal) {
        modal.closest('.modal').remove();
    }
}

function updateCartCount() {
    if (cartCount) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
}

function loadCart() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-state">
                <h3>Your cart is empty</h3>
                <p>Add some fresh fruits and vegetables to get started!</p>
                <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }
    let cartHTML = '<div class="cart-items">';
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" onchange="updateQuantity(${item.id}, parseInt(this.value))" min="1">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });
    cartHTML += '</div>';
    // Add cart summary
    const total = getCartTotal();
    cartHTML += `<div class="cart-summary">
        <div class="summary-row"><span>Subtotal:</span><span>$${total.toFixed(2)}</span></div>
        <div class="summary-row summary-total"><span>Total:</span><span>$${total.toFixed(2)}</span></div>
        <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
    </div>`;
    cartContainer.innerHTML = cartHTML;
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
            if (window.location.pathname.includes('cart.html')) {
                loadCart();
            }
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
    showNotification('Product removed from cart!');
    if (typeof updateCartStateInCards === 'function') {
        updateCartStateInCards();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function checkout() {
    if (!window.currentUser) {
        showNotification('Please login to checkout!', 'error');
        if (typeof showAuthForm === 'function') showAuthForm('login');
        return;
    }
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.add('active');
        showCheckoutStep('step-address');
    }
}

// Helper to show a specific step
function showCheckoutStep(stepId) {
    const steps = document.querySelectorAll('.checkout-step');
    steps.forEach(step => step.style.display = 'none');
    const step = document.getElementById(stepId);
    if (step) step.style.display = 'block';
}

// Modal close logic
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
}

// Event listeners for modal steps
function setupCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;
    // Close modal
    document.getElementById('closeCheckoutModal').onclick = closeCheckoutModal;
    // Step 1: Address -> Payment
    document.getElementById('toPaymentStep').onclick = function() {
        const name = document.getElementById('addressName').value.trim();
        const phone = document.getElementById('addressPhone').value.trim();
        const pincode = document.getElementById('addressPincode').value.trim();
        const house = document.getElementById('addressHouse').value.trim();
        if (!name || !phone || !pincode || !house) {
            showNotification('Please fill all required address fields.', 'error');
            return;
        }
        showCheckoutStep('step-payment');
    };
    // Payment method selection (card UI)
    const paymentOptions = modal.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.onclick = function(e) {
            // Deselect all
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            // Select this
            this.classList.add('selected');
            // Check the radio
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            }
            // Show/hide card details
            const cardDetails = document.getElementById('cardDetails');
            if (this.dataset.method === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        };
    });
    // Also support keyboard navigation
    paymentOptions.forEach(option => {
        option.tabIndex = 0;
        option.onkeydown = function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        };
    });
    // Payment -> Address (Back)
    document.getElementById('backToAddress').onclick = function() {
        showCheckoutStep('step-address');
    };
    // Payment -> Review
    document.getElementById('toReviewStep').onclick = function() {
        const selected = modal.querySelector('input[name="paymentMethod"]:checked');
        if (!selected) {
            showNotification('Please select a payment method.', 'error');
            return;
        }
        if (selected.value === 'card') {
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const cardName = document.getElementById('cardName').value.trim();
            const cardExpiry = document.getElementById('cardExpiry').value.trim();
            const cardCVV = document.getElementById('cardCVV').value.trim();
            if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
                showNotification('Please fill all card details.', 'error');
                return;
            }
        }
        // Fill review summary
        fillReviewSummary();
        showCheckoutStep('step-review');
    };
    // Review -> Payment (Back)
    document.getElementById('backToPayment').onclick = function() {
        showCheckoutStep('step-payment');
    };
    // Place Order
    document.getElementById('placeOrderBtn').onclick = function() {
        // Simulate payment
        showCheckoutStep('step-success');
        clearCart();
    };
    // Close success
    document.getElementById('closeSuccessBtn').onclick = function() {
        closeCheckoutModal();
        loadCart();
    };
}

// Fill review summary
function fillReviewSummary() {
    const name = document.getElementById('addressName').value.trim();
    const phone = document.getElementById('addressPhone').value.trim();
    const pincode = document.getElementById('addressPincode').value.trim();
    const house = document.getElementById('addressHouse').value.trim();
    const landmark = document.getElementById('addressLandmark').value.trim();
    const payment = document.querySelector('input[name="paymentMethod"]:checked').value;
    let paymentText = '';
    if (payment === 'card') paymentText = 'Card';
    else if (payment === 'phonepe') paymentText = 'PhonePe';
    else if (payment === 'paytm') paymentText = 'Paytm';
    else paymentText = 'Cash on Delivery';
    let cartSummary = '<ul style="text-align:left;">';
    cart.forEach(item => {
        cartSummary += `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`;
    });
    cartSummary += '</ul>';
    const total = getCartTotal();
    const shipping = total > 50 ? 0 : 5.99;
    const grandTotal = total + shipping;
    document.getElementById('reviewSummary').innerHTML = `
      <h3>Address</h3>
      <p>${name}, ${house}, ${landmark ? landmark + ',' : ''} Pincode: ${pincode}, Phone: ${phone}</p>
      <h3>Payment</h3>
      <p>${paymentText}</p>
      <h3>Order</h3>
      ${cartSummary}
      <p><strong>Total: $${grandTotal.toFixed(2)}</strong></p>
    `;
}

// Setup modal on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCheckoutModal);
} else {
    setupCheckoutModal();
}

// Show notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ed573' : type === 'error' ? '#ff4757' : '#3742fa'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCart();
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
});

// Export functions for use in other files
window.addToCart = addToCart;
window.addToCartFromDetail = addToCartFromDetail;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.showNotification = showNotification;
window.initializeCart = initializeCart;
window.clearCart = clearCart;
window.resetCartCount = resetCartCount; 