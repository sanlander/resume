(() => {
  const refs = {
    openMenuBtn: document.querySelectorAll(
      ".mob-menu-btn__open, .mob-menu-nav, .dark-switch.mob, .menu-close-btn"
    ),
    menu: document.querySelector(".mob-menu"),
  };
  refs.openMenuBtn.forEach((element) => {
    element.addEventListener("click", toggleMenu);
  });

  function toggleMenu() {
    refs.menu.classList.toggle("mob-menu__animate");
    refs.menu.classList.remove("visually-hidden");
  }
})();
