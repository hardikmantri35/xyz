/**
 * HARDIK MANTRI - PORTFOLIO CORE SCRIPT
 * Handles theme toggling, interactive canvas particles, typewriter effect,
 * mobile navigation, scroll-reveal animations, project filters, and contact forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initCursorGlow();
  initScrollEffects();
  initTypewriter();
  initCanvasParticles();
  initScrollReveal();
  initProjectFilters();
  initSkillBars();
  initContactForm();
  initStatsCounter();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark & Light Mode with LocalStorage)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('hm_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('hm_theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  themeToggleBtns.forEach(btn => {
    btn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

/* ==========================================================================
   2. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-nav-menu');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  // Highlight active link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Toggle mobile drawer
  if (mobileToggle && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.contains('active');
      mobileToggle.classList.toggle('open', !isOpen);
      mobileMenu.classList.toggle('active', !isOpen);
      if (mobileOverlay) mobileOverlay.classList.toggle('active', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileMenu.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Sticky navbar shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. CUSTOM CURSOR GLOW
   ========================================================================== */
function initCursorGlow() {
  const cursorGlow = document.querySelector('.cursor-glow');
  if (!cursorGlow || window.innerWidth < 768) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Subtle expand effect on clickable items
  const clickables = document.querySelectorAll('a, button, .glass-card, input, textarea');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.35)';
      cursorGlow.style.opacity = '0.9';
    });
    el.addEventListener('mouseleave', () => {
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorGlow.style.opacity = '0.6';
    });
  });
}

/* ==========================================================================
   4. SCROLL PROGRESS & BACK TO TOP
   ========================================================================== */
function initScrollEffects() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    if (backToTopBtn) {
      if (winScroll > 320) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   5. TYPEWRITER ANIMATION (Home Hero)
   ========================================================================== */
function initTypewriter() {
  const typewriterTarget = document.getElementById('typewriter-text');
  if (!typewriterTarget) return;

  const roles = [
    "First-Year CSE Student",
    "Web Developer",
    "Problem Solver",
    "Curious Learner",
    "Future Tech Builder"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const eraseSpeed = 45;
  const pauseTime = 1800;

  function type() {
    const currentWord = roles[roleIndex];

    if (isDeleting) {
      typewriterTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? eraseSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   6. INTERACTIVE CANVAS PARTICLES
   ========================================================================== */
function initCanvasParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 28 : 55;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(139, 92, 246, ';
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Connect close particles with subtle faint lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const lineAlpha = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   7. SCROLL REVEAL ANIMATION (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   8. PROJECT CATEGORY FILTERS (Projects Page)
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue || cardCategory?.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   9. SKILL BARS FILL ANIMATION (Skills Page)
   ========================================================================== */
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-progress-fill');
  if (!skillFills.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-level') || '75%';
        fill.style.width = targetWidth;
        obs.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach(fill => {
    fill.style.width = '0%';
    observer.observe(fill);
  });
}

/* ==========================================================================
   10. CONTACT FORM VALIDATION & FEEDBACK
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('contact-toast');

  if (!contactForm) return;

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" style="width:18px;height:18px;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="4" stroke-opacity="0.25"></circle>
          <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor"></path>
        </svg>
        Sending...
      `;
    }

    // Simulate reliable dispatch
    setTimeout(() => {
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      showToast('Thank you! Your message has been received. Hardik will respond soon.');
    }, 900);
  });

  function showToast(message) {
    if (!toast) return;
    const toastMsg = toast.querySelector('.toast-text') || toast;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

/* ==========================================================================
   11. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        const prefix = entry.target.getAttribute('data-prefix') || '';
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 1500;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const stepIncrement = Math.ceil(target / totalSteps);

        const timer = setInterval(() => {
          count += stepIncrement;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          entry.target.textContent = `${prefix}${count}${suffix}`;
        }, stepTime);

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
}
