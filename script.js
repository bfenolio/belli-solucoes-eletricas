// ==========================================================
// BELLI SOLUÇÕES ELÉTRICAS
//
// JAVASCRIPT
//
// HTML = estrutura
// CSS  = aparência
// JS   = comportamento
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  // ======================================================
  // 1 — PEGAMOS ELEMENTOS DO HTML
  // ======================================================

  const header = document.querySelector(".header");

  const menuButton = document.querySelector(".menu-toggle");

  const nav = document.querySelector(".nav");

  const navLinks = document.querySelectorAll(".nav-link");

  const faqItems = document.querySelectorAll(".faq-item");

  // ======================================================
  // 2 — HEADER AO ROLAR
  //
  // window.scrollY diz quantos pixels
  // a página já rolou.
  // ======================================================

  function updateHeader() {
    if (!header) {
      return;
    }

    if (window.scrollY > 16) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

  // ======================================================
  // 3 — ABRIR MENU MOBILE
  // ======================================================

  function openMenu() {
    nav.classList.add("open");

    menuButton.classList.add("active");

    menuButton.setAttribute("aria-expanded", "true");

    menuButton.setAttribute("aria-label", "Fechar menu");

    document.body.classList.add("menu-open");
  }

  // ======================================================
  // 4 — FECHAR MENU MOBILE
  // ======================================================

  function closeMenu() {
    nav.classList.remove("open");

    menuButton.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.setAttribute("aria-label", "Abrir menu");

    document.body.classList.remove("menu-open");
  }

  // ======================================================
  // 5 — CLIQUE NO MENU HAMBÚRGUER
  // ======================================================

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const menuIsOpen = nav.classList.contains("open");

      if (menuIsOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // ======================================================
  // 6 — AO CLICAR EM UM LINK,
  // FECHA O MENU MOBILE
  // ======================================================

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // ======================================================
  // 7 — FAQ
  // ======================================================

  faqItems.forEach((item, index) => {
    const question = item.querySelector(".faq-question");

    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) {
      return;
    }

    // cria um ID único

    const answerId = `faq-answer-${index + 1}`;

    answer.id = answerId;

    question.setAttribute("aria-controls", answerId);

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", () => {
      const shouldOpen = !item.classList.contains("active");

      // fecha todas

      faqItems.forEach((otherItem) => {
        const otherQuestion = otherItem.querySelector(".faq-question");

        const otherAnswer = otherItem.querySelector(".faq-answer");

        otherItem.classList.remove("active");

        if (otherQuestion) {
          otherQuestion.setAttribute("aria-expanded", "false");
        }

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
      });

      // abre apenas a clicada

      if (shouldOpen) {
        item.classList.add("active");

        question.setAttribute("aria-expanded", "true");

        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  // ======================================================
  // 8 — SCROLL REVEAL
  //
  // IntersectionObserver observa se
  // o elemento entrou na tela.
  // ======================================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          // ainda não apareceu

          if (!entry.isIntersecting) {
            return;
          }

          // adiciona "show"

          entry.target.classList.add("show");

          // não precisamos
          // observar novamente

          currentObserver.unobserve(entry.target);
        });
      },

      {
        threshold: 0.12,

        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // caso navegador antigo

    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  // ======================================================
  // 9 — REDIMENSIONAMENTO
  // ======================================================

  window.addEventListener("resize", () => {
    // Se virou desktop,
    // fecha menu mobile.

    if (window.innerWidth >= 1024) {
      if (nav && menuButton) {
        closeMenu();
      }
    }

    // recalcula FAQ aberto

    const openAnswer = document.querySelector(".faq-item.active .faq-answer");

    if (openAnswer) {
      openAnswer.style.maxHeight = `${openAnswer.scrollHeight}px`;
    }
  });
});
