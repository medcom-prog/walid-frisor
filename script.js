// WALID FRISØR - CLEAN JAVASCRIPT

document.addEventListener('DOMContentLoaded', function() {
    console.log('Walid Frisør - Initializing...');
    
    // ===== ELEMENTS TO ANIMATE =====
    const elementsToAnimate = [
        { selector: ".service-card", animation: "animate-fade-in-up" },
        { selector: ".hero-content", animation: "animate-fade-in-up" },
        { selector: ".section-title", animation: "animate-fade-in-up" },
        { selector: ".section-subtitle", animation: "animate-fade-in-up" },
        { selector: ".faq-item", animation: "animate-fade-in-up" },
        { selector: ".contact-item", animation: "animate-fade-in-right" },
        { selector: ".contact-form", animation: "animate-fade-in-left" },
        { selector: ".about-text", animation: "animate-fade-in-left" },
        { selector: ".about-image", animation: "animate-fade-in-right" }
    ];

    // ===== GET ELEMENTS =====
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');
    const bookingForm = document.querySelector('.booking-form');
    const faqItems = document.querySelectorAll('.faq-item');
    const serviceCards = document.querySelectorAll('.service-card');

    // ===== PRELOADER =====
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';
            console.log('Preloader hidden');
        }
    }
    
    setTimeout(hidePreloader, 2000);
    window.addEventListener('load', () => setTimeout(hidePreloader, 500));

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        elementsToAnimate.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(element => {
                element.classList.add('animate-on-scroll', item.animation);
            });
        });
    }

    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 150) {
                element.classList.add('is-visible');
            }
        });
    }

    initScrollAnimations();

    // ===== NAVIGATION =====
    function handleScroll() {
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        handleScrollAnimations();
        updateActiveNavLink();
        
        // Back to top button
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'visible';
            } else {
                navMenu.classList.add('active');
                navToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    // Logo click to home
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection && header) {
                // Close mobile menu
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = 'visible';
                }
                
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ACTIVE NAV LINK =====
    function updateActiveNavLink() {
        if (!header) return;
        
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // ===== FAQ FUNCTIONALITY =====
    faqItems.forEach(item => {
        // Ensure all start closed
        item.classList.remove('active');
        
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqToggle = faqItem.querySelector('.faq-toggle');
                    if (faqToggle) {
                        faqToggle.textContent = '+';
                        faqToggle.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    if (toggle) {
                        toggle.textContent = '×';
                        toggle.style.transform = 'rotate(45deg)';
                    }
                }
            });
        }
    });

    // ===== SERVICE CARDS =====
    serviceCards.forEach(card => {
        // Click to scroll to booking
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('.service-title');
            const bookingSection = document.getElementById('book');
            const serviceSelect = document.getElementById('service');
            
            if (bookingSection && header) {
                const headerHeight = header.offsetHeight;
                const targetPosition = bookingSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Pre-select the service
                if (serviceSelect && serviceTitle) {
                    setTimeout(() => {
                        const options = serviceSelect.options;
                        const titleText = serviceTitle.textContent.toLowerCase();
                        
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].text.toLowerCase().includes(titleText)) {
                                serviceSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }, 500);
                }
            }
        });
    });

    // ===== FORM HANDLING =====
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const service = formData.get('service');
            
            // Basic validation
            if (!name || !phone || !service) {
                showNotification('Vennligst fyll ut alle påkrevde felt.', 'error');
                return;
            }
            
            // Phone validation (Norwegian format)
            const phoneRegex = /^(\+47|0047|47)?[2-9]\d{7}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                showNotification('Vennligst oppgi et gyldig norsk telefonnummer.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sender...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    showNotification('Takk for din forespørsel! Vi kontakter deg snart.', 'success');
                    this.reset();
                }, 2000);
            }
        });
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            });
        }
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ===== BACK TO TOP BUTTON =====
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== RESIZE HANDLER =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        }
    });

    // ===== INITIALIZATION =====
    console.log('Walid Frisør - All components initialized');
    
    // Trigger initial handlers
    handleScroll();
});

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
    console.log('Walid Frisør - Window loaded');
    
    // Final preloader cleanup
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 500);
    }
});

