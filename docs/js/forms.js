document.querySelectorAll('form.form').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var submit = form.querySelector('.submit');
    if (submit) submit.textContent = 'Thanks — we’ll be in touch.';
  });
});
