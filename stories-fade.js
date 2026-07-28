/* Fades the "STORIES" word out as the page scrolls past it. Kept on a wrapper
 * div rather than the .stories-visual image itself, since that image already
 * has its own fade-in scroll animation from the site's animation system --
 * driving both off the same element's opacity would fight and flicker. */
(function () {
  var wrapper = document.querySelector('.stories-fade-wrapper');
  var section = document.querySelector('.testi_section');
  if (!wrapper || !section) return;

  var fadeDistance = window.innerHeight;

  function update() {
    var rect = section.getBoundingClientRect();
    var scrolledPast = Math.max(0, -rect.top);
    var progress = Math.min(1, scrolledPast / fadeDistance);
    wrapper.style.opacity = String(1 - progress);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', function () {
    fadeDistance = window.innerHeight;
    update();
  });
  update();
})();
