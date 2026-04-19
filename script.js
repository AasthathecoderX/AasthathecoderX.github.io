(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('navLinks');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const revealItems = document.querySelectorAll('[data-reveal]');

  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function setTheme(next) {
    theme = next;
    root.setAttribute('data-theme', theme);

    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
      );

      themeToggle.innerHTML =
        theme === 'dark'
          ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>'
          : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
  }

  setTheme(theme);

  themeToggle?.addEventListener('click', () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timelineItems.forEach((item) => item.classList.remove('is-active'));
          entry.target.classList.add('is-active');
        }
      });
    },
    {
      threshold: 0.55
    }
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });
})();