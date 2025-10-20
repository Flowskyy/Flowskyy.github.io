

document.addEventListener("DOMContentLoaded", () => {
  const desktopMenu = document.getElementById("desktopMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (desktopMenu && mobileMenu) {

    const clonedMenu = desktopMenu.cloneNode(true);
    clonedMenu.removeAttribute("id"); 
    mobileMenu.innerHTML = ""; 
    mobileMenu.appendChild(clonedMenu);

    const dropdownLinks = mobileMenu.querySelectorAll(".dropdown-toggle");

    dropdownLinks.forEach((link) => {
      const submenu = link.nextElementSibling;

      link.removeAttribute("data-bs-toggle");
      link.removeAttribute("aria-expanded");

      link.addEventListener("click", (e) => {
        e.preventDefault();

        mobileMenu.querySelectorAll(".dropdown-menu.show").forEach((open) => {
          if (open !== submenu) {
            open.classList.remove("show");
            open.style.maxHeight = null;
          }
        });

        if (submenu.classList.contains("show")) {
          submenu.classList.remove("show");
          submenu.style.maxHeight = null;
        } else {
          submenu.classList.add("show");
          submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
      });
    });
  }
});
