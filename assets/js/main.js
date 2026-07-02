(function () {
  const root = document.documentElement;

  const scrollProgress = document.getElementById('scroll-progress');
  const updateProgress = () => {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height ? (scroll / height) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress);

  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const updateNavIcon = () => {
    const icon = navToggle?.querySelector('i');
    if (!icon || !window.lucide) return;
    const current = icon.getAttribute('data-lucide');
    const next = siteNav.classList.contains('open') ? 'x' : 'menu';
    icon.setAttribute('data-lucide', next);
    lucide.createIcons();
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
      navToggle.classList.toggle('active');
      updateNavIcon();
    });

    document.querySelectorAll('.site-nav a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.classList.remove('active');
        updateNavIcon();
      });
    });
  }

  if (window.Typed) {
    new Typed('.hero-copy h1', {
      strings: [
        'Building polished enterprise Angular interfaces with premium UX.',
        'Transforming designs into maintainable Angular applications.',
        'Delivering responsive UI for modern banking and finance systems.'
      ],
      typeSpeed: 45,
      backSpeed: 20,
      backDelay: 2200,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15
  });
  document.querySelectorAll('.glass-card, .feature-card, .service-card, .timeline-card, .project-card, .stat-card, .education-card, .contact-form, .hero-card').forEach(el => {
    observer.observe(el);
  });

  const counters = document.querySelectorAll('.stat-value');
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      let current = 0;
      const increment = Math.max(1, Math.floor(target / 40));
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 30);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  const initializeUI = () => {
    if (window.lucide) {
      lucide.createIcons();
    }
    if (window.GLightbox) {
      GLightbox({ selector: '.portfolio-lightbox' });
    }
    if (window.AOS) {
      AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, mirror: false });
    }

    const backToTop = document.querySelector('.back-to-top');
    const toggleBackToTop = () => {
      if (!backToTop) return;
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();

    if (backToTop) {
      backToTop.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const navToggleIcon = document.querySelector('.nav-toggle i');
    if (navToggleIcon && window.lucide) {
      lucide.createIcons();
    }
  };

  if (document.readyState !== 'loading') {
    initializeUI();
  } else {
    document.addEventListener('DOMContentLoaded', initializeUI);
  }
})();
