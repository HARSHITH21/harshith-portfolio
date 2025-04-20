// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('show'), 10);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.add('show'), 10);
                    } else {
                        card.classList.remove('show');
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator-bar');
    
    window.addEventListener('scroll', function() {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollIndicator.style.width = progress + '%';
        
        // Update active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(this);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted:', formValues);
            
            // Reset form and show success message
            this.reset();
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
});