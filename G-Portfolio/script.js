// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const pages = document.querySelectorAll('.page');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle navigation
    function showPage(targetPage) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetElement = document.getElementById(targetPage);
        if (targetElement) {
            targetElement.classList.add('active');
        }
        
        // Update active navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === targetPage) {
                link.classList.add('active');
            }
        });
        
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === targetPage) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Desktop navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.dataset.page;
            showPage(targetPage);
        });
    });
    
    // Mobile navigation
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.dataset.page;
            showPage(targetPage);
        });
    });
    
    // Handle "View all" link
    const viewAllLink = document.querySelector('.view-all-link');
    if (viewAllLink) {
        viewAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('blog');
        });
    }
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }
    
    // Smooth animations for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    const cards = document.querySelectorAll('.post-card, .work-card, .work-item, .blog-post');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Social media links (you can replace these with actual links)
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // You can add actual social media URLs here
            console.log('Social media link clicked');
        });
    });
    
    // CTA button animation
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add smooth scrolling for anchor links
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

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}