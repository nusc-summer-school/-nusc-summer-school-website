document.addEventListener('DOMContentLoaded', function() {
    // Countdown timer
    const summerSchoolDate = new Date('July 7, 2025 09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = summerSchoolDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display results
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If countdown is over
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    // Initial call
    updateCountdown();
    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            faqItem.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });
    
    // Check fade on scroll
    window.addEventListener('scroll', checkFade);
    // Initial check
    checkFade();
    
    // Form submission handling
    const enrollmentForm = document.getElementById('enrollment-form');
    const contactForm = document.getElementById('contact-form');
    
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            let isValid = true;
            const requiredFields = enrollmentForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Check if at least one workshop is selected
            const workshops = enrollmentForm.querySelectorAll('input[name="workshops"]:checked');
            const workshopError = enrollmentForm.querySelector('.checkbox-group');
            
            if (workshops.length === 0) {
                isValid = false;
                if (workshopError) {
                    workshopError.classList.add('error');
                }
            } else {
                if (workshopError) {
                    workshopError.classList.remove('error');
                }
            }
            
            if (isValid) {
                // Here you would normally send the data to the server
                // For demo purposes, we'll simulate a successful submission
                alert('Thank you for your enrollment! We will contact you shortly with further details.');
                enrollmentForm.reset();
            } else {
                alert('Please fill in all required fields and select at least one workshop.');
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Here you would normally send the data to the server
                // For demo purposes, we'll simulate a successful submission
                alert('Thank you for your message! We will get back to you as soon as possible.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Style for form validation
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.classList.remove('error');
        });
    });
    
    // Add error class styles
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: var(--accent) !important;
            box-shadow: 0 0 0 1px var(--accent);
        }
    `;
    document.head.appendChild(style);
    
    // GitHub repository links - Update repository links if they change
    document.querySelectorAll('.workshop .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // You can add custom tracking or validation here if needed
            console.log('Repository accessed:', this.href);
        });
    });
    
    // Add warning for workshop selection limit
    const workshopCheckboxes = document.querySelectorAll('input[name="workshops"]');
    const MAX_WORKSHOPS = 3; // Maximum number of workshops allowed
    
    workshopCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedWorkshops = document.querySelectorAll('input[name="workshops"]:checked');
            
            if (selectedWorkshops.length > MAX_WORKSHOPS) {
                alert(`You can select a maximum of ${MAX_WORKSHOPS} workshops. Please adjust your selection.`);
                this.checked = false;
            }
        });
    });
});