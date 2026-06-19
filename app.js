 // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    // Check saved theme
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

    // AOS
    AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });

    // Header scroll
    window.addEventListener('scroll', function() {
      const header = document.getElementById('header');
      const backToTop = document.getElementById('backToTop');
      if (window.scrollY > 50) { 
        header.classList.add('scrolled'); 
        backToTop.classList.add('visible'); 
      } else { 
        header.classList.remove('scrolled'); 
        backToTop.classList.remove('visible'); 
      }
    });

    // Mobile menu
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

    // Back to top
    document.getElementById('backToTop').addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== CHATBOT AI AGENT =====
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const typingIndicator = document.getElementById('typingIndicator');

    chatToggle.addEventListener('click', () => chatWindow.classList.toggle('open'));
    chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));

    function addChatMessage(text, isUser = false, time = null) {
      const div = document.createElement('div');
      div.className = `chat-msg ${isUser ? 'user' : 'bot'}`;
      const timeStr = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      div.innerHTML = text + `<span class="time">${timeStr}</span>`;
      chatBody.appendChild(div);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTyping() { 
      typingIndicator.style.display = 'block'; 
      chatBody.scrollTop = chatBody.scrollHeight; 
    }
    
    function hideTyping() { 
      typingIndicator.style.display = 'none'; 
    }

    // Knowledge base
    function getBotResponse(input) {
      const q = input.toLowerCase().trim();
      if (q.includes('what is next del') || q.includes('about next del') || q.includes('who is next del')) {
        return "Next Del is a software development company providing modern digital solutions for businesses. We specialize in websites, mobile apps, Shopify and WordPress development.";
      }
      if (q.includes('service') || q.includes('offer') || q.includes('do you provide') || q.includes('what do you')) {
        return "We provide five main services: <br>• <strong>Ecommerce Development</strong> – online stores with payment integration<br>• <strong>Custom Website Development</strong> – business websites and web apps<br>• <strong>Mobile App Development</strong> – Android & iOS apps<br>• <strong>Shopify Development</strong> – store setup and customization<br>• <strong>WordPress Development</strong> – custom themes and plugins";
      }
      if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
        return "You can contact us at <strong>nextdelofficial@gmail.com</strong> or use the contact form on this page. We'll get back to you within 24 hours.";
      }
      if (q.includes('website') || q.includes('need a website') || q.includes('build a website')) {
        return "Great! We build modern, responsive websites tailored to your business. Please share your requirements via our contact form, and our team will reach out with a custom proposal.";
      }
      if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('budget')) {
        return "Pricing depends on project complexity and requirements. For a custom quote, please share your project details through our contact form or email us at nextdelofficial@gmail.com.";
      }
      if (q.includes('ecommerce') || q.includes('shop')) {
        return "Our Ecommerce Development includes: online store creation, payment gateway integration (Stripe, PayPal), product management, custom shopping solutions, and admin dashboards.";
      }
      if (q.includes('shopify')) {
        return "Shopify Development: We set up Shopify stores, create custom themes, customize existing themes, and add advanced functionality to help you sell better.";
      }
      if (q.includes('wordpress')) {
        return "WordPress Development: We build business websites, custom themes, and plugin customization. We also provide performance optimization and maintenance.";
      }
      if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
        return "Hello! 👋 How can I assist you today? Feel free to ask about our services, pricing, or anything else.";
      }
      if (q.includes('thanks') || q.includes('thank')) {
        return "You're welcome! Let me know if you need any more information. 😊";
      }
      return "I'd be happy to help with that! For more specific details, please reach out to our team at nextdelofficial@gmail.com or use the contact form. Is there anything else I can assist with?";
    }

    function handleChat() {
      const text = chatInput.value.trim();
      if (!text) return;
      addChatMessage(text, true);
      chatInput.value = '';
      showTyping();
      setTimeout(() => {
        hideTyping();
        const reply = getBotResponse(text);
        addChatMessage(reply);
      }, 800 + Math.random() * 600);
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });

    // Quick actions
    document.querySelectorAll('.chat-quick-actions button').forEach(btn => {
      btn.addEventListener('click', function() {
        const question = this.dataset.question;
        chatInput.value = question;
        handleChat();
      });
    });

    // ===== EMAILJS =====
    (function () {

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

      form.addEventListener("submit", function (e) {
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