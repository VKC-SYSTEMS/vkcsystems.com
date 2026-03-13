(function() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  const bar1 = document.getElementById('bar1');
  const bar2 = document.getElementById('bar2');
  const bar3 = document.getElementById('bar3');
  let isOpen = false;

  // Shadow on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header?.classList.add('shadow-md');
    } else {
      header?.classList.remove('shadow-md');
    }
  });

  function openMenu() {
    isOpen = true;
    toggle?.setAttribute('aria-expanded', 'true');
    menu?.classList.remove('translate-x-full');
    menu?.classList.add('translate-x-0');
    overlay?.classList.remove('opacity-0');
    overlay?.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';

    // Animate hamburger to X
    bar1?.classList.add('translate-y-2', 'rotate-45');
    bar2?.classList.add('opacity-0');
    bar3?.classList.add('-translate-y-2', '-rotate-45');
  }

  function closeMenu() {
    isOpen = false;
    toggle?.setAttribute('aria-expanded', 'false');
    menu?.classList.add('translate-x-full');
    menu?.classList.remove('translate-x-0');
    overlay?.classList.add('opacity-0');
    overlay?.classList.remove('opacity-100');
    document.body.style.overflow = '';

    // Animate X back to hamburger
    bar1?.classList.remove('translate-y-2', 'rotate-45');
    bar2?.classList.remove('opacity-0');
    bar3?.classList.remove('-translate-y-2', '-rotate-45');
  }

  toggle?.addEventListener('click', function() {
    isOpen ? closeMenu() : openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  // Close menu when clicking nav links
  menu?.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
})();
