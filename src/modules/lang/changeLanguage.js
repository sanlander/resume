import langData from "./langData";

const select = document.querySelector(".select");
const selectHeader = document.querySelector(".select__header");
const selectBody = document.querySelector(".select__body");

const allLang = ["en", "ua"];

selectHeader.addEventListener("mouseenter", selectToggle);
selectBody.addEventListener("click", selectChoose);

function selectToggle() {
  select.classList.add("is-active");

  selectBody.onmouseleave = () => {
    select.classList.remove("is-active");
  };
}

function selectChoose(e) {
  const chooseLanguage = e.target.innerHTML;

  location.href = window.location.pathname + "#" + chooseLanguage;

  location.reload();
}

changeLanguage();

function changeLanguage() {
  const href = window.location.hash;

  const clearHash = href.slice(1, href.length);

  if (!allLang.includes(clearHash)) {
    if (clearHash.length !== 0) location.href = window.location.pathname;
    return;
  }

  document
    .querySelector("html")
    .setAttribute("lang", langData.htmlLang[clearHash]);

  for (let key in langData) {
    let elem = document.querySelector(`[data-lng="${key}"]`);

    if (elem) {
      elem.innerText = langData[key][clearHash];
    }
  }
}
