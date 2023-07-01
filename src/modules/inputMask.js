const form = document.querySelector(".form-test");
const label = document.querySelector(".label-test__mask");
const input = document.querySelector(".input-test__mask");
const inputMask = new Inputmask("+38 (099) 999 - 99 - 99");
inputMask.mask(input);

form.addEventListener("submit", onSubmitForm);
input.addEventListener("input", onChangeInput);

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
