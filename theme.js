(function () {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle, .product-theme, .info-theme');
  if (!button) return;

  function readTheme() {
    try { return localStorage.getItem('proswipe-theme') || 'light'; }
    catch (_) { return root.dataset.theme || 'light'; }
  }

  function setTheme(theme) {
    const dark = theme === 'dark';
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'ライトモードに切り替え' : 'ダークモードに切り替え');
    const label = button.querySelector('.theme-label');
    if (label) label.textContent = dark ? 'ダーク' : 'ライト';
    if (button.classList.contains('product-theme') || button.classList.contains('info-theme')) {
      button.textContent = dark ? '☾ ダーク' : '☀ ライト';
    }
  }

  setTheme(readTheme());
  button.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('proswipe-theme', next); } catch (_) {}
  });
})();
