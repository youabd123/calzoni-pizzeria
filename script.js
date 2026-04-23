const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id], header[id]");
const languageToggle = document.querySelector("#language-toggle");
const translatableElements = document.querySelectorAll("[data-i18n]");

let currentLanguage = "sv";

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const setLanguage = (language) => {
  currentLanguage = language;
  document.documentElement.lang = language;

  translatableElements.forEach((element) => {
    const translatedText = element.dataset[language];

    if (translatedText) {
      element.textContent = translatedText;
    }
  });

  navItems.forEach((item) => {
    const translatedText = item.dataset[language];

    if (translatedText) {
      item.textContent = translatedText;
    }
  });

  if (languageToggle) {
    languageToggle.innerHTML = `<span>${language === "sv" ? "EN" : "SV"}</span>`;
    languageToggle.setAttribute(
      "aria-label",
      language === "sv" ? "Switch to English" : "Byt till svenska"
    );
  }
};

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    setLanguage(currentLanguage === "sv" ? "en" : "sv");
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navItems.forEach((item) => {
        const isActive = item.getAttribute("href") === `#${entry.target.id}`;
        item.classList.toggle("is-active", isActive);
      });
    });
  },
  {
    threshold: 0.35,
  }
);

sections.forEach((section) => observer.observe(section));

setLanguage("sv");
