const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sendButton = document.getElementById("sendButton");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    if (navLinks.classList.contains("open")) {
      menuBtn.textContent = "×";
    } else {
      menuBtn.textContent = "☰";
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.textContent = "☰";
    });
  });
}

if (contactForm && formStatus && sendButton) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent =
        "Please complete all fields before sending.";
      formStatus.style.color = "#FFD700";
      return;
    }

    formStatus.textContent = "Sending your message...";
    formStatus.style.color = "#00C2FF";

    sendButton.disabled = true;
    sendButton.innerHTML = "Sending...";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("The form submission failed.");
      }

      formStatus.textContent =
        "Thank you! Your message has been sent successfully.";
      formStatus.style.color = "#00C2FF";

      contactForm.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      formStatus.textContent =
        "Your message could not be sent. Please try again.";
      formStatus.style.color = "#FFD700";
    } finally {
      sendButton.disabled = false;
      sendButton.innerHTML = "Send Message <span>→</span>";
    }
  });
}