/* Click-to-play with sound for the testimonial story cards.
 * - The button toggles between a play and a pause icon.
 * - Only one story video plays at a time; starting one pauses the others.
 * - Scrolling a video out of view pauses it and resets it to the start. */
(function () {
  var wrappers = document.querySelectorAll('.testimonial_card-wrapper');
  var videos = [];

  function stopAndReset(video) {
    video.pause();
    video.currentTime = 0;
  }

  function stopOthers(except) {
    for (var i = 0; i < videos.length; i++) {
      if (videos[i] !== except && !videos[i].paused) stopAndReset(videos[i]);
    }
  }

  for (var i = 0; i < wrappers.length; i++) {
    (function (wrapper) {
      var video = wrapper.querySelector('.testimonial_video');
      var button = wrapper.querySelector('.testimonial_play');
      if (!video || !button) return;
      videos.push(video);

      function play() {
        stopOthers(video);
        video.muted = false;
        video.play();
      }

      function pause() {
        video.pause();
      }

      button.addEventListener('click', function (e) {
        e.stopPropagation();
        if (video.paused) play(); else pause();
      });
      video.addEventListener('click', function () {
        if (video.paused) play(); else pause();
      });
      video.addEventListener('play', function () {
        button.classList.add('is-playing');
      });
      video.addEventListener('pause', function () {
        button.classList.remove('is-playing');
      });

      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting && !video.paused) stopAndReset(video);
          });
        }, { threshold: 0 });
        io.observe(wrapper);
      }
    })(wrappers[i]);
  }
})();
