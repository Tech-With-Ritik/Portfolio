/* ---------- Clean Portfolio Script ---------- */
const roles = ['Full Stack Developer', 'AI Engineer', 'Problem Solver', 'Python Developer'];
let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const typingText = document.getElementById('typing-text');
const skillProgressBars = document.querySelectorAll('.skill-progress');

function getThemeIcon() {
    return themeToggle ? themeToggle.querySelector('i') : null;
}

function typeWriter() {
    const role = roles[currentRoleIndex];

    if (isDeleting) {
        currentCharIndex -= 1;
        typingText.textContent = role.substring(0, currentCharIndex);
        typingSpeed = 50;
    } else {
        currentCharIndex += 1;
        typingText.textContent = role.substring(0, currentCharIndex);
        typingSpeed = 100;
    }

    if (!isDeleting && currentCharIndex === role.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeWriter, typingSpeed);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = getThemeIcon();
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function loadTheme() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function animateSkillBars() {
    skillProgressBars.forEach((bar) => {
        const progress = bar.dataset.progress;
        const offsetTop = bar.getBoundingClientRect().top;
        if (offsetTop < window.innerHeight - 100) {
            bar.style.width = `${progress}%`;
        }
    });
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach((counter) => {
        const target = Number(counter.textContent.replace('+', '')) || 0;
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 35));

        const update = () => {
            current += increment;
            if (current < target) {
                counter.textContent = `${current}+`;
                requestAnimationFrame(update);
            } else {
                counter.textContent = `${target}+`;
            }
        };

        const observer = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                update();
                obs.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

function initProjectCards() {
    document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

function init3DPhotoEffects() {
    document.querySelectorAll('.photo-3d-card').forEach((card) => {
        const inner = card.querySelector('.photo-3d-inner');
        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / rect.height) * 12;
            const rotateY = ((rect.width / 2 - x) / rect.width) * 12;
            inner.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

function initServicesAnimations() {
    const cards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function addAnimationClasses() {
    document.querySelectorAll('section').forEach((section) => {
        section.classList.add('fade-in');
    });
    document.querySelectorAll('.project-card, .skill-item').forEach((item) => {
        item.classList.add('fade-in');
    });
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    if (aboutImage) aboutImage.classList.add('slide-in-left');
    if (aboutText) aboutText.classList.add('slide-in-right');
}

function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (event) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                event.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 72,
                    behavior: 'smooth'
                });
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

function initializeNavigation() {
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

function initializeThemeToggle() {
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function initBackgroundParallax() {
    const bg = document.querySelector('.liquid-background');
    if (!bg) return;
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        bg.style.transform = `translate(${x}px, ${y}px)`;
    });
}

function initCardSpotlight() {
    const cards = document.querySelectorAll('.service-card, .project-card, .stat, .skill-item, .contact-form, .skills-category, .timeline-content, .navbar');
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initializeNavigation();
    initializeThemeToggle();
    smoothScroll();
    initBackgroundParallax();
    initCardSpotlight();
    setTimeout(typeWriter, 600);
    animateCounters();
    animateSkillBars();
    initProjectCards();
    init3DPhotoEffects();
    initServicesAnimations();
    addAnimationClasses();
});

window.addEventListener('scroll', () => {
    animateSkillBars();
});
