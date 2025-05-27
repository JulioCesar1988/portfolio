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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Visit counter functionality
function updateVisitCount() {
    const visitCountRef = database.ref('visits');
    visitCountRef.transaction((currentCount) => {
        return (currentCount || 0) + 1;
    });
    
    visitCountRef.on('value', (snapshot) => {
        const count = snapshot.val() || 0;
        document.getElementById('visitCount').textContent = count.toLocaleString();
    });
}

// Counter animation
function animateCounter(target) {
    const counter = document.getElementById('visitCount');
    const duration = 2000; // 2 seconds
    const steps = 60; // 60fps
    const stepValue = target / steps;
    let current = 0;
    
    const updateCounter = () => {
        current += stepValue;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// Navbar scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    // Initialize visit counter
    updateVisitCount();

    // Initialize counter animation
    animateCounter(100);

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
            
            // Obtener los valores del formulario
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                subject: this.querySelectorAll('input[type="text"]')[1].value,
                message: this.querySelector('textarea').value
            };

            // Crear el enlace mailto con los datos del formulario
            const mailtoLink = `mailto:julio.unlp2010@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
            )}`;

            // Abrir el cliente de correo predeterminado
            window.location.href = mailtoLink;

            // Mostrar mensaje de éxito
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