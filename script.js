// ── NAV SCROLL ───────────────────────────────────────────────────────────────
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── REVEAL ON SCROLL ─────────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── DARK MODE ────────────────────────────────────────────────────────────────
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

// Leer preferencia guardada o detectar la del sistema
const savedTheme  = localStorage.getItem('theme');
const systemDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initTheme   = savedTheme || (systemDark ? 'dark' : 'light');

applyTheme(initTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☽' : '☀';
}

// ── FORM ─────────────────────────────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  document.getElementById('form-ok').style.display = 'block';
  e.target.reset();
  setTimeout(() => {
    document.getElementById('form-ok').style.display = 'none';
  }, 5000);
}