document.querySelectorAll('[data-copy-target]').forEach(function (button) {
  button.addEventListener('click', function () {
    var source = document.getElementById(button.getAttribute('data-copy-target'));
    if (!source || !navigator.clipboard) return;
    navigator.clipboard.writeText(source.textContent).then(function () {
      var original = button.textContent;
      var status = document.getElementById('copy-status');
      button.textContent = 'Copied';
      if (status) { status.textContent = 'Prompt copied to clipboard'; }
      setTimeout(function () {
        button.textContent = original;
        if (status) { status.textContent = ''; }
      }, 2000);
    });
  });
});
