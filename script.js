// --- Repo link (set once) ---
document.getElementById("repoLink").href = "https://github.com/your-username/your-repo";

// --- Theme toggle with persistence ---
const root = document.documentElement;
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const savedTheme = localStorage.getItem('theme');  // 'light' | 'dark' | null
if ((savedTheme === 'light') || (!savedTheme && prefersLight)) root.classList.add('light');

const tBtn = document.getElementById('themeToggle');
const setPressed = () => tBtn.setAttribute('aria-pressed', root.classList.contains('light'));
setPressed();

tBtn.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  setPressed();
});

// --- Project tag filters (no libs) ---
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const tag = btn.dataset.tag;
    cards.forEach(card => {
      const has = card.dataset.tags.split(' ').includes(tag);
      card.style.display = (tag === 'all' || has) ? '' : 'none';
    });
  });
});

// --- Contact form (demo only, no network) ---
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const note = e.currentTarget.querySelector('.form-note');
  const data = new FormData(e.currentTarget);
  const email = data.get('email')?.trim();
  const message = data.get('message')?.trim();

  if (!email || !message) {
    note.textContent = 'Please fill in both fields.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    note.textContent = 'Please enter a valid email address.';
    return;
  }
  note.textContent = 'Thanks! In a real app this would send your message.';
  e.currentTarget.reset();
});
