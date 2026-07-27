document.addEventListener('DOMContentLoaded', function() {
    
    // mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active'); // For icon animation
        });
    }

    // Phone click conversion tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {'send_to': 'AW-994374014/TIq1CLWZx9ccEP7ik9oD'});
            }
        });
    });
    
    // close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // --- faq code needs to run ---
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // close all other items before opening a new one
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // ifffff the clicked item wasn't already active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    

});