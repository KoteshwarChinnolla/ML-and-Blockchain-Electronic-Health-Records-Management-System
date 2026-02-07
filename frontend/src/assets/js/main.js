/**
* Template Name: Medilab
* Updated & fixed for multi-page dApp usage
*/

(function () {
  "use strict";

  /* ===============================
     Scroll class on body
  =============================== */
  function toggleScrolled() {
    const body = document.querySelector("body");
    const header = document.querySelector("#header");
    if (!header) return;

    if (
      !header.classList.contains("scroll-up-sticky") &&
      !header.classList.contains("sticky-top") &&
      !header.classList.contains("fixed-top")
    ) return;

    window.scrollY > 100
      ? body.classList.add("scrolled")
      : body.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /* ===============================
     Mobile Nav Toggle (FIXED)
  =============================== */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToggle() {
    document.body.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToggle);
  }

  /* ===============================
     Hide mobile nav on link click
  =============================== */
  document.querySelectorAll("#navmenu a").forEach(link => {
    link.addEventListener("click", () => {
      if (document.body.classList.contains("mobile-nav-active")) {
        mobileNavToggle();
      }
    });
  });

  /* ===============================
     Mobile dropdowns
  =============================== */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach(item => {
    item.addEventListener("click", function (e) {
      if (document.body.classList.contains("mobile-nav-active")) {
        e.preventDefault();
        this.parentNode.classList.toggle("active");
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
        e.stopImmediatePropagation();
      }
    });
  });

  /* ===============================
     Preloader
  =============================== */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /* ===============================
     Scroll top button (FIXED)
  =============================== */
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100
      ? scrollTop.classList.add("active")
      : scrollTop.classList.remove("active");
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /* ===============================
     AOS
  =============================== */
  window.addEventListener("load", () => {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  });

  /* ===============================
     GLightbox
  =============================== */
  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: ".glightbox" });
  }

  /* ===============================
     PureCounter
  =============================== */
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  /* ===============================
     FAQ Toggle
  =============================== */
  document.querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach(el => {
      el.addEventListener("click", () => {
        el.parentNode.classList.toggle("faq-active");
      });
    });

  /* ===============================
     Swiper
  =============================== */
  window.addEventListener("load", () => {
    document.querySelectorAll(".swiper").forEach(swiper => {
      const configEl = swiper.querySelector(".swiper-config");
      if (!configEl) return;
      const config = JSON.parse(configEl.innerHTML.trim());
      new Swiper(swiper, config);
    });
  });

  /* ===============================
     Hash scroll fix
  =============================== */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (!section) return;

      setTimeout(() => {
        const margin = parseInt(getComputedStyle(section).scrollMarginTop);
        window.scrollTo({
          top: section.offsetTop - margin,
          behavior: "smooth"
        });
      }, 100);
    }
  });

  /* ===============================
     Navmenu Scrollspy
  =============================== */
  const navLinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      const pos = window.scrollY + 200;
      if (pos >= section.offsetTop && pos <= section.offsetTop + section.offsetHeight) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

})();
