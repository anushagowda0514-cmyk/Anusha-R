/**
 * ==========================================================================
 * ANUSHA R - PORTFOLIO INTERACTIVE ENGINE (Vanilla JavaScript)
 * Strictly HTML, CSS, JS - Ready for GitHub Pages deployment
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Custom Cursor Glow Follower
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // 3. Reading Scroll Progress Bar & Navbar Sticky Effect
  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    highlightActiveNavLink();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // Active Nav Link on Scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 5. Dynamic Typing Animation in Hero
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget) {
    const phrases = [
      'B.Com Scholar (8.5 CGPA)',
      'Digital Marketing Executive @ ProfitHax',
      'Financial Reporting & Tally Specialist',
      'MS Excel & Data Analytics Enthusiast',
      'Brand Strategist (Plumbex Expo \'26)',
      'Customer Relations Professional'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 90;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 45;
      } else {
        typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeDelay = 1800; // Pause at end of text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeDelay = 400; // Pause before new phrase
      }

      setTimeout(typeLoop, typeDelay);
    };

    typeLoop();
  }

  // 6. Interactive Constellation Canvas in Hero
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 130 };

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;
        this.color = Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(2, 132, 199, ';
        this.alpha = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse reaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = (dx / dist) * force * 3;
            const dirY = (dy / dist) * force * 3;
            this.x -= dirX;
            this.y -= dirY;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 75);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    const connectParticles = () => {
      const maxDist = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = 1 - dist / maxDist;
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.22})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }

  // 7. Interactive 3D Tilt Effect on Cards
  const tiltElements = document.querySelectorAll('[data-tilt]');
  if (window.matchMedia('(min-width: 992px)').matches) {
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const tiltX = -deltaY * 8; // max 8 deg
        const tiltY = deltaX * 8;

        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      });
    });
  }

  // 8. Animated Rolling Counters (Intersection Observer)
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = ease * target;

        counter.textContent = currentVal.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target.toFixed(decimals);
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          animateCounters();
          countersAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(metricsSection);
  }

  // 9. Skills Section Progress Bar Animation & Filtering
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillsSection.classList.add('in-view');
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  // Skills Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 10. Scroll Reveal for Timeline & Other Elements
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 11. Modal Popup for Project Case Study
  const openModalBtn = document.getElementById('open-project-modal');
  const closeModalBtn = document.getElementById('close-project-modal');
  const projectModal = document.getElementById('project-modal');
  const modalContactTrigger = document.querySelector('.modal-contact-trigger');

  if (openModalBtn && projectModal) {
    openModalBtn.addEventListener('click', () => {
      projectModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeModal = () => {
    if (projectModal) {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  if (modalContactTrigger) {
    modalContactTrigger.addEventListener('click', closeModal);
  }

  // 12. Copy to Clipboard & Toast Alert
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  let toastTimeout;

  const showToast = (message) => {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  const copyButtons = document.querySelectorAll('.copy-btn, .mini-copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-clipboard');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
          
          // Temporary icon change
          const icon = btn.querySelector('i');
          if (icon) {
            const originalClass = icon.className;
            icon.className = 'fa-solid fa-check';
            setTimeout(() => {
              icon.className = originalClass;
            }, 1800);
          }
        }).catch(() => {
          showToast('Failed to copy. Please manually copy.');
        });
      }
    });
  });

});
