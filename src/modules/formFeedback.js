import axios from "axios";
import langData from "./lang/langData.json";
import { allLang } from "./lang/changeLanguage";
import { firstLetterToUppercase } from "./utils/firstLetterToUppercase";

const openModalBtn = document.querySelector("[data-modal-open]");
const feedbackBox = document.querySelector(".feedback");
const closeModalBtn = document.querySelector("[data-modal-close]");
const modal = document.querySelector("[data-modal]");
const form = document.querySelector(".form-feedback");
const inputName = document.querySelector('.feedback-input[type="text"]');
const inputEmail = document.querySelector('.feedback-input[type="email"]');
const inputTel = document.querySelector('.feedback-input[type="tel"]');
const inputMask = new Inputmask("+38 (999) 999 - 99 - 99");
inputMask.mask(inputTel);

// addEventListeners
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
inputName.addEventListener("input", onChangeInputName);
inputEmail.addEventListener("input", onChangeInputEmail);
inputTel.addEventListener("input", onChangeInputTel);
form.addEventListener("submit", onSubmitForm);

const href = window.location.hash;
let clearHash = href.slice(1, href.length);

if (!allLang.includes(clearHash)) clearHash = "en";

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

function onChangeInputName(e) {
  const nameFromInput = e.target.value;
  if (validName(nameFromInput)) {
    removeInputError(e.target);
  }
}
function onChangeInputEmail(e) {
  const emailFromInput = e.target.value;
  if (validEmail(emailFromInput)) {
    removeInputError(e.target);
  }
}
function onChangeInputTel(e) {
  const phoneNumber = inputTel.inputmask.unmaskedvalue();
  if (validPhone(phoneNumber)) {
    removeInputError(e.target);
  }
}

// Відправка форми
function onSubmitForm(e) {
  e.preventDefault();

  const nameFromInput = e.target.elements.name.value;
  const emailFromInput = e.target.elements.email.value;
  const phoneFromInput = inputTel.inputmask.unmaskedvalue();

  if (!validDataForm(e, nameFromInput, emailFromInput, phoneFromInput)) return;

  async function sendData() {
    const name = firstLetterToUppercase(nameFromInput);
    const loader = document.querySelector(".spinner-box");
    const messageBox = document.querySelector(".feedback-msg-success");
    const URL_TG = process.env.API_TG;
    const URL_EMAIL = process.env.API_EMAIL;

    try {
      document.querySelector(".spinner-box").style.display = "flex";

      await axios.post(URL_TG, {
        name,
        email: emailFromInput,
        phone: phoneFromInput,
      });

      await axios.post(URL_EMAIL, {
        name,
        email: emailFromInput,
        lang: clearHash,
      });

      messageBox.innerHTML = langData.feedbackMsgSendFormSuccess[clearHash];
    } catch (err) {
      console.error("err:", err);
      const error = err.response.data.status;

      messageBox.innerHTML = `${langData.feedbackMsgSendFormError[clearHash]}<hr> Error: ${error}`;
    } finally {
      messageBox.style.display = "flex";
      loader.style.display = "none";
      form.reset();
      setTimeout(() => {
        closeModal();
      }, 5000);
    }
  }

  sendData();
}

// Вілідація даних з форми
function validDataForm(e, name, email, tel) {
  let validate = true;

  if (!validName(name)) {
    createNewInputError(
      "feedbackMsgErrorName",
      e.target.elements.name,
      clearHash
    );
    validate = false;
  }

  if (!validEmail(email)) {
    createNewInputError(
      "feedbackMsgErrorEmail",
      e.target.elements.email,
      clearHash
    );
    validate = false;
  }

  if (!validPhone(tel)) {
    createNewInputError(
      "feedbackMsgErrorTel",
      e.target.elements.phone,
      clearHash
    );
    validate = false;
  }
  return validate;
}
// Вілідація імені
function validName(name) {
  if (name.trim().length >= 2) return true;

  return false;
}
// Вілідація телефону
function validPhone(tel) {
  if (tel.length >= 10) return true;

  return false;
}
// Вілідація email
function validEmail(email) {
  const validateEmailRegex = /^\S+@\S+\.\S+$/;

  if (validateEmailRegex.test(email)) return true;

  return false;
}
// Створюєму нову помилку над input в label
function createNewInputError(lngTextError, currentElement, hash) {
  const parentEl = currentElement.previousElementSibling;

  if (!parentEl.firstElementChild?.classList.contains("msg-error")) {
    const newMsgErr = document.createElement("span");
    newMsgErr.classList.add("msg-error");

    newMsgErr.textContent = langData[lngTextError][hash || "en"];

    currentElement.classList.add("error");

    parentEl.insertAdjacentElement("beforeend", newMsgErr);
  }
}
// Видаляємо помилку над input в label
function removeInputError(currentElement) {
  const parentEl = currentElement.previousElementSibling;

  if (parentEl.firstElementChild?.classList.contains("msg-error")) {
    parentEl.firstElementChild.remove();

    currentElement.classList.remove("error");
  }
}
