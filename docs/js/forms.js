document.querySelectorAll('form.form').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var submit = form.querySelector('.submit');
    var data = new URLSearchParams(new FormData(form)).toString();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    }).then(function () {
      form.reset();
      if (submit) submit.textContent = 'Thanks — we’ll be in touch.';
    }).catch(function () {
      if (submit) submit.textContent = 'Something went wrong — please try again.';
    });
  });
});
