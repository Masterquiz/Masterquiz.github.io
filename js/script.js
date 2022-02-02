(async () => {
  // Load header
  await fetch('/base/header.html')
    .then(res => res.text())
    .then(data => (document.querySelector('#header').innerHTML = data));

  // Menu animation
  const menu = document.querySelector('.menu');
  if (Math.random() > 0.2) {
    document.querySelector('.hamMQ').style.display = 'none';
    document.querySelector('.ham').addEventListener('click', elem => {
      elem.target.closest('.ham').classList.toggle('change');
      menu.style.transitionDuration = '.3s';
      menu.classList.toggle('menu-change');
    });
  } else {
    document.querySelector('.ham').style.display = 'none';
    document.querySelector('.hamMQ').addEventListener('click', elem => {
      elem.target.closest('.hamMQ').classList.toggle('changeMQ');
      menu.style.transitionDuration = '.3s';
      menu.classList.toggle('menu-change');
    });
  }

  // Load footer
  await fetch('/base/footer.html')
    .then(res => res.text())
    .then(data => (document.querySelector('#footer').innerHTML = data));
})();
