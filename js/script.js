(async () => {
  // Load header
  await fetch('/base/header.html')
    .then(res => res.text())
    .then(data => (document.querySelector('#header').innerHTML = data));

  document.querySelector('.ham').addEventListener('click', () => {
    document.querySelector('.ham').classList.toggle('change');
    document.querySelector('nav ul').classList.toggle('menu-change');
  });

  // FIXME: Unfocus after click
  [...document.querySelectorAll('button')].map(btn =>
    btn.addEventListener('click', async () => {
      await new Promise(resolve => setTimeout(resolve, 270));
      document.querySelector('#home').click();
    })
  );

  // Load footer
  await fetch('/base/footer.html')
    .then(res => res.text())
    .then(data => (document.querySelector('#footer').innerHTML = data));
})();
