window.addEventListener('load', function () {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);
});

const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', function () {
    navLinks.classList.toggle('active');

    const spans = mobileMenu.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navLinks.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            navLinks.classList.remove('active');
            const spans = mobileMenu.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const scrollTop = document.getElementById('scrollTop');

    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        scrollTop.classList.add('visible');
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        scrollTop.classList.remove('visible');
    }
});

document.getElementById('scrollTop').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const tabButtons = document.querySelectorAll('.tab-button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

tabButtons.forEach(button => {
    button.addEventListener('click', function () {
        const category = this.getAttribute('data-tab');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});


function highlight() {
    fileLabel.style.borderColor = '#667eea';
    fileLabel.style.background = 'rgba(102, 126, 234, 0.1)';
}

function unhighlight() {
    fileLabel.style.borderColor = '#e0e0e0';
    fileLabel.style.background = 'transparent';
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = counter.textContent.replace(/\D/g, '');
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        let count = 0;
        const increment = target / speed;

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(count) + suffix;
            }
        }, 10);
    });
}

const heroObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

heroObserver.observe(document.querySelector('.hero-stats'));

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero::before');
    if (heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    revealObserver.observe(section);
});

document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

setTimeout(() => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
}, 1500);

document.querySelectorAll('.feature-icon').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
    icon.style.animation = 'float 3s ease-in-out infinite';
});

const style = document.createElement('style');
style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
document.head.appendChild(style);

document.querySelectorAll('.cta-button, .submit-btn, .tab-button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.offsetX - 10) + 'px';
        ripple.style.top = (e.offsetY - 10) + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
// OpenStreetMap Karte mit Leaflet initialisieren
const map = L.map('map').setView([32.6189, 36.1058], 13); // Bosra, Syrien

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Marker hinzufügen
L.marker([32.6189, 36.1058])
    .addTo(map)
    .bindPopup('<a href="https://maps.google.com/?q=32.6189,36.1058" target="_blank">افتح في خرائط Google</a>')
    .openPopup();



console.log('DruckProfi Website loaded successfully! 🖨️');