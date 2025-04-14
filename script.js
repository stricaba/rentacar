   // Smooth scroll and update dynamic text content
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Add background fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = 0;
        hero.style.transition = 'opacity 1s ease-in';
        setTimeout(() => {
            hero.style.opacity = 1;
        }, 100);
    }
    
    // Add CSS for menu animation
    const style = document.createElement('style');
    style.textContent = `
        .nav-links {
            display: flex;
            opacity: 1;
            transform: translateY(0);
            justify-content: center;
            align-items: center;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                transform: translateY(-100%);
                transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.3s ease;
                opacity: 0;
                position: fixed;
                top: -40px; /* Changed from -20px to -40px */
                left: 0;
                width: 100%;
                height: 100vh;
                background: #1a1a1a;
                backdrop-filter: blur(10px);
                padding: 5rem 1rem 1rem;
                flex-direction: column;
                z-index: 999;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            .nav-links a {
                margin: 10px 0;
                padding: 10px 0;
                width: 100%;
                display: block;
                text-align: center;
            }
            .nav-links.active {
                transform: translateY(40px); /* Changed from 20px to 40px */
                opacity: 1;
            }
            .menu-btn {
                display: block;
                transition: transform 0.3s ease;
                z-index: 1000;
            }
        }
        
        @media (min-width: 769px) {
            .menu-btn {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});

document.querySelectorAll('.service-card, .vehicle-card').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.1s ease-out';
    observer.observe(el);
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    
    navLinks.classList.toggle('active');
    
    // Add staggered animation to menu items
    if (navLinks.classList.contains('active')) {
        const links = navLinks.querySelectorAll('a');
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-10px)';
            link.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
}
