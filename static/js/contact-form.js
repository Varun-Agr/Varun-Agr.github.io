/**
 * Contact Form Handler
 * Handles form submission via AJAX to Google Apps Script
 */
(function() {
    'use strict';

    // Initialize form handler when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFormHandler);
    } else {
        initFormHandler();
    }

    function initFormHandler() {
        const form = document.querySelector('.contact__form');
        if (!form) return;

        form.addEventListener('submit', handleFormSubmit);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Get form data
        const formData = new FormData(form);

        // Convert to URL-encoded format
        const data = new URLSearchParams(formData).toString();

        try {
            // Submit to Google Apps Script
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data,
                mode: 'no-cors' // Required for Google Apps Script
            });

            // Since mode is 'no-cors', we can't read the response
            // We'll assume success if no error is thrown
            showMessage(form, 'success', 'Thank you! Your message has been sent successfully. I will get back to you soon.');
            form.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            showMessage(form, 'error', 'There was an error sending your message. Please try again or email me directly at hello@varunagrawal.com');
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }

    function showMessage(form, type, message) {
        // Remove any existing message
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;

        // Insert before the submit button row
        const submitRow = form.querySelector('.row:last-child');
        form.insertBefore(messageDiv, submitRow);

        // Auto-hide after 8 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 8000);
    }
})();
