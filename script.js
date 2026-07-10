/* ---- STICKY NAV + SCROLL TOP ---- */
const navbar    = document.getElementById('navbar');
const scrollBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    scrollBtn.classList.add('visible');
    } else {
    navbar.classList.remove('scrolled');
    scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- HAMBURGER MENU ---- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    const isOpen = hamburger.classList.contains('open');
    mobileMenu.style.display = isOpen ? 'flex' : 'none';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.style.display = 'none';
    });
});

/* ---- TYPEWRITER EFFECT ---- */
const words  = ['FRONTEND', 'CREATIVE', 'UI/UX'];
const target = document.getElementById('typewriter-text');
let wordIdx  = 0;
let charIdx  = 0;
let deleting = false;

function typeLoop() {
    const current = words[wordIdx];
    if (!deleting) {
    target.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
    }
    } else {
    target.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
        deleting = false;
        wordIdx  = (wordIdx + 1) % words.length;
    }
    }
    setTimeout(typeLoop, deleting ? 60 : 110);
}
typeLoop();

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll('.reveal, .reveal-left');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
    }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ---- SKILL BARS ANIMATION ---- */
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        skillObserver.unobserve(bar);
    }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ---- CONTACT FORM (Formspree) ---- */
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending…';

    try {
    const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
    });

    if (res.ok) {
        formStatus.className = 'form-status success';
        formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
        form.reset();
    } else {
        throw new Error('Server error');
    }
    } catch {
    formStatus.className = 'form-status error';
    formStatus.textContent = '✗ Something went wrong. Please try emailing me directly.';
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Send Message';

    setTimeout(() => {
    formStatus.className = 'form-status';
    }, 6000);
});