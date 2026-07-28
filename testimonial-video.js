/* Click-to-play with sound for the testimonial story cards. Videos start paused
 * and silent; clicking the play button unmutes and plays, clicking the video
 * again pauses it and brings the button back. */
(function () {
  var wrappers = document.querySelectorAll('.testimonial_card-wrapper');

  for (var i = 0; i < wrappers.length; i++) {
    (function (wrapper) {
      var video = wrapper.querySelector('.testimonial_video');
      var button = wrapper.querySelector('.testimonial_play');
      if (!video || !button) return;

      function play() {
        video.muted = false;
        video.play();
        wrapper.classList.add('is-playing');
      }

      function pause() {
        video.pause();
        wrapper.classList.remove('is-playing');
      }

      button.addEventListener('click', play);
      video.addEventListener('click', function () {
        if (video.paused) play(); else pause();
      });
      video.addEventListener('pause', function () {
        wrapper.classList.remove('is-playing');
      });
    })(wrappers[i]);
  }
})();
