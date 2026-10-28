
"use strict";

// Update footer year automatically
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation
const menuButton = document.getElementById("mobile-menu-button");
const navigation = document.getElementById("main-navigation");
const openIcon = document.getElementById("menu-open-icon");
const closeIcon = document.getElementById("menu-close-icon");

function setMenuOpen(isOpen) {
  if (!menuButton || !navigation) return;

  navigation.classList.toggle("hidden", !isOpen);

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  if (openIcon) {
    openIcon.classList.toggle("hidden", isOpen);
  }

  if (closeIcon) {
    closeIcon.classList.toggle("hidden", !isOpen);
  }
}

if (menuButton) {
  menuButton.addEventListener("click", function () {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });
}

// Close mobile menu when clicking a navigation link
document.querySelectorAll("#main-navigation a[href^='#']").forEach(function (link) {
  link.addEventListener("click", function (event) {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.getElementById(href.slice(1));

    if (!target) return;

    event.preventDefault();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });

    history.replaceState(null, "", href);
    setMenuOpen(false);
  });
});

// Close mobile menu with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

// Sign-up form validation
const signupForm = document.getElementById("signup-form");
const formMessage = document.getElementById("form-message");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!signupForm.reportValidity()) {
      return;
    }

    if (formMessage) {
      formMessage.textContent =
        "Thank you! Your form is valid, but this demo is not connected to a signup service yet.";

      formMessage.classList.remove("hidden");
    }
  });
}
