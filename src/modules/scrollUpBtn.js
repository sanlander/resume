const refs = {
  body: document.querySelector("body"),
  pageUpBtn: document.querySelector(".page-up"),
  // companyTag: document.querySelector("#company"),
  navMenuLink: document.querySelector(".nav-menu"),
};

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
  const idTag = e.target.innerText.toLowerCase();
  // console.log();
  // if (e.target.classList.contains("current-link")) return;

  const tag = document.querySelector(`#${idTag}`);

  tag.scrollIntoView({ behavior: "smooth", block: "start" });
}

// -------- EventListeners --------
refs.pageUpBtn.addEventListener("click", onPageUp);
// new
refs.navMenuLink.addEventListener("click", scrollToElement);
