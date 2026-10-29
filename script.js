/**
 * ISHRAK T. — FULL-STACK DEVELOPER PORTFOLIO
 * Awwwards-Winning Visual Design System & Interactive Core
 * Signature: Deep Ocean Blue, Deep Black, Vibrant Purple & Pink
 * Stack: Three.js (Liquid Galaxy & Floating 3D Orbs), GSAP & ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive components
  initStickyHeader();
  initMobileNav();
  initHeroSpotlight();
  initHeroSparkle3D();
  initCyberShield3D();
  initGSAPAnimations();
  initSmoothScroll();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL STATE
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   3. HERO BACKGROUND SPOTLIGHT (Interactive Purple/Pink Mouse Follower on PC)
   - Follows the user's cursor with smooth linear interpolation (lerp)
   - Deep ocean blue background softly illuminates around the cursor
   - Activates on mouseenter, softly hides on mouseleave
   - On touch/mobile: smoothly disabled, allowing continuous CSS breathing glow
   ========================================================================== */
function initHeroSpotlight() {
  const heroSection = document.getElementById('hero');
  const spotlight = document.getElementById('hero-spotlight');
  if (!heroSection || !spotlight) return;

  const isTouch = ('ontouchstart' in window) || (window.innerWidth <= 768);
  if (isTouch) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isActive = false;

  const onMouseMove = (e) => {
    const rect = heroSection.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (!isActive) {
        isActive = true;
        spotlight.classList.add('active');
      }
    }
  };

  heroSection.addEventListener('mousemove', onMouseMove, { passive: true });

  heroSection.addEventListener('mouseenter', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    currentX = mouseX;
    currentY = mouseY;
    spotlight.classList.add('active');
    isActive = true;
  });

  heroSection.addEventListener('mouseleave', () => {
    spotlight.classList.remove('active');
    isActive = false;
  });

  // Silky-smooth lerp loop for the glowing spotlight
  function updateSpotlight() {
    currentX += (mouseX - currentX) * 0.085;
    currentY += (mouseY - currentY) * 0.085;
    spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(updateSpotlight);
  }
  updateSpotlight();
}

/* ==========================================================================
   3B. TRANSLUCENT 3D SPARKLE / STAR (Hero Background)
   - Rotates continuously on its own
   - Interactive on PC: tilts and follows user cursor with smooth 3D lerp
   - On Mobile: purely automatic smooth CSS 3D rotation
   ========================================================================== */
function initHeroSparkle3D() {
  const heroSection = document.getElementById('hero');
  const sparkleWrapper = document.getElementById('hero-sparkle-wrapper');
  if (!heroSection || !sparkleWrapper) return;

  const isTouch = ('ontouchstart' in window) || (window.innerWidth <= 768);
  if (isTouch) return; // Automatic smooth CSS rotation runs on mobile

  let targetTiltX = 0;
  let targetTiltY = 0;
  let targetMoveX = 0;
  let targetMoveY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;
  let currentMoveX = 0;
  let currentMoveY = 0;

  const onMouseMove = (e) => {
    const rect = heroSection.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      targetTiltX = -relY * 26; // 3D tilt up/down
      targetTiltY = relX * 32;  // 3D tilt left/right
      targetMoveX = relX * 45;  // Subtle 3D shift towards cursor
      targetMoveY = relY * 35;
    }
  };

  heroSection.addEventListener('mousemove', onMouseMove, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    targetTiltX = 0;
    targetTiltY = 0;
    targetMoveX = 0;
    targetMoveY = 0;
  });

  function updateSparkle() {
    currentTiltX += (targetTiltX - currentTiltX) * 0.08;
    currentTiltY += (targetTiltY - currentTiltY) * 0.08;
    currentMoveX += (targetMoveX - currentMoveX) * 0.08;
    currentMoveY += (targetMoveY - currentMoveY) * 0.08;

    sparkleWrapper.style.transform = `translate3d(${currentMoveX}px, ${currentMoveY}px, 0) rotateX(${currentTiltX}deg) rotateZ(${currentTiltY * 0.4}deg) rotateY(${currentTiltY * 0.6}deg)`;
    requestAnimationFrame(updateSparkle);
  }
  updateSparkle();
}

/* ==========================================================================
   4. 3D INTERACTIVE CSS SHIELD (Cybersecurity Section)
   - Silver metallic render with glowing cyber-blue core
   - Smooth 3D tilt tracking user's cursor on hover
   ========================================================================== */
function initCyberShield3D() {
  const cyberTag = document.getElementById('cyber-expansion-tag');
  const shield = document.getElementById('cyber-shield-3d');
  if (!cyberTag || !shield) return;

  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);
  if (isMobile) return; // Keep pure CSS hover state on mobile

  cyberTag.addEventListener('mousemove', (e) => {
    const rect = cyberTag.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = -((y - centerY) / centerY) * 18;
    const tiltY = ((x - centerX) / centerX) * 24;

    shield.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
  });

  cyberTag.addEventListener('mouseleave', () => {
    shield.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
}

/* ==========================================================================
   5. GSAP & SCROLLTRIGGER ANIMATIONS
   ========================================================================== */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP library not detected.');
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // --------------------------------------------------------------------------
  // A. Hero Load Timeline
  // --------------------------------------------------------------------------
  const heroTL = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 1.1 }
  });

  heroTL
    .fromTo(
      '.hero-bg-layer',
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' },
      0.1
    )
    .fromTo(
      '.hero-anim',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12 },
      0.2
    );

  if (typeof ScrollTrigger !== 'undefined') {
    // --------------------------------------------------------------------------
    // B. Projects Section
    // --------------------------------------------------------------------------
    gsap.fromTo(
      '.work-header',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.work-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --------------------------------------------------------------------------
    // C. About Me Section — Scroll-Driven Sticky Stacking Cards (PC & Mobile)
    // --------------------------------------------------------------------------
    gsap.fromTo(
      '.about-header',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    const aboutCards = gsap.utils.toArray('.about-glass-card');
    aboutCards.forEach((card, index) => {
      // Smooth stacking cards: NO dark overlay/blackout
      // Keep glassmorphism, glowing borders, and card contents 100% visible and bright at all times!
      if (index < aboutCards.length - 1) {
        const nextCard = aboutCards[index + 1];
        gsap.to(card, {
          scale: 0.96,
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 85%',
            end: () => (window.innerWidth <= 768 ? 'top 95px' : 'top 120px'),
            scrub: true,
            invalidateOnRefresh: true
          }
        });
      }
    });

    gsap.fromTo(
      '.cyber-expansion-tag',
      { opacity: 0, y: 25, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.cyber-expansion-wrapper',
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );

    // --------------------------------------------------------------------------
    // D. Services Section ('What I Can Do For You')
    // --------------------------------------------------------------------------
    gsap.fromTo(
      '.services-header',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --------------------------------------------------------------------------
    // E. Contact Section Timeline
    // --------------------------------------------------------------------------
    const contactTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    contactTL
      .fromTo(
        '.contact-spotlight',
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      )
      .fromTo(
        ['.contact-badge', '.contact-main-heading', '.contact-description'],
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out' },
        '-=1.0'
      )
      .fromTo(
        '.contact-cta-wrapper',
        { opacity: 0, scale: 0.9, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'back.out(1.5)' },
        '-=0.5'
      )
      .fromTo(
        '.contact-sublinks',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
  }
}

/* ==========================================================================
   6. SMOOTH SCROLLING & ACTIVE LINK HIGHLIGHTING
   ========================================================================== */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, a[href^="#"]');

  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const mainNavLinks = document.querySelectorAll('.main-nav .nav-link');

  const updateActiveLink = () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    mainNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
}
