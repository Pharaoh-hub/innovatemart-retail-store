// InnovateMart Interactive JavaScript
class InnovateMart {
    constructor() {
        this.cart = [];
        this.products = [];
        this.filteredProducts = [];
        this.init();
    }

    init() {
        // Hide loading screen after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 2000);
        });

        // Initialize cart from localStorage (if available)
        this.loadCart();
        
        // Load products data
        this.loadProducts();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Update cart count on load
        this.updateCartCount();

        // Add scroll effects
        this.initScrollEffects();

        // Initialize typing effect
        this.initTypingEffect();
    }

    initEventListeners() {
        // Mobile menu toggle
        window.toggleMenu = () => {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('active');
        };

        // Cart toggle
        window.toggleCart = () => {
            const cartSidebar = document.getElementById('cart-sidebar');
            const cartOverlay = document.getElementById('cart-overlay');
            
            if (cartSidebar && cartOverlay) {
                cartSidebar.classList.toggle('active');
                cartOverlay.classList.toggle('active');
                document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : 'auto';
            }
        };

        // Add to cart function
        window.addToCart = (id, name, price) => {
            this.addToCart(id, name, price);
        };

        // Remove from cart
        window.removeFromCart = (id) => {
            this.removeFromCart(id);
        };

        // Checkout function
        window.checkout = () => {
            this.checkout();
        };

        // Product filtering
        window.filterProducts = (category) => {
            this.filterProducts(category);
        };

        // Product search
        window.searchProducts = () => {
            this.searchProducts();
        };

        // Sort products
        window.sortProducts = () => {
            this.sortProducts();
        };

        // Load more products
        window.loadMoreProducts = () => {
            this.loadMoreProducts();
        };

        // Product modal functions
        window.openProductModal = (name, description, price, icon) => {
            this.openProductModal(name, description, price, icon);
        };

        window.closeProductModal = () => {
            this.closeProductModal();
        };

        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitContactForm();
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburger = document.querySelector('.hamburger-menu');
            
            if (mobileMenu && hamburger && 
                !mobileMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    loadProducts() {
        // Sample products data (in a real app, this would come from an API)
        this.products = [
            { id: 'cyber-car', name: 'CyberCar X1', price: 89999, category: 'cars', icon: 'fas fa-car' },
            { id: 'aero-flyer', name: 'AeroFlyer Pro', price: 129999, category: 'cars', icon: 'fas fa-helicopter' },
            { id: 'holo-tv', name: 'HoloDisplay Pro', price: 4999, category: 'tv', icon: 'fas fa-tv' },
            { id: 'crystal-vision', name: 'CrystalVision 8K', price: 7999, category: 'tv', icon: 'fas fa-desktop' },
            { id: 'quantum-book', name: 'QuantumBook Pro', price: 5999, category: 'laptops', icon: 'fas fa-laptop' },
            { id: 'neural-station', name: 'NeuralStation X', price: 8999, category: 'laptops', icon: 'fas fa-microchip' },
            { id: 'neuro-vr', name: 'NeuroVR Elite', price: 2999, category: 'gaming', icon: 'fas fa-vr-cardboard' },
            { id: 'cyber-rig', name: 'CyberRig Ultimate', price: 15999, category: 'gaming', icon: 'fas fa-server' },
            { id: 'avatar-neural', name: 'Avatar: Neural Edition', price: 29, category: 'movies', icon: 'fas fa-film' },
            { id: 'interstellar-vr', name: 'Interstellar VR', price: 39, category: 'movies', icon: 'fas fa-space-shuttle' }
        ];
        
        this.filteredProducts = [...this.products];
    }

    loadCart() {
        // In a real application, you'd load from localStorage or a database
        // For demo purposes, we'll start with an empty cart
        this.cart = [];
    }

    saveCart() {
        // In a real application, you'd save to localStorage or send to server
        // For demo purposes, we'll just keep it in memory
        console.log('Cart saved:', this.cart);
    }

    addToCart(id, name, price) {
        const existingItem = this.cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        this.updateCartDisplay();
        this.updateCartCount();
        this.saveCart();
        this.showNotification(`${name} added to cart!`);
        
        // Add animation effect
        this.animateCartIcon();
    }

    removeFromCart(id) {
        const itemIndex = this.cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            const itemName = this.cart[itemIndex].name;
            this.cart.splice(itemIndex, 1);
            this.updateCartDisplay();
            this.updateCartCount();
            this.saveCart();
            this.showNotification(`${itemName} removed from cart!`);
        }
    }

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartItems || !cartTotal) return;
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            cartTotal.textContent = '0';
            return;
        }
        
        let cartHTML = '';
        let total = 0;
        
        this.cart.forEach(item => {
            const product = this.products.find(p => p.id === item.id);
            const icon = product ? product.icon : 'fas fa-box';
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <i class="${icon}"></i>
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${itemTotal.toLocaleString()}</div>
                        <div class="cart-item-quantity">Qty: ${item.quantity}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartHTML;
        cartTotal.textContent = total.toLocaleString();
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return;
        }
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Simulate checkout process
        this.showNotification('Processing your order...', 'info');
        
        setTimeout(() => {
            this.showNotification(`Order confirmed! Total: ${total.toLocaleString()}`, 'success');
            this.cart = [];
            this.updateCartDisplay();
            this.updateCartCount();
            this.saveCart();
            window.toggleCart();
        }, 2000);
    }

    filterProducts(category) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            }
        });

        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => product.category === category);
        }

        this.displayProducts();
    }

    searchProducts() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;

        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }

        this.displayProducts();
    }

    sortProducts() {
        const sortSelect = document.getElementById('sort-select');
        if (!sortSelect) return;

        const sortValue = sortSelect.value;

        switch (sortValue) {
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // For demo, we'll just reverse the array
                this.filteredProducts.reverse();
                break;
        }

        this.displayProducts();
    }

    displayProducts() {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        // Filter existing product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const name = card.getAttribute('data-name');
            
            const shouldShow = this.filteredProducts.some(product => 
                product.category === category && product.name === name
            );
            
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    loadMoreProducts() {
        // Simulate loading more products
        this.showNotification('Loading more products...', 'info');
        
        setTimeout(() => {
            this.showNotification('All products loaded!', 'success');
        }, 1000);
    }

    openProductModal(name, description, price, icon) {
        const modal = document.getElementById('product-modal');
        const modalOverlay = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalPrice = document.getElementById('modal-price');
        const modalIcon = document.getElementById('modal-icon');
        const modalAddCart = document.getElementById('modal-add-cart');

        if (modal && modalOverlay) {
            modalTitle.textContent = name;
            modalDescription.textContent = description;
            modalPrice.textContent = price.toLocaleString();
            modalIcon.className = icon;
            
            modalAddCart.onclick = () => {
                const product = this.products.find(p => p.name === name);
                if (product) {
                    this.addToCart(product.id, name, price);
                    this.closeProductModal();
                }
            };

            modal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeProductModal() {
        const modal = document.getElementById('product-modal');
        const modalOverlay = document.getElementById('modal-overlay');

        if (modal && modalOverlay) {
            modal.classList.remove('active');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    submitContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        this.showNotification('Sending message...', 'info');

        setTimeout(() => {
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
        }, 2000);
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
            <span>${message}</span>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--primary-color)' : type === 'error' ? 'var(--secondary-color)' : 'var(--accent-color)'};
            color: var(--dark-bg);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            transform: translateX(400px);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    animateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.style.animation = 'none';
            setTimeout(() => {
                cartIcon.style.animation = 'pulse 0.5s ease';
            }, 10);
        }
    }

    initScrollEffects() {
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                } else {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                }
            }
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const hero = document.querySelector('.hero');
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Fade in animation for elements
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

        // Observe elements for animation
        document.querySelectorAll('.product-card, .tech-item, .stat-item, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    initTypingEffect() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            const originalText = heroSubtitle.textContent;
            heroSubtitle.textContent = '';
            
            let index = 0;
            const typeWriter = () => {
                if (index < originalText.length) {
                    heroSubtitle.textContent += originalText.charAt(index);
                    index++;
                    setTimeout(typeWriter, 50);
                } else {
                    // Add blinking cursor
                    heroSubtitle.innerHTML += '<span class="cursor">|</span>';
                    
                    // Add cursor animation
                    const cursor = document.querySelector('.cursor');
                    if (cursor) {
                        cursor.style.animation = 'blink 1s infinite';
                        cursor.style.color = 'var(--primary-color)';
                        
                        // Add CSS for cursor animation
                        if (!document.getElementById('cursor-style')) {
                            const style = document.createElement('style');
                            style.id = 'cursor-style';
                            style.textContent = `
                                @keyframes blink {
                                    0%, 50% { opacity: 1; }
                                    51%, 100% { opacity: 0; }
                                }
                            `;
                            document.head.appendChild(style);
                        }
                    }
                }
            };
            
            // Start typing effect after a delay
            setTimeout(typeWriter, 1000);
        }
    }

    // Topology node interactions
    initTopologyInteractions() {
        const topologyNodes = document.querySelectorAll('.topology-node');
        
        topologyNodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                const nodeType = node.getAttribute('data-node');
                this.showTopologyInfo(nodeType, node);
            });
            
            node.addEventListener('mouseleave', () => {
                this.hideTopologyInfo();
            });
        });
    }

    showTopologyInfo(nodeType, element) {
        const infoTexts = {
            'user': 'End users accessing the InnovateMart platform',
            'lb': 'AWS Application Load Balancer distributing traffic',
            'ui': 'React-based user interface service',
            'catalog': 'Product catalog microservice with MySQL backend',
            'cart': 'Shopping cart service with DynamoDB backend',
            'orders': 'Order processing service with PostgreSQL backend',
            'db': 'Managed database services (RDS, DynamoDB)'
        };
        
        const tooltip = document.createElement('div');
        tooltip.className = 'topology-tooltip';
        tooltip.textContent = infoTexts[nodeType] || 'System component';
        tooltip.style.cssText = `
            position: absolute;
            background: var(--card-bg);
            color: var(--text-primary);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 1000;
            border: 1px solid var(--primary-color);
            box-shadow: var(--neon-glow);
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        this.currentTooltip = tooltip;
    }

    hideTopologyInfo() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }

    // Performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.innovateMart = new InnovateMart();
});

// Add some fun easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code: ↑↑↓↓←→←→BA
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    if (!window.konamiSequence) window.konamiSequence = [];
    
    window.konamiSequence.push(e.code);
    
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence = window.konamiSequence.slice(-konamiCode.length);
    }
    
    if (JSON.stringify(window.konamiSequence) === JSON.stringify(konamiCode)) {
        // Activate secret mode
        document.body.style.filter = 'hue-rotate(180deg)';
        window.innovateMart.showNotification('🚀 Secret Cyber Mode Activated!', 'success');
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
        
        window.konamiSequence = [];
    }
});

// Add window resize handler
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }
});
