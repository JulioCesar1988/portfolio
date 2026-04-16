// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "tu-proyecto.firebaseapp.com",
    databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "XXXXXXXXXXXX",
    appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXX"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
} catch (e) {
    // Firebase not configured
}

document.addEventListener('DOMContentLoaded', function () {

    // ── Navbar scroll behaviour ──────────────────────────────
    const navbar     = document.getElementById('mainNav');
    const scrollBtn  = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
            navbar.classList.add('navbar-scrolled');
            scrollBtn && scrollBtn.classList.add('show');
        } else {
            navbar.classList.remove('navbar-scrolled');
            scrollBtn && scrollBtn.classList.remove('show');
        }
    }, { passive: true });

    // ── Scroll to top ────────────────────────────────────────
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Active nav link on scroll ────────────────────────────
    const sections  = document.querySelectorAll('section[id], header[id]');
    const navLinks  = document.querySelectorAll('#mainNav .nav-link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            const top    = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // ── Smooth scroll for anchor links ───────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            // Close mobile nav if open
            const navCollapse = document.getElementById('navbarResponsive');
            if (navCollapse && navCollapse.classList.contains('show')) {
                navCollapse.classList.remove('show');
            }
            const offset = navbar ? navbar.offsetHeight : 72;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ── Scroll reveal ────────────────────────────────────────
    const revealTargets = document.querySelectorAll(
        '.skill-card, .project-card, .contact-card, .about-highlights li, .stat-item'
    );

    revealTargets.forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ── Tech badge stagger animation ─────────────────────────
    const badgeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const badges = entry.target.querySelectorAll('.tech-badge');
                badges.forEach(function (badge, i) {
                    badge.style.opacity = '0';
                    badge.style.transform = 'translateY(10px)';
                    badge.style.transition = 'opacity 0.4s ease ' + (i * 0.06) + 's, transform 0.4s ease ' + (i * 0.06) + 's';
                    requestAnimationFrame(function () {
                        badge.style.opacity = '1';
                        badge.style.transform = 'translateY(0)';
                    });
                });
                badgeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-card, .project-card').forEach(function (card) {
        badgeObserver.observe(card);
    });
});
