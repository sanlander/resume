import langData from "./lang/langData.json";

const openModalBtn = document.querySelector("[data-modal-open]");
const feedbackBox = document.querySelector(".feedback");
const closeModalBtn = document.querySelector("[data-modal-close]");
const modal = document.querySelector("[data-modal]");
const form = document.querySelector(".form-feedback");
const labelTel = document.querySelector(".js-mask-label__tel");
const inputTel = document.querySelector(".js-mask-input__tel");
const inputMask = new Inputmask("+38 (099) 999 - 99 - 99");
inputMask.mask(inputTel);

// addEventListeners
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

form.addEventListener("submit", onSubmitForm);
inputTel.addEventListener("input", onChangeInputTel);

function openModal() {
  modal.classList.remove("visually-hidden");
  document.querySelector("body").style.overflow = "hidden";

  document.addEventListener("click", onClickWithoutModal);
  document.addEventListener("keydown", onPressEsc);
}

function closeModal() {
  modal.classList.add("visually-hidden");
  document.querySelector("body").removeAttribute("style");
  document.querySelector(".feedback-msg-success").style.display = "none";

  document.removeEventListener("click", onClickWithoutModal);
  document.removeEventListener("keydown", onPressEsc);
}

function onClickWithoutModal(e) {
  if (e.composedPath().includes(openModalBtn)) return;

  if (!e.composedPath().includes(feedbackBox)) closeModal();
}
function onPressEsc(e) {
  if (e.keyCode === 27) closeModal();
}

function onChangeInputTel(e) {
  const inputValue = inputTel.inputmask.unmaskedvalue();
  if (inputValue.length >= 9) {
    const msgErr = document.querySelector(".msg-error");
    if (msgErr) {
      msgErr.remove();
      inputTel.classList.remove("error");
    }
  }
}

function onSubmitForm(e) {
  e.preventDefault();

  const inputValue = inputTel.inputmask.unmaskedvalue();

  if (inputValue.length < 9) {
    const msgErr = document.querySelector(".msg-error");
    if (msgErr) return;

    const newMsgErr = document.createElement("span");
    newMsgErr.classList.add("msg-error");

    const href = window.location.hash;

    const clearHash = href.slice(1, href.length);

    newMsgErr.textContent = langData.feedbackMsgError[clearHash || "en"];

    inputTel.classList.add("error");

    labelTel.insertAdjacentElement("beforeend", newMsgErr);

    return;
  }

  inputTel.classList.remove("error");

  const msgErr = document.querySelector(".msg-error");

  if (msgErr) msgErr.remove();

  console.log("inputValue:", inputValue);
  console.log("E:", e.target.elements.name.value);
  console.log("E:", e.target.elements.email.value);

  form.reset();

  document.querySelector(".feedback-msg-success").style.display = "flex";

  setTimeout(() => {
    closeModal();
  }, 5000);
}
