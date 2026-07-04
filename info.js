const infoThemeButton = document.querySelector('.info-theme');
function setInfoTheme(theme) {
  document.documentElement.dataset.theme = theme;
  infoThemeButton.textContent = theme === 'dark' ? '☾ ダーク' : '☀ ライト';
  infoThemeButton.setAttribute('aria-label', theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え');
}
let infoTheme = 'light';
try { infoTheme = localStorage.getItem('proswipe-theme') || 'light'; } catch (_) {}
setInfoTheme(infoTheme);
infoThemeButton.addEventListener('click', () => {
  infoTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setInfoTheme(infoTheme);
  try { localStorage.setItem('proswipe-theme', infoTheme); } catch (_) {}
});
