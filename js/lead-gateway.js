/**
 * Lead Gateway Contact Form Integration
 * Handles form submission and sends the lead to the Lead Gateway API
 */

jQuery(document).ready(function ($) {
    // Lead Gateway configuration
    const LEAD_API_URL = "https://lead-gateway-henna.vercel.app/api/leads";
    const LEAD_API_KEY = "b0ffff3c2299551401bdfcf35ea9be8283c0aab612cc0241c5d813e4f0f2a393";
    const LEAD_WEBSITE_ID = "website-c";

    /**
     * Collect and format form data
     * @returns {object} Lead payload for the API
     */
    const preparePayload = function () {
        return {
            website: LEAD_WEBSITE_ID,
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim(),
            source: "contact-form"
        };
    };

    /**
     * Send lead to the Lead Gateway API
     * @param {object} payload - Lead data payload
     */
    const sendLead = function (payload) {
        const settings = {
            async: true,
            crossDomain: true,
            url: LEAD_API_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": LEAD_API_KEY
            },
            data: JSON.stringify(payload)
        };

        $.ajax(settings)
            .done(function (response) {
                showNotification("✅ Your message has been sent successfully! We will contact you soon.", "success");
            })
            .fail(function (error) {
                console.error("Lead Gateway API Error:", error);
                showNotification("⚠️ There was an error sending your message. Please try again or contact us directly.", "error");
            });
    };

    /**
     * Show notification modal
     * @param {string} message - Message to display
     * @param {string} type - Notification type (success/error)
     */
    const showNotification = function (message, type) {
        const modal = document.getElementById("alertModal");
        const alertMessage = document.getElementById("alertMessage");
        
        if (!modal || !alertMessage) {
            alert(message);
            return;
        }

        alertMessage.textContent = message;
        alertMessage.className = type === "success" ? "success-message" : "error-message";
        modal.style.display = "block";

        // Close button handler
        const closeBtn = modal.querySelector(".close");
        if (closeBtn) {
            closeBtn.onclick = function () {
                modal.style.display = "none";
            };
        }

        // Close when clicking outside modal
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        // Auto close after 5 seconds
        setTimeout(() => {
            modal.style.display = "none";
        }, 5000);
    };

    /**
     * Reset form fields to empty
     */
    const resetForm = function () {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
    };

    // Form submission event listener
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const payload = preparePayload();
            sendLead(payload);
            resetForm();
        });
    }
});