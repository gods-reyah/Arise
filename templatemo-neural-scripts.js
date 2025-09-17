// JavaScript Document
/*
TemplateMo 597 Neural Glass
https://templatemo.com/tm-597-neural-glass
*/

// ------------------------------
// Mobile menu functionality (Fixed for mobile)
// ------------------------------
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuToggle && mobileNav) {
    const toggleMenu = () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');

        // Lock body scroll when menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);
    mobileMenuToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    const closeMenuOutside = (e) => {
        if (!e.target.closest('.mobile-nav') && !e.target.closest('.mobile-menu-toggle')) {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    document.addEventListener('click', closeMenuOutside);
    document.addEventListener('touchstart', closeMenuOutside);
}

// ------------------------------
// Enhanced smooth scrolling
// ------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return; // Skip dummy links

        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ------------------------------
// Active menu item highlighting
// ------------------------------
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

    let currentSection = '';
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ------------------------------
// Unified scroll handler
// ------------------------------
function onScroll() {
    const scrolled = window.pageYOffset;

    // Header shrink effect
    const header = document.querySelector('header');
    if (header) {
        if (scrolled > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Update active nav item
    updateActiveMenuItem();

    // Parallax effect for shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', updateActiveMenuItem);

// ------------------------------
// Neural lines pulse effect
// ------------------------------
const neuralLines = document.querySelectorAll('.neural-line');
setInterval(() => {
    neuralLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'scaleX(1.2)';
            setTimeout(() => {
                line.style.opacity = '0.2';
                line.style.transform = 'scaleX(0.5)';
            }, 200);
        }, index * 300);
    });
}, 2000);

// ------------------------------
// Enhanced particle generation
// ------------------------------
let particleCount = 0;
const maxParticles = 50; // Limit to prevent lag

function createQuantumParticle() {
    if (particleCount >= maxParticles) return;

    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = ['#00ffff', '#ff0080', '#8000ff'][Math.floor(Math.random() * 3)];
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100vh';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

    document.body.appendChild(particle);
    particleCount++;

    const duration = Math.random() * 3000 + 2000;
    const drift = (Math.random() - 0.5) * 200;

    particle.animate([
        { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
        { transform: `translateY(-100vh) translateX(${drift}px)`, opacity: 1 }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = () => {
        particle.remove();
        particleCount--;
    };
}

setInterval(createQuantumParticle, 1500);

// ------------------------------
// Intersection Observer for animations
// ------------------------------
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-content, .hexagon').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});
