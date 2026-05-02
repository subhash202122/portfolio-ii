/* Shared theme toggle for all pages */
(function () {
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;

  const applyTheme = (theme) => {
    document.body.classList.toggle('light-theme', theme === 'light');
    themeBtn.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
  };

  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  themeBtn.addEventListener('click', () => {
    const next = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
})();
