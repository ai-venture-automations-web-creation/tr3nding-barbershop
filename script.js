// Navigation scroll effect
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(`
        .stats,
        .services__header,
        .services__grid .service-card,
        .about__image,
        .about__content,
        .gallery__header,
        .gallery__item,
        .testimonials__header,
        .testimonial,
        .contact__title,
        .contact__form,
        .contact__info
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // Add staggered animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add staggered animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple form validation
        if (!data.name || !data.email) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.04)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.04)';
    });
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero__image');
    
    if (heroImage && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translate3d(0, ${rate}px, 0) scale(1.1)`;
    }
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on target
        let displayValue;
        if (target >= 1000) {
            displayValue = Math.floor(current / 100) * 100 + '+';
        } else if (target === 5) {
            displayValue = current.toFixed(1);
        } else {
            displayValue = Math.floor(current) + '+';
        }
        
        element.textContent = displayValue;
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stats__number');
            numbers.forEach(number => {
                const text = number.textContent;
                let target;
                
                if (text.includes('5.0')) {
                    target = 5.0;
                } else {
                    target = parseInt(text.replace(/[^0-9]/g, ''));
                }
                
                animateCounter(number, target);
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Mobile menu functionality (if needed in future)
const createMobileMenu = () => {
    // This can be expanded if a mobile menu is needed
    console.log('Mobile menu functionality ready for implementation');
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    console.log('TR3NDING BARBERSHOP website loaded successfully!');
});