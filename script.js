/* Rana Nidhi — Portfolio interactions (vanilla JavaScript, no dependencies) */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  /* ---------- Header state on scroll ---------- */
  var header = document.getElementById('site-header');
  function updateHeader() {
    if (header) { header.classList.toggle('is-scrolled', window.scrollY > 12); }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!toggle || !menu) { return; }
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setMenu(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !e.target.closest('.nav')) { setMenu(false); }
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function () { setMenu(false); });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    revealEls.forEach(function (el, i) {
      // light stagger for siblings inside the same grid
      var siblingIndex = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.setProperty('--d', Math.min(siblingIndex, 5) * 70 + 'ms');
    });
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Active nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = '#' + entry.target.id;
          navLinks.forEach(function (a) {
            var active = a.getAttribute('href') === id;
            a.classList.toggle('is-active', active);
            if (active) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Project detail dialogs ---------- */
  var openers = document.querySelectorAll('[data-modal-target]');
  var lastTrigger = null;

  function openModal(dialog, trigger) {
    if (!dialog) { return; }
    lastTrigger = trigger || null;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');   // graceful fallback for very old browsers
    }
    document.body.classList.add('modal-open');
    var inner = dialog.querySelector('.modal-inner');
    if (inner) { inner.scrollTop = 0; }
  }

  function closeModal(dialog) {
    if (!dialog) { return; }
    if (typeof dialog.close === 'function') { dialog.close(); } else { dialog.removeAttribute('open'); }
    afterClose();
  }

  function afterClose() {
    if (!document.querySelector('dialog[open]')) { document.body.classList.remove('modal-open'); }
    if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
  }

  openers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(document.getElementById(btn.getAttribute('data-modal-target')), btn);
    });
  });

  document.querySelectorAll('dialog.modal').forEach(function (dialog) {
    dialog.addEventListener('close', afterClose);   // fires on Esc and on .close()
    dialog.addEventListener('click', function (e) {
      // click on the backdrop (the dialog element itself, outside the inner panel)
      if (e.target === dialog) { closeModal(dialog); }
    });
    dialog.querySelectorAll('[data-modal-close]').forEach(function (b) {
      b.addEventListener('click', function () { closeModal(dialog); });
    });
  });

  /* ---------- Placeholder links ---------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;
  function showToast(message) {
    if (!toast) { return; }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove('is-visible'); }, 4200);
  }

  document.querySelectorAll('a.is-placeholder').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('This ' + (a.getAttribute('data-placeholder') || 'link') + ' is a placeholder. Replace it in index.html with the real one.');
    });
  });
})();
