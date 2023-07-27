const title = document.querySelector(".herro-section__title");
const titleText = document.querySelector(".herro-section__job");
const line = document.querySelector(".herro-contacts");

function animText() {
  title.classList.add("_active");
  titleText.classList.add("_active");
  line.classList.add("_active");
}

setTimeout(() => {
  animText();
}, 800);
