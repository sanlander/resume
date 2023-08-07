const yearElement = document.querySelector(".year");

function getYear() {
  const today = new Date();
  const year = today.getFullYear();

  yearElement.textContent = year;
}

getYear();
