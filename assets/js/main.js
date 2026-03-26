document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initMobileNav();
  initDropdown();
  initScrollAnimations();
  setActiveNav();
});

function initLanguage() {
  const lang = localStorage.getItem('lang') || 'fr';
  applyLanguage(lang);
}

function switchLanguage() {
  const current = localStorage.getItem('lang') || 'fr';
  const next = current === 'fr' ? 'en' : 'fr';
  localStorage.setItem('lang', next);
  applyLanguage(next);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  // Update text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update innerHTML (for elements with HTML content)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update lang toggle button text
  const toggleBtn = document.querySelector('.lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'fr' ? 'EN' : 'FR';
  }
}

function initMobileNav() {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('nav-open');
      document.body.classList.toggle('nav-active');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('nav-open');
        document.body.classList.remove('nav-active');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('nav-open')) {
        burger.classList.remove('open');
        navLinks.classList.remove('nav-open');
        document.body.classList.remove('nav-active');
      }
    });
  }
}

function initDropdown() {
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

function setActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html') || (filename === '/' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
