document.getElementById('burger')?.addEventListener('click', function () {
  document.getElementById('site-header')?.classList.toggle('nav-open');
  const expanded = this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
  this.setAttribute('aria-expanded', expanded);
});
