document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Audio Player Functionality
    const playButtons = document.querySelectorAll('.play-btn');
    const audioPlayer = document.getElementById('audio-player');
    const audioPlayerContainer = document.querySelector('.audio-player');
    const closePlayerBtn = document.getElementById('close-player');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioSrc = this.getAttribute('data-audio');
            audioPlayer.src = audioSrc;
            audioPlayerContainer.classList.remove('hidden');
            audioPlayer.play();
        });
    });
    
    closePlayerBtn.addEventListener('click', function() {
        audioPlayer.pause();
        audioPlayerContainer.classList.add('hidden');
    });
    
    // Simple form submission (would need backend in real implementation)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! MasterD will get back to you soon.');
            this.reset();
        });
    }
    
    // Gallery lightbox functionality (would need more complex implementation for full lightbox)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real implementation, this would open a lightbox with the image
            console.log('Image clicked - would open lightbox in full implementation');
        });
    });
});