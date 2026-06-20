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

// AOS - Initialize with more options for better animations
AOS.init({
  once: false,
  duration: 800,
  easing: 'ease-out-cubic',
  mirror: true,
  offset: 50
});

// Refresh AOS on window resize
window.addEventListener('resize', () => {
  AOS.refresh();
});

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

// ===== 3D BACKGROUND FACTORY =====
function createThreeBackground(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  const scene = new THREE.Scene();
  scene.background = null;

  // Camera
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 0, 6);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Main Group
  const group = new THREE.Group();
  scene.add(group);

  // Colors based on section theme - Green theme
  const primaryColor = options.primaryColor || 0x00c853;
  const secondaryColor = options.secondaryColor || 0x69f0ae;
  const emissiveColor = options.emissiveColor || 0x00a844;

  // 1. Central Blob
  const geoBlob = new THREE.IcosahedronGeometry(1.4, 20);
  const matBlob = new THREE.MeshStandardMaterial({
    color: primaryColor,
    roughness: 0.2,
    metalness: 0.7,
    emissive: emissiveColor,
    emissiveIntensity: 0.2,
  });
  const blob = new THREE.Mesh(geoBlob, matBlob);
  group.add(blob);

  // 2. Wireframe Shell
  const geoWire = new THREE.DodecahedronGeometry(1.9, 0);
  const matWire = new THREE.MeshStandardMaterial({
    color: secondaryColor,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
    emissive: secondaryColor,
    emissiveIntensity: 0.05,
  });
  const wire = new THREE.Mesh(geoWire, matWire);
  group.add(wire);

  // 3. Orbiting Rings
  const ringMat = new THREE.MeshStandardMaterial({
    color: secondaryColor,
    emissive: secondaryColor,
    emissiveIntensity: 0.1,
    transparent: true,
    opacity: 0.25,
    roughness: 0.3,
    metalness: 0.6,
  });

  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.03, 12, 60), ringMat);
  ring1.rotation.x = Math.PI / 2;
  group.add(ring1);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.02, 12, 60), ringMat);
  ring2.rotation.z = Math.PI / 3;
  ring2.rotation.x = Math.PI / 4;
  group.add(ring2);

  const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.015, 12, 60), ringMat);
  ring3.rotation.z = -Math.PI / 4;
  ring3.rotation.y = Math.PI / 3;
  group.add(ring3);

  // 4. Floating Particles
  const particleGroup = new THREE.Group();
  group.add(particleGroup);

  const particleMat = new THREE.MeshStandardMaterial({
    color: secondaryColor,
    emissive: secondaryColor,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.5,
  });

  const particles = [];
  const count = 50;
  for (let i = 0; i < count; i++) {
    const size = 0.03 + Math.random() * 0.08;
    const geo = new THREE.BoxGeometry(size, size, size);
    const mesh = new THREE.Mesh(geo, particleMat.clone());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 2.5 + Math.random() * 1.0;
    mesh.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );
    mesh.userData = {
      theta: theta,
      phi: phi,
      radius: radius,
      speed: 0.06 + Math.random() * 0.2,
      offset: Math.random() * 100,
    };
    particleGroup.add(mesh);
    particles.push(mesh);
  }

  // 5. Glow Aura
  const glowGeo = new THREE.SphereGeometry(2.8, 24, 24);
  const glowMat = new THREE.MeshBasicMaterial({
    color: primaryColor,
    transparent: true,
    opacity: 0.025,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  group.add(glow);

  // Lights
  const ambient = new THREE.AmbientLight(0x404070, 0.4);
  scene.add(ambient);

  const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
  light1.position.set(2, 3, 4);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight(secondaryColor, 0.5);
  light2.position.set(-3, -1, 2);
  scene.add(light2);

  // Animation state
  let elapsed = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 0;
  let targetRotY = 0;

  // Mouse tracking (shared across all instances)
  function onMouseMove(e) {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseX = x * 0.8;
    mouseY = y * 0.6;
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      const x = (t.clientX / window.innerWidth) * 2 - 1;
      const y = -(t.clientY / window.innerHeight) * 2 + 1;
      mouseX = x * 0.8;
      mouseY = y * 0.6;
    }
  }

  // Only add listeners once
  if (!window._threeListenersAdded) {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window._threeListenersAdded = true;
  }

  // Resize
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    elapsed += 0.01;

    // Smooth mouse follow
    targetRotX += (mouseX - targetRotX) * 0.04;
    targetRotY += (mouseY - targetRotY) * 0.04;

    // Auto rotation
    group.rotation.y += 0.002;
    group.rotation.x += Math.sin(elapsed * 0.12) * 0.0005;
    group.rotation.z += Math.sin(elapsed * 0.08) * 0.0003;

    // Mouse influence
    group.rotation.x += targetRotY * 0.0015;
    group.rotation.y += targetRotX * 0.002;

    // Blob pulse
    const pulse = 1 + Math.sin(elapsed * 0.8) * 0.02;
    blob.scale.set(pulse, pulse, pulse);
    blob.material.emissiveIntensity = 0.15 + Math.sin(elapsed * 0.6) * 0.08;

    // Wireframe slow rotation
    wire.rotation.x += 0.0008;
    wire.rotation.y += 0.0015;

    // Rings rotation
    ring1.rotation.z += 0.003;
    ring2.rotation.x += 0.0025;
    ring2.rotation.y += 0.0015;
    ring3.rotation.y += 0.004;
    ring3.rotation.x += 0.0015;

    // Particles orbit
    for (let p of particles) {
      const d = p.userData;
      d.theta += 0.003 * d.speed;
      d.phi += 0.0015 * d.speed;
      p.position.x = d.radius * Math.sin(d.phi) * Math.cos(d.theta);
      p.position.y = d.radius * Math.sin(d.phi) * Math.sin(d.theta);
      p.position.z = d.radius * Math.cos(d.phi);
      const s = 1 + Math.sin(elapsed * 1.5 + d.offset) * 0.25;
      p.scale.set(s, s, s);
    }

    // Glow pulse
    glow.scale.setScalar(1 + Math.sin(elapsed * 0.35) * 0.015);
    glow.material.opacity = 0.025 + Math.sin(elapsed * 0.4) * 0.01;

    renderer.render(scene, camera);
  }

  animate();

  // Handle container resize
  const ro = new ResizeObserver(() => onResize());
  ro.observe(container);

  return {
    scene,
    camera,
    renderer,
    group,
    dispose: () => {
      ro.disconnect();
      renderer.dispose();
    }
  };
}

// ===== INITIALIZE 3D BACKGROUNDS FOR ALL SECTIONS =====
document.addEventListener('DOMContentLoaded', function() {
  // Hero - green theme
  createThreeBackground('bg-canvas-hero', {
    primaryColor: 0x00c853,
    secondaryColor: 0x69f0ae,
    emissiveColor: 0x00a844
  });

  // About section
  createThreeBackground('bg-canvas-about', {
    primaryColor: 0x00c853,
    secondaryColor: 0x69f0ae,
    emissiveColor: 0x00a844
  });

  // Services section
  createThreeBackground('bg-canvas-services', {
    primaryColor: 0x00c853,
    secondaryColor: 0x69f0ae,
    emissiveColor: 0x00a844
  });

  // Why section
  createThreeBackground('bg-canvas-why', {
    primaryColor: 0x00e676,
    secondaryColor: 0x69f0ae,
    emissiveColor: 0x00a844
  });

  // Process section
  createThreeBackground('bg-canvas-process', {
    primaryColor: 0x00c853,
    secondaryColor: 0x69f0ae,
    emissiveColor: 0x00a844
  });

  // Tech section
  createThreeBackground('bg-canvas-tech', {
    primaryColor: 0x00c853,
    secondaryColor: 0x69f0ae,
    emissiveColor: 0x00a844
  });

  // Portfolio section
  createThreeBackground('bg-canvas-portfolio', {
    primaryColor: 0x00c853,
    secondaryColor: 0x69f0ae,
    emissiveColor: 0x00a844
  });

  // Contact section
  createThreeBackground('bg-canvas-contact', {
    primaryColor: 0x00e676,
    secondaryColor: 0x69f0ae,
    emissiveColor: 0x00a844
  });
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

document.querySelectorAll('.chat-quick-actions button').forEach(btn => {
  btn.addEventListener('click', function() {
    const question = this.dataset.question;
    chatInput.value = question;
    handleChat();
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