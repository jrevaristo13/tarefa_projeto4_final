document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Adiciona sombra na navbar ao rolar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow");
    } else {
      navbar.classList.remove("shadow");
    }
  });

  // Fecha menu mobile ao clicar em link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const navbarToggler = document.querySelector(".navbar-toggler");
      const navbarCollapse = document.querySelector(".navbar-collapse");

      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });
});
