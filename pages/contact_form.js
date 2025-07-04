document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // --- Email Validation ---
    if (!email) {
      alert("❌ Please enter your email address.");
      emailInput.focus();
      return;
    } else if (!validateEmail(email)) {
      alert("❌ Invalid email format.");
      emailInput.focus();
      return;
    }

    // --- Message Validation ---
    if (!message) {
      alert("❌ Please enter your message.");
      messageInput.focus();
      return;
    }

    // --- Success Handling ---
    alert("✅ Your message has been sent successfully!");
    contactForm.reset();
  });

  // Email format checker using regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
