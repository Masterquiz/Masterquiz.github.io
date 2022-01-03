(async () => {
  // Load header
  let header = await fetch('/base/header.html');
  document.querySelector('#header').innerHTML = await header.text();

  // Menu animation
  // !Menu MQ, position
  let menu = document.querySelector(".menu");

  if (Math.random() < 1) {
    document.getElementById("menu_label").style.display = 'none';
    document.querySelector(".ham").addEventListener('click', elem => {
      elem.target.classList.toggle("change");
      menu.style.transitionDuration = '.3s';
      menu.classList.toggle("menu-change");
    })
  } else {
    document.querySelector(".ham").style.display = 'none';
    document.getElementById("menu_label").addEventListener('click', () => {
      menu.style.transitionDuration = '.3s';
      menu.classList.toggle("menu-change");
    })
  }

  // Load footer
  let footer = await fetch('/base/footer.html');
  document.querySelector('#footer').innerHTML = await footer.text();

  // Smooth scroll
  document.querySelectorAll("a[href^='/#']").forEach((e) => {
    e.addEventListener('click', (e) => {
      const targetId = e.currentTarget.getAttribute("href").split("#")[1];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        window.scrollBy({
          top: targetElement.getBoundingClientRect().top,
          behavior: 'smooth',
        });

        setTimeout(() => ham.click(), 500);
      }
    })
  });

  // Loose focus when button clicked
  [...document.querySelectorAll('button')]
    .map(x => x.addEventListener('click', x.blur()));
})();