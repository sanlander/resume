import langData from "./langData";

const select = document.querySelector(".select-language");
const selectMob = document.querySelector(".select-language.mob");

const selectHeader = document.querySelector(".select-language__header");
const selectHeaderMob = document.querySelector(".mob .select-language__header");

const selectBody = document.querySelector(".select-language__body");
const selectBodyMob = document.querySelector(".mob .select-language__body");

export const allLang = ["en", "ua"];

selectHeader.addEventListener("mouseenter", selectToggle);
selectHeaderMob.addEventListener("click", selectToggleMob);
selectBody.addEventListener("click", selectChoose);
selectBodyMob.addEventListener("click", selectChoose);

function selectToggle() {
  select.classList.add("is-active");

  selectBody.onmouseleave = () => {
    select.classList.remove("is-active");
  };
}
function selectToggleMob() {
  selectMob.classList.add("is-active");

  addEventListener("click", onClickWithoutToggle);

  function onClickWithoutToggle(e) {
    console.log("Слухач");
    if (e.composedPath().includes(selectHeaderMob)) return;

    if (!e.composedPath().includes(selectBodyMob))
      selectMob.classList.remove("is-active");
    removeEventListener("click", onClickWithoutToggle);

    console.log(e.composedPath().includes(selectBodyMob));
  }
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
      elem.innerHTML = langData[key][clearHash];
    }
  }
}
