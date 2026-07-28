/* Footer "Contact" link shows the phone number only once clicked, instead
 * of displaying it up front. First click reveals it (and still dials on
 * devices that support tel: links); it doesn't collapse back afterward. */
(function () {
  var link = document.getElementById('contact-reveal');
  if (!link) return;
  var label = link.querySelector('div');
  var phone = '+1 416 885 1501';

  link.addEventListener('click', function () {
    if (label.textContent !== phone) label.textContent = phone;
  });
})();
