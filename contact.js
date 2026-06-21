// ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    let currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);
    themeToggle.addEventListener('click', function() {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      currentTheme = theme;
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light';
      } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark';
      }
    }

    // ===== HEADER SCROLL =====
    window.addEventListener('scroll', function() {
      const header = document.getElementById('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // ===== EMAILJS =====
    (function() {
      const EMAILJS_PUBLIC_KEY = "wePKbY_ce076gNED7";
      const EMAILJS_SERVICE_ID = "service_gmg8doq";
      const EMAILJS_TEMPLATE_ID = "template_ia0mnym";
      const EMAILJS_AUTO_REPLY_TEMPLATE_ID = "template_ekzhrlt";

      emailjs.init(EMAILJS_PUBLIC_KEY);

      const form = document.getElementById("contactForm");
      const sendBtn = document.getElementById("sendBtn");
      const toast = document.getElementById("toast");
      const toastMessage = document.getElementById("toastMessage");

      function showToast(message, isError = false) {
        toastMessage.textContent = message;
        toast.className = "toast";
        if (isError) {
          toast.classList.add("error");
        }
        toast.classList.add("show");
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
          toast.classList.remove("show");
        }, 5000);
      }

      form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("userName").value.trim();
        const email = document.getElementById("userEmail").value.trim();
        const message = document.getElementById("userMessage").value.trim();

        if (!name || !email || !message) {
          showToast("Please fill in all required fields.", true);
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showToast("Please enter a valid email address.", true);
          return;
        }

        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:10px;"></i>Sending...';

        const templateParams = {
          from_name: name,
          from_email: email,
          message: message,
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then(() => {
            return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_TEMPLATE_ID, templateParams);
          })
          .then(() => {
            showToast("✅ Message sent successfully!");
            form.reset();
          })
          .catch((error) => {
            console.error("EmailJS Error:", error);
            showToast("❌ Failed to send message.", true);
          })
          .finally(() => {
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="fas fa-paper-plane" style="margin-right:10px;"></i>Send Message';
          });
      });
    })();