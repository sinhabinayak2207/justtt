/* Slides each services card in from behind its neighbouring photo as it scrolls into view. */
(function () {
  if (!('IntersectionObserver' in window)) return;

  var els = document.querySelectorAll('[data-emerge]');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-emerged');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

  for (var i = 0; i < els.length; i++) io.observe(els[i]);
})();
