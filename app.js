document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active'); // For icon animation
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // --- THIS IS THE FAQ CODE THAT NEEDS TO RUN ---
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items before opening a new one
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // If the clicked item wasn't already active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // B2B Quote Form Submission
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            if (!quoteForm.checkValidity()) {
                quoteForm.reportValidity();
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const formData = new FormData(this);

            // --- IMPORTANT ---
            // Remember to replace 'YOUR_FORM_ID' with your actual Formspree endpoint!
            const formSpreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';

            fetch(formSpreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    const formCard = document.querySelector('.form-card');
                    formCard.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Thank You!</h3>
                            <p>Your quote request has been sent. Our specialists will get back to you shortly.</p>
                        </div>`;
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                           alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                           throw new Error('Network response was not ok.');
                        }
                    })
                }
            })
            .catch(error => {
                console.error('There was a problem with the form submission:', error);
                alert('Sorry, there was an error sending your message. Please try again later or call us directly.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }
});