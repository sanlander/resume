const checkbox = document.querySelector(".dark-switch__label");
const html = document.querySelector("html");

checkbox.addEventListener("click", onChangeDarkTheme);

function onChangeDarkTheme(e) {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.removeItem("theme");
    return;
  }

  html.classList.add("dark");
  localStorage.setItem("theme", "dark");
}

function toChekLocalStorge() {
  if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
    return;
  }

  html.classList.remove("dark");
}

toChekLocalStorge();
