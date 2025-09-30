document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  });

  // Animações de fade-in
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in--visible");
      }
    });
  }, observerOptions);

  // Observar todos os elementos com classe fade-in
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });

  // Navegação ativa baseada no scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");
  const headerCompany = document.querySelector(".header__company");

  let lastSection = ""; // guarda a última seção ativa

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    // Só atualiza os links se a seção mudou
    if (current !== lastSection) {
      navLinks.forEach((link) => {
        link.classList.remove("nav__link--active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("nav__link--active");
        }
      });

      // Mostra/esconde o header__company dependendo da seção
      if (current !== "home") {
        headerCompany.classList.add("show");
      } else {
        headerCompany.classList.remove("show");
      }

      // Atualiza o estado
      lastSection = current;
    }
  });

  // Form submission
  const contactForm = document.querySelector(".contact__form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simular envio do formulário
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = "Enviando...";
    button.disabled = true;

    setTimeout(() => {
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      this.reset();
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");

  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("show");
  });

  // Animação dos números das estatísticas
  const stats = document.querySelectorAll(".stat__number");

  const animateStats = () => {
    stats.forEach((stat) => {
      const target = parseInt(stat.textContent);
      if (!target) {
        return;
      }
      const increment = target / 50;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          stat.textContent =
            Math.floor(current) +
            (stat.textContent.includes("+") ? "+" : "") +
            (stat.textContent.includes("%") ? "%" : "");
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent =
            target +
            (stat.textContent.includes("+") ? "+" : "") +
            (stat.textContent.includes("%") ? "%" : "");
        }
      };

      updateCounter();
    });
  };

  // Observar seção de estatísticas
  const statsSection = document.querySelector(".about__stats");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    statsObserver.observe(statsSection);
  }

  // Add current year on footer
  const footerText = document.querySelector(".footer__bottom");
  const currentYear = new Date().getFullYear();

  // Substitui apenas o número do ano, mantendo o restante do texto
  footerText.innerHTML = footerText.innerHTML.replace(/\d{4}/, currentYear);
});
