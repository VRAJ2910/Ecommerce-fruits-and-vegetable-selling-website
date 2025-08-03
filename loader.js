// Loader Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-container');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 3100);
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Header Scroll Animation
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Mobile Navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navList = document.querySelector('.nav-list');

if (mobileNavToggle && navList) {
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });
}

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Add fruit/vegetable emojis to product cards randomly
const productCards = document.querySelectorAll('.product-card');
const fruitEmojis = ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🫐', '🍓', '🥝', '🍅', '🥑'];
const vegetableEmojis = ['🥬', '🥦', '🥕', '🧅', '🥔', '🍆', '🥒', '🫑', '🌶️', '🥜', '🌽'];

productCards.forEach(card => {
    const isVegetable = Math.random() > 0.5;
    const emojis = isVegetable ? vegetableEmojis : fruitEmojis;
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const badge = card.querySelector('.product-badge');
    if (badge) {
        badge.dataset.emoji = randomEmoji;
    }
}); 