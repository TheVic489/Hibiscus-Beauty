/* =========================================================
   Hibiscus Beauty – script.js
   Sticky nav | Mobile menu | Scroll animations | Form | Back-to-top
   ========================================================= */

(function () {
  'use strict';

  /* ---- DOM refs ---- */
  const header      = document.getElementById('header');
  const navToggle   = document.getElementById('navToggle');
  const navMenu     = document.getElementById('navMenu');
  const navLinks    = document.querySelectorAll('.nav-link');
  const backToTop   = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  /* --------------------------------------------------------
     Sticky header + scroll state
  -------------------------------------------------------- */
  function onScroll() {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);

    // Back-to-top visibility
    if (backToTop) {
      const show = window.scrollY > 500;
      backToTop.hidden = !show;
    }

    // Active nav link highlighting
    highlightActiveSection();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* --------------------------------------------------------
     Mobile menu toggle
  -------------------------------------------------------- */
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (navMenu.classList.contains('open') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------
     Active nav link on scroll
  -------------------------------------------------------- */
  const sections = Array.from(
    document.querySelectorAll('section[id], div[id="serveis"]')
  ).filter(Boolean);

  function highlightActiveSection() {
    const scrollMid = window.scrollY + window.innerHeight / 3;
    let current = '';

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollMid) {
        current = sec.id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  /* --------------------------------------------------------
     Scroll-triggered fade-in animations (IntersectionObserver)
  -------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything for browsers without IntersectionObserver
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* --------------------------------------------------------
     Smooth scroll for anchor links (supplemental to CSS)
  -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return; // href="#" – skip
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* --------------------------------------------------------
     Back to top button
  -------------------------------------------------------- */
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------
     Contact form – visual feedback (no backend)
  -------------------------------------------------------- */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name    = contactForm.querySelector('#name');
      const email   = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');
      let valid = true;

      [name, email, message].forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#d9534f';
          field.addEventListener('input', function () {
            field.style.borderColor = '';
          }, { once: true });
          valid = false;
        }
      });

      if (!valid) return;

      // Show success message
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Enviant…';

      setTimeout(function () {
        submitBtn.style.display = 'none';
        formSuccess.hidden = false;
        contactForm.reset();
      }, 1200);
    });
  }

  /* ---- Init ---- */
  onScroll();

  /* --------------------------------------------------------
     Protocol modal
  -------------------------------------------------------- */
  var protocolModal    = document.getElementById('protocolModal');
  var protocolClose    = document.getElementById('protocolModalClose');
  var protocolBackdrop = document.getElementById('protocolModalBackdrop');
  var panelFacials     = document.getElementById('panelFacials');
  var panelCorporals   = document.getElementById('panelCorporals');

  function openProtocolModal(type) {
    if (!protocolModal) return;
    protocolModal.hidden = false;
    document.body.style.overflow = 'hidden';

    if (type === 'facials') {
      panelFacials.hidden  = false;
      panelCorporals.hidden = true;
    } else {
      panelCorporals.hidden = false;
      panelFacials.hidden   = true;
    }

    // Activate first tab in the shown panel
    var activePanel = type === 'facials' ? panelFacials : panelCorporals;
    var firstTab    = activePanel.querySelector('.protocol-tab');
    if (firstTab) activateTab(firstTab, activePanel);

    // Focus close button for accessibility
    if (protocolClose) protocolClose.focus();
  }

  function closeProtocolModal() {
    if (!protocolModal) return;
    protocolModal.hidden = true;
    document.body.style.overflow = '';
  }

  function activateTab(tabBtn, panel) {
    var tabs     = panel.querySelectorAll('.protocol-tab');
    var contents = panel.querySelectorAll('.protocol-tab-content');

    tabs.forEach(function (t) {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    contents.forEach(function (c) {
      c.classList.remove('active');
      c.hidden = true;
    });

    tabBtn.classList.add('active');
    tabBtn.setAttribute('aria-selected', 'true');
    var targetId = tabBtn.getAttribute('aria-controls');
    var target   = document.getElementById(targetId);
    if (target) {
      target.classList.add('active');
      target.hidden = false;
    }
  }

  // Open buttons
  document.querySelectorAll('.btn-protocol').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openProtocolModal(btn.getAttribute('data-protocol'));
    });
  });

  // Close button
  if (protocolClose) {
    protocolClose.addEventListener('click', closeProtocolModal);
  }

  // Backdrop click
  if (protocolBackdrop) {
    protocolBackdrop.addEventListener('click', closeProtocolModal);
  }

  // ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && protocolModal && !protocolModal.hidden) {
      closeProtocolModal();
    }
  });

  // Tab clicks (event delegation on each panel)
  [panelFacials, panelCorporals].forEach(function (panel) {
    if (!panel) return;
    var tabList = panel.querySelector('.protocol-tabs');
    if (!tabList) return;
    tabList.addEventListener('click', function (e) {
      var tab = e.target.closest('.protocol-tab');
      if (!tab) return;
      activateTab(tab, panel);
    });
  });

}());
