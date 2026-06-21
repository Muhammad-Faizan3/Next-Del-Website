  // Same theme toggle and menu script as about.html
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
    window.addEventListener('scroll', function() {
      const header = document.getElementById('header');
      if (window.scrollY > 50) { header.classList.add('scrolled'); }
      else { header.classList.remove('scrolled'); }
    });
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