const progress = document.querySelector(".progress");

window.addEventListener("scroll", progressBar);

function progressBar() {
  const windowScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const percent = (windowScroll / windowHeight) * 100;

  progress.style.width = percent + "%";
}
