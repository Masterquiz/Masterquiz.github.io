function toggleMenu() {
  const hamburger = document.querySelector(".ham");
  const navsub = document.querySelector(".menu");

  hamburger.classList.toggle("change");
  navsub.classList.toggle("menu-change");

  if (navsub.classList.contains("menu-change")) {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = () => window.scrollTo(scrollLeft, scrollTop);
  } else window.onscroll = {};
};