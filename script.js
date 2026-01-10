// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initPreloader();
    initMobileMenu();
    initThemeToggle();
    initTextAnimation();
    initSkillAnimation();
    initContactForm();
    initBackToTop();
    initScrollSpy();
    initActiveNavLinks();
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 1500);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    
    menuIcon.addEventListener('click', function() {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }
    
    themeIcon.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        
        if (body.classList.contains('light-theme')) {
            themeIcon.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Text Animation
function initTextAnimation() {
    const animatedText = document.querySelector('.animated-text');
    const texts = ['Web Developer', 'UI/UX Designer', 'Mobile Developer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            animatedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            animatedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // If text is fully typed
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 1500); // Wait before deleting
        }
        // If text is fully deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Move to next text
            setTimeout(typeText, 500); // Wait before typing next
        }
        // Continue typing/deleting
        else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeText, speed);
        }
    }
    
    // Start animation
    setTimeout(typeText, 1000);
}

// Skill Animation
function initSkillAnimation() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillProgresses.forEach(progress => {
            const level = progress.getAttribute('data-level');
            progress.style.width = level + '%';
        });
    }
    
    // Animate on scroll
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            if (!data.name || !data.email || !data.message) {
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.classList.remove('success');
                }, 5000);
            } else {
                // Show error message
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
                
                // Hide message after 3 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.classList.remove('error');
                }, 3000);
            }
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Spy for Active Navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.navbar a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.navbar a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    });
}

// Initialize Active Navigation Links
function initActiveNavLinks() {
    // Set home as active by default
    document.querySelector('.navbar a[href="#home"]').classList.add('active');
    
    // Add click event to all nav links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            document.querySelectorAll('.navbar a').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});