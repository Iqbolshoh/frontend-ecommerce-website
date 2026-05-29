// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

// Product Data
const products = [
    {
        id: 1,
        name: 'Nike Air Max Pro',
        category: "Men's Running Shoes",
        price: 120,
        originalPrice: 150,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        badge: { text: '-20%', color: 'bg-red-500' },
        isNew: false,
    },
    {
        id: 2,
        name: 'Apple Watch Series 8',
        category: 'Smart Electronics',
        price: 399,
        originalPrice: null,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        badge: null,
        isNew: false,
    },
    {
        id: 3,
        name: 'Sony Wireless Headphones',
        category: 'Audio Accessories',
        price: 89.99,
        originalPrice: null,
        rating: 4.0,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        badge: { text: 'New', color: 'bg-blue-500' },
        isNew: true,
    },
    {
        id: 4,
        name: 'Premium Leather Handbag',
        category: "Women's Fashion",
        price: 145,
        originalPrice: null,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        badge: null,
        isNew: false,
    },
    {
        id: 5,
        name: 'Samsung Galaxy Buds Pro',
        category: 'Audio Accessories',
        price: 149,
        originalPrice: 199,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        badge: { text: '-25%', color: 'bg-red-500' },
        isNew: false,
    },
    {
        id: 6,
        name: 'Classic Denim Jacket',
        category: "Men's Fashion",
        price: 89,
        originalPrice: null,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        badge: { text: 'Hot', color: 'bg-orange-500' },
        isNew: true,
    },
    {
        id: 7,
        name: 'Minimalist Desk Lamp',
        category: 'Home Decor',
        price: 65,
        originalPrice: 85,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        badge: { text: '-23%', color: 'bg-red-500' },
        isNew: false,
    },
    {
        id: 8,
        name: 'Fitness Tracker Pro',
        category: 'Smart Electronics',
        price: 199,
        originalPrice: 249,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        badge: { text: '-20%', color: 'bg-red-500' },
        isNew: false,
    },
];

// State
let cart = [];
let wishlist = [];
let currentProductIndex = 0;
const productsPerPage = 4;

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartCountEl = document.getElementById('cartCount');
const wishlistCountEl = document.getElementById('wishlistCount');
const cartNotification = document.getElementById('cartNotification');
const notificationProduct = document.getElementById('notificationProduct');
const backToTopBtn = document.getElementById('backToTopBtn');
const prevBtn = document.getElementById('prevProduct');
const nextBtn = document.getElementById('nextProduct');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Render Products
function renderProducts() {
    const startIndex = currentProductIndex;
    const endIndex = Math.min(startIndex + productsPerPage, products.length);
    const visibleProducts = products.slice(startIndex, endIndex);

    productsGrid.innerHTML = visibleProducts.map(product => createProductCard(product)).join('');

    // Re-attach event listeners
    attachProductListeners();
}

// Create Product Card HTML
function createProductCard(product) {
    const stars = getStarRating(product.rating);
    const isWishlisted = wishlist.includes(product.id);

    return `
        <div class="product-card bg-white dark:bg-dark-card rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden group" data-product-id="${product.id}">
            <div class="product-image-wrapper relative aspect-square bg-slate-100 dark:bg-slate-800">
                ${product.badge ? `<span class="absolute top-4 left-4 z-10 ${product.badge.color} text-white text-xs font-bold px-3 py-1.5 rounded-lg">${product.badge.text}</span>` : ''}
                
                <button class="wishlist-btn absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${isWishlisted ? 'active' : ''}"
                        data-product-id="${product.id}">
                    <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart text-lg"></i>
                </button>
                
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                
                <div class="quick-actions absolute bottom-0 left-0 right-0 p-3 flex justify-center gap-2">
                    <button class="quick-view-btn bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-primary dark:hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors">
                        Quick View
                    </button>
                    <button class="add-cart-btn bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2"
                            data-product-id="${product.id}" data-product-name="${product.name}">
                        <i class="fa-solid fa-cart-shopping"></i> Add
                    </button>
                </div>
            </div>
            
            <div class="p-5">
                <div class="flex items-center gap-1 text-yellow-400 text-xs mb-2">
                    ${stars}
                    <span class="text-slate-400 text-xs ml-1">(${product.rating})</span>
                </div>
                
                <h3 class="font-semibold text-slate-900 dark:text-white mb-1 truncate group-hover:text-primary transition-colors">${product.name}</h3>
                <p class="text-slate-500 dark:text-slate-400 text-xs mb-4">${product.category}</p>
                
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-lg font-bold text-slate-900 dark:text-white">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="text-sm text-slate-400 line-through ml-2">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Get Star Rating HTML
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else if (i - rating < 1 && i - rating > 0) {
            stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return stars;
}

// Attach Product Event Listeners
function attachProductListeners() {
    // Add to Cart
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.productId);
            const productName = this.dataset.productName;
            addToCart(productId, productName);
        });
    });

    // Wishlist Toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(this.dataset.productId);
            toggleWishlist(productId, this);
        });
    });
}

// Add to Cart
function addToCart(productId, productName) {
    cart.push(productId);
    updateCartCount();
    showNotification(productName);
}

// Update Cart Count
function updateCartCount() {
    cartCountEl.textContent = cart.length;
}

// Show Notification
function showNotification(productName) {
    notificationProduct.textContent = productName;
    cartNotification.classList.remove('translate-x-full');
    cartNotification.classList.add('cart-notification');

    setTimeout(() => {
        cartNotification.classList.add('translate-x-full');
    }, 3000);
}

// Toggle Wishlist
function toggleWishlist(productId, button) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        button.classList.remove('active');
        button.querySelector('i').classList.replace('fa-solid', 'fa-regular');
    } else {
        wishlist.push(productId);
        button.classList.add('active');
        button.querySelector('i').classList.replace('fa-regular', 'fa-solid');
    }
    updateWishlistCount();
}

// Update Wishlist Count
function updateWishlistCount() {
    wishlistCountEl.textContent = wishlist.length;
}

// Navigation
prevBtn.addEventListener('click', () => {
    if (currentProductIndex > 0) {
        currentProductIndex -= productsPerPage;
        renderProducts();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentProductIndex + productsPerPage < products.length) {
        currentProductIndex += productsPerPage;
        renderProducts();
    }
});

// Theme Toggle
function updateThemeIcon(isDark) {
    if (isDark) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    updateThemeIcon(true);
}

themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    updateThemeIcon(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Back to Top
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
    } else {
        backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Countdown Timer
function startCountdown() {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 12);
    countdownDate.setHours(8, 45, 30);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

// Initialize
renderProducts();
startCountdown();