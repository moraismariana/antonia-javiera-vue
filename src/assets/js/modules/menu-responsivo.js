export default function initMenuResponsivo() {
  const botaoMenu = document.querySelector(".menu-mobile-icone button");
  const menuMobile = document.querySelector(".menu-mobile");
  const headerPadrao = document.querySelector(".header");
  const classeAtivo = "menu-mobile-ativo";

  if (botaoMenu && menuMobile && headerPadrao) {
    botaoMenu.addEventListener("click", (event) => {
      event.preventDefault();
      menuMobile.classList.toggle(classeAtivo);
      headerPadrao.classList.toggle(classeAtivo);
    });

    menuMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuMobile.classList.toggle(classeAtivo);
        headerPadrao.classList.toggle(classeAtivo);
      });
    });
  }
}
