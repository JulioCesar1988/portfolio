// Navbar scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNav');
    const scrollToTop = document.querySelector('.scroll-to-top');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            scrollToTop.classList.add('show');
        } else {
            navbar.classList.remove('navbar-scrolled');
            scrollToTop.classList.remove('show');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Scroll to top button
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí puedes agregar la lógica para enviar el formulario
            alert('Gracias por tu mensaje. Te responderé pronto.');
            contactForm.reset();
        });
    }

    // Portfolio item hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.portfolio-item-caption').style.opacity = '1';
        });
        item.addEventListener('mouseleave', function() {
            this.querySelector('.portfolio-item-caption').style.opacity = '0';
        });
    });

    // Typing effect for the header
    const headerText = document.querySelector('.masthead-subheading');
    if (headerText) {
        const text = headerText.textContent;
        headerText.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                headerText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        typeWriter();
    }
});