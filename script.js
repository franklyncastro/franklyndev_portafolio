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

// ── MODAL CERTIFICADOS ──────────────────────────────────────────────────────
const modal        = document.getElementById('certModal');
const modalImg     = document.getElementById('certModalImg');
const modalTitle   = document.getElementById('certModalTitle');
const modalClose   = document.getElementById('certModalClose');
const modalOverlay = document.getElementById('certModalOverlay');

document.querySelectorAll('.cert-view-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.cert-card');
    modalImg.src = card.dataset.cert;
    modalTitle.textContent = card.dataset.certName;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeCertModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { modalImg.src = ''; }, 300);
}

modalClose.addEventListener('click', closeCertModal);
modalOverlay.addEventListener('click', closeCertModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertModal();
});

// ── FORM ─────────────────────────────────────────────────────────────────────
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: data,
  });

  if (res.ok) {
    document.getElementById('form-ok').style.display = 'block';
    form.reset();
    setTimeout(() => {
      document.getElementById('form-ok').style.display = 'none';
    }, 5000);
  }
}