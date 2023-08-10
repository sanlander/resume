const screenWidth = document.documentElement.clientWidth;

const refs = {
  body: document.querySelector("body"),
  logo: document.querySelector(".header-logo"),
  pageUpBtn: document.querySelector(".page-up"),
  navMenuLink:
    screenWidth >= 768
      ? document.querySelectorAll(".nav-menu__link, .footer-nav__scroll")
      : document.querySelectorAll(".mob-menu-nav__link, .footer-nav__scroll"),
};

// -------- EventListeners --------
refs.logo.addEventListener("click", onPageUp);

refs.pageUpBtn.addEventListener("click", onPageUp);

refs.navMenuLink.forEach((el) => {
  el.addEventListener("click", scrollToElement);
});

window.onscroll = function () {
  userScroll();
};

function userScroll() {
  if (window.scrollY > 500) {
    refs.pageUpBtn.classList.remove("visually-hidden");
  } else {
    refs.pageUpBtn.classList.add("visually-hidden");
  }
}

function onPageUp(e) {
  e.preventDefault();

  refs.body.scrollIntoView({ behavior: "smooth" });
}

function scrollToElement(e) {
  e.preventDefault();

  const idTag = e.target.dataset.scroll;

  if (!idTag) return;

  if (screenWidth >= 768) {
    refs.navMenuLink.forEach((el) => {
      el.classList.remove("current-link");
    });

    e.target.classList.add("current-link");
  }

  const tag = document.querySelector(`#${idTag}`);

  const yOffset = screenWidth >= 768 ? -80 : -60;

  const y = tag.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

// ******** Intersection Observer API *************** //
document.addEventListener("DOMContentLoaded", (event) => {
  if (screenWidth >= 768) {
    // Intersection Observer for NAV Menu
    const changeNav = (entries) => {
      const entry = entries.reduce((activeEntry, entry) => {
        if (activeEntry.intersectionRatio < entry.intersectionRatio) {
          activeEntry = entry;
        }

        return activeEntry;
      });

      if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
        document
          .querySelector(".current-link")
          .classList.remove("current-link");

        const id = entry.target.getAttribute("id");

        document.querySelector(`[href="#${id}"]`).classList.add("current-link");
      }
    };

    // threshold -> відстоток видимої частини (0 - від 1px, 1 - 100%)
    const optionsNavMenu = {
      threshold: [0.55, 1],
    };

    // eslint-disable-next-line no-undef
    const observerSections = new IntersectionObserver(
      changeNav,
      optionsNavMenu
    );

    // передаєм всі секції в обсервер
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observerSections.observe(section);
    });
  }

  // Intersection Observer for section "about-me"
  const changeItems = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        entry.target.classList.add("_active");
        observerItemsAboutMe.unobserve(entry.target);
      }
    });
  };

  const optionsAboutMe = {
    threshold: 0.4,
  };

  // eslint-disable-next-line no-undef
  const observerItemsAboutMe = new IntersectionObserver(
    changeItems,
    optionsAboutMe
  );

  const items = document.querySelectorAll(".about-me__item");
  items.forEach((item) => {
    observerItemsAboutMe.observe(item);
  });

  // Intersection Observer for section "work-experience"
  const changeJobCards = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
        entry.target.classList.add("_active");
        observerItemsAboutMe.unobserve(entry.target);
      }
    });
  };

  const optionsJobCards = {
    threshold: 0.3,
  };

  // eslint-disable-next-line no-undef
  const observerJobCards = new IntersectionObserver(
    changeJobCards,
    optionsJobCards
  );

  const jobCards = document.querySelectorAll(".job-card");
  jobCards.forEach((card) => {
    observerJobCards.observe(card);
  });

  // Intersection Observer for section "education"
  const changeEducationCards = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
        entry.target.classList.add("_active");
        observerItemsAboutMe.unobserve(entry.target);
      }
    });
  };

  const optionsEducationCards = {
    threshold: 0.3,
  };

  // eslint-disable-next-line no-undef
  const observerEducationCards = new IntersectionObserver(
    changeEducationCards,
    optionsEducationCards
  );

  const educationCards = document.querySelectorAll(".education-card");
  educationCards.forEach((edCard) => {
    observerEducationCards.observe(edCard);
  });
});
