const openModalBtn = document.querySelector("[data-modal-open]");
const feedbackBox = document.querySelector(".feedback");
const closeModalBtn = document.querySelector("[data-modal-close]");
const modal = document.querySelector("[data-modal]");
const form = document.querySelector(".form-feedback");
const label = document.querySelector(".feedback-label__mask");
const input = document.querySelector(".feedback-input__mask");
const inputMask = new Inputmask("+38 (099) 999 - 99 - 99");
inputMask.mask(input);

// addEventListeners
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

form.addEventListener("submit", onSubmitForm);
input.addEventListener("input", onChangeInput);

function openModal() {
  modal.classList.remove("visually-hidden");

  document.addEventListener("click", onClickWithoutModal);
  document.addEventListener("keydown", onPressEsc);
}

function closeModal() {
  modal.classList.add("visually-hidden");

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

function onChangeInput(e) {
  const inputValue = input.inputmask.unmaskedvalue();
  if (inputValue.length === 9) {
    const msgErr = document.querySelector(".msg-error");
    if (msgErr) {
      msgErr.remove();
      input.classList.remove("error");
    }
  }
}

function onSubmitForm(e) {
  e.preventDefault();

  const inputValue = input.inputmask.unmaskedvalue();

  if (inputValue.length < 9) {
    const msgErr = document.querySelector(".msg-error");
    if (msgErr) return;

    const newMsgErr = document.createElement("span");
    newMsgErr.classList.add("msg-error");
    newMsgErr.textContent = "Введено менше 9 символів";

    input.classList.add("error");

    label.after(newMsgErr);

    return;
  }
  input.classList.remove("error");

  const msgErr = document.querySelector(".msg-error");

  if (msgErr) msgErr.remove();

  console.log("inputValue:", inputValue);
}
