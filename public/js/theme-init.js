(function () {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme;
    if (saved === 'dark' || saved === 'light' || saved === 'auto') {
        theme = saved;
    } else {
        theme = 'auto';
    }
    var resolved = theme === 'auto' ? (prefersDark ? 'dark' : 'light') : theme;
    document.documentElement.setAttribute('data-theme', resolved);
})();
