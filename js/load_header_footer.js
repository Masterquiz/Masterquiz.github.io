(async () => {
  // Load header
  let header = await fetch('/base/header.html');
  document.querySelector('#header').innerHTML = await header.text();

  // Menu animation
  let menu = document.querySelector(".menu");
  if (Math.random() < .2) {
    document.querySelector(".ham").style.display = 'none';
    document.querySelector(".hamMQ").addEventListener('click', elem => {
      elem.target.classList.toggle("changeMQ");
      menu.style.transitionDuration = '.3s';
      menu.classList.toggle("menu-change");
    });
  } else {
    document.querySelector(".hamMQ").style.display = 'none';
    document.querySelector(".ham").addEventListener('click', elem => {
      elem.target.classList.toggle("change");
      menu.style.transitionDuration = '.3s';
      menu.classList.toggle("menu-change");
    })
  }

  // Load footer
  let footer = await fetch('/base/footer.html');
  document.querySelector('#footer').innerHTML = await footer.text();

  // Loose focus when button clicked
  [...document.querySelectorAll('button')]
    .map(x => x.addEventListener('click', x.blur()));
})();