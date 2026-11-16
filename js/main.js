// EnerSync Global — Main JS

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
    });
  }

  // --- Active nav link highlighting ---
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });

  // --- Sticky header shadow on scroll ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    });
  }

  // --- Phase tabs (products.html) ---
  const tabs = document.querySelectorAll('.phase-tab');
  const panels = document.querySelectorAll('.phase-panel');
  if (tabs.length && panels.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-phase-target');
        tabs.forEach(t => t.classList.remove('is-active'));
        panels.forEach(p => p.classList.remove('is-active'));
        tab.classList.add('is-active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.classList.add('is-active');
      });
    });
  }

  // --- Contact form validation ---
  const form = document.querySelector('#lead-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        const wrapper = field.closest('.field');
        if (!field.value.trim()) {
          wrapper.classList.add('has-error');
          valid = false;
        } else {
          wrapper.classList.remove('has-error');
        }
      });

      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value) {
        const wrapper = emailField.closest('.field');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
          wrapper.classList.add('has-error');
          const msg = wrapper.querySelector('.field-msg');
          if (msg) msg.textContent = 'Please enter a valid email address.';
          valid = false;
        }
      }

      const status = form.querySelector('.form-status');
      if (valid) {
        if (status) {
          status.textContent = 'Thank you — your message has been received. Our team will follow up at the email provided.';
          status.classList.add('is-visible');
        }
        form.reset();
      } else if (status) {
        status.classList.remove('is-visible');
      }
    });

    form.querySelectorAll('input, textarea').forEach(f => {
      f.addEventListener('input', () => {
        f.closest('.field').classList.remove('has-error');
      });
    });
  }

  // --- Smooth scroll for in-page anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
