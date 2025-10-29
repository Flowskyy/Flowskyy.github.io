// =========================================================
// NAVBAR.JS — HEADER + FOOTER DINAMIS + ANIMASI SLIDE-DOWN HALUS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // 1. CEK HEADER DIMUAT SEBELUM INISIALISASI MENU
  // =========================================================
  const checkHeaderLoaded = setInterval(() => {
    const header = document.getElementById("header");
    const desktopMenu = document.getElementById("desktopMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    if (header && desktopMenu && mobileMenu) {
      clearInterval(checkHeaderLoaded);

      // ===== Tambahkan link "Beranda" di menu mobile =====
      // Tentukan path ke root otomatis 
      const pathToRoot =
        window.location.pathname.split("/").length > 3 ? "../../" : "./";

      const berandaLi = document.createElement("li");
      berandaLi.classList.add("nav-item");

      const berandaLink = document.createElement("a");
      berandaLink.classList.add("nav-link");
      berandaLink.href = `${pathToRoot}index.html`;
      berandaLink.textContent = "BERANDA";

      berandaLi.appendChild(berandaLink);
      mobileMenu.appendChild(berandaLi);

      // ===== Clone semua dropdown dari menu desktop ke mobile =====
      desktopMenu.querySelectorAll(".nav-item.dropdown").forEach((item) => {
        const title =
          item.querySelector(".nav-link.dropdown-toggle")?.innerText.trim() ||
          "";
        const submenuItems = item.querySelectorAll(
          ".dropdown-menu .dropdown-item"
        );

        const li = document.createElement("li");
        li.classList.add("nav-item", "dropdown");

        const toggle = document.createElement("button");
        toggle.classList.add("dropdown-toggle");
        toggle.textContent = title;

        const ul = document.createElement("ul");
        ul.classList.add("dropdown-menu");

        submenuItems.forEach((sub) => {
          const a = document.createElement("a");
          a.href = sub.getAttribute("href");
          a.classList.add("dropdown-item");
          a.textContent = sub.textContent;
          ul.appendChild(a);
        });

        // Toggle submenu di mobile
        toggle.addEventListener("click", () => {
          ul.style.display = ul.style.display === "block" ? "none" : "block";
        });

        li.appendChild(toggle);
        li.appendChild(ul);
        mobileMenu.appendChild(li);
      });

      // ===== Jalankan animasi slide-down untuk navbar =====
      initNavbarSlideDown(header);
    }
  }, 300);
});

// =========================================================
// 2. FOOTER ANIMATION
// =========================================================
function initFooterAnimation() {
  setTimeout(() => {
    const footerCards = document.querySelectorAll(".slide-left, .slide-right");
    if (!footerCards.length) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    footerCards.forEach((el) => observer.observe(el));
  }, 500);
}
