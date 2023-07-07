import axios from "axios";
import langData from "./lang/langData.json";

const openModalBtn = document.querySelector("[data-modal-open]");
const feedbackBox = document.querySelector(".feedback");
const closeModalBtn = document.querySelector("[data-modal-close]");
const modal = document.querySelector("[data-modal]");
const form = document.querySelector(".form-feedback");
const inputTel = document.querySelector(".js-mask-input__tel");
const inputMask = new Inputmask("+38 (099) 999 - 99 - 99");
inputMask.mask(inputTel);

// addEventListeners
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
inputTel.addEventListener("input", onChangeInputTel);
form.addEventListener("submit", onSubmitForm);

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
  const phoneNumber = inputTel.inputmask.unmaskedvalue();
  if (phoneNumber.length >= 9) {
    const msgErr = document.querySelector(".msg-error");
    if (msgErr) {
      msgErr.remove();
      inputTel.classList.remove("error");
    }
  }
}

function onSubmitForm(e) {
  e.preventDefault();
  const href = window.location.hash;
  const clearHash = href.slice(1, href.length);

  const nameFromInput = e.target.elements.name.value;
  const emailFromInput = e.target.elements.email.value;
  const phoneFromInput = inputTel.inputmask.unmaskedvalue();

  //Провіряємо довжину телефону
  if (phoneFromInput.length < 9) {
    createNewErrorInput("feedbackMsgError", e.target.elements.phone, clearHash);
    return;
  }

  inputTel.classList.remove("error");

  const msgErr = document.querySelector(".msg-error");
  if (msgErr) msgErr.remove();

  if (nameFromInput.length < 3) {
    return;
  }

  //Відправка форми в телеграм
  let message = `✅ <b>RESUME:</b>

👨‍💼  Ім'я: ${nameFromInput}
📞  Телефон: +380${phoneFromInput}`;

  const URL = `https://api.telegram.org/${process.env.TG_API_BOT}/sendMessage`;
  const ID = process.env.CHAT_ID;
  console.log("process.env.CHAT_ID:", process.env.CHAT_ID);

  async function sendData() {
    const loader = document.querySelector(".spinner-box");
    const messageBox = document.querySelector(".feedback-msg-success");

    try {
      document.querySelector(".spinner-box").style.display = "flex";

      await axios.post(URL, {
        chat_id: ID,
        parse_mode: "html",
        text: message,
      });

      loader.style.display = "none";
      messageBox.style.display = "flex";
    } catch (err) {
      console.error(err);
      loader.style.display = "none";
      messageBox.innerHTML =
        langData.feedbackMsgErrorSendForm[clearHash || "en"];
      messageBox.style.display = "flex";
    } finally {
      form.reset();
      setTimeout(() => {
        closeModal();
      }, 5000);
    }
  }

  sendData();
}

// Створюєму нову помилку над/в input
function createNewErrorInput(lngTextError, currentElement, hash) {
  const parentEl = currentElement.previousElementSibling;

  if (!parentEl.firstElementChild?.classList.contains("msg-error")) {
    const newMsgErr = document.createElement("span");
    newMsgErr.classList.add("msg-error");

    newMsgErr.textContent = langData[lngTextError][hash || "en"];

    currentElement.classList.add("error");

    parentEl.insertAdjacentElement("beforeend", newMsgErr);
  }
}
