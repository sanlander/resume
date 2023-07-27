/* eslint-disable no-undef */
const checkbox = document.querySelectorAll(".dark-switch__label");
const html = document.querySelector("html");

checkbox.forEach((element) => {
  element.addEventListener("click", onChangeDarkTheme);
});

function onChangeDarkTheme() {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    return;
  }

  html.classList.add("dark");
  localStorage.setItem("theme", "dark");
}

function toChekLocalStorge() {
  if (localStorage.getItem("theme") === "light") {
    html.classList.remove("dark");
  }
}

toChekLocalStorge();
