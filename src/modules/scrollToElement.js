const refs = {
  body: document.querySelector("body"),
  pageUpBtn: document.querySelector(".page-up"),
  navMenuLink: document.querySelectorAll(".nav-menu, .mob-menu-nav"),
};

// -------- EventListeners --------
refs.pageUpBtn.addEventListener("click", onPageUp);
refs.navMenuLink.forEach((el) => {
  el.addEventListener("click", scrollToElement);
});

window.onscroll = function () {
  userScroll();
};

function userScroll() {
  if (window.scrollY > 500) {
    refs.pageUpBtn.classList.remove("visually-hidden");
  } else {
    refs.pageUpBtn.classList.add("visually-hidden");
  }
}

function onPageUp() {
  refs.body.scrollIntoView({ behavior: "smooth" });
}

function scrollToElement(e) {
  e.preventDefault();

  const idTag = e.target.dataset.scroll;

  if (!idTag) return;

  const tag = document.querySelector(`#${idTag}`);

  const screenWidth = document.documentElement.clientWidth;

  const yOffset = screenWidth >= 768 ? -80 : -60;

  const y = tag.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}
