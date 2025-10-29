// =========================================================
// NAVBAR.JS — HEADER + FOOTER DINAMIS + ANIMASI SLIDE-DOWN HALUS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const checkHeaderLoaded = setInterval(() => {
    const header = document.getElementById("header");
    const desktopMenu = document.getElementById("desktopMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    if (header && desktopMenu && mobileMenu) {
      clearInterval(checkHeaderLoaded);
      console.log("[INFO] Header dan menu ditemukan. Memulai inisialisasi.");

      // ===== Tentukan path ke root dengan if-else =====
      let pathToRoot;
      const pathParts = window.location.pathname.split("/").filter(Boolean); // hilangkan empty string
      const pathDepth = pathParts.length;

      if (pathDepth > 3) {
        pathToRoot = "../../";
        console.log("[INFO] Halaman berada di folder dalam. Path ke root:", pathToRoot);
      } else if (pathDepth <= 3) {
        pathToRoot = "./";
        console.log("[INFO] Halaman berada di root atau folder utama. Path ke root:", pathToRoot);
      } else {
        pathToRoot = "./";
        console.log("[ERROR] Path halaman tidak dapat ditentukan secara otomatis. Menggunakan default './'");
      }

      console.log("[INFO] Lokasi halaman saat ini:", window.location.pathname);

      // ===== Tambahkan link "BERANDA" di menu mobile =====
      const berandaLi = document.createElement("li");
      berandaLi.classList.add("nav-item");

      const berandaLink = document.createElement("a");
      berandaLink.classList.add("nav-link");
      berandaLink.href = `${pathToRoot}index.html`;
      berandaLink.textContent = "BERANDA";

      berandaLi.appendChild(berandaLink);
      mobileMenu.appendChild(berandaLi);

      console.log("[INFO] Link 'BERANDA' berhasil ditambahkan ke menu mobile:", berandaLink.href);

      // ===== Clone semua dropdown dari menu desktop ke mobile =====
      const dropdownItems = desktopMenu.querySelectorAll(".nav-item.dropdown");
      if (!dropdownItems.length) {
        console.log("[INFO] Tidak ada dropdown di menu desktop untuk dicloning.");
      }

      dropdownItems.forEach((item, index) => {
        const titleEl = item.querySelector(".nav-link.dropdown-toggle");
        const title = titleEl ? titleEl.innerText.trim() : "";
        const submenuItems = item.querySelectorAll(".dropdown-menu .dropdown-item");

        console.log(`[INFO] Memproses dropdown #${index + 1}: ${title}, jumlah submenu: ${submenuItems.length}`);

        const li = document.createElement("li");
        li.classList.add("nav-item", "dropdown");

        const toggle = document.createElement("button");
        toggle.classList.add("dropdown-toggle");
        toggle.textContent = title;

        const ul = document.createElement("ul");
        ul.classList.add("dropdown-menu");

        submenuItems.forEach((sub, subIndex) => {
          const a = document.createElement("a");
          a.href = sub?.getAttribute("href") || "#";
          a.classList.add("dropdown-item");
          a.textContent = sub ? sub.textContent : "";
          ul.appendChild(a);

          console.log(`   [INFO] Submenu #${subIndex + 1}: ${a.textContent} (${a.href}) ditambahkan.`);
        });

        // Toggle submenu di mobile
        toggle.addEventListener("click", () => {
          ul.style.display = ul.style.display === "block" ? "none" : "block";
          console.log(`[INFO] Toggle submenu '${title}' di mobile: ${ul.style.display}`);
        });

        li.appendChild(toggle);
        li.appendChild(ul);
        mobileMenu.appendChild(li);

        console.log(`[INFO] Dropdown '${title}' berhasil dicloning ke menu mobile.`);
      });

      // ===== Jalankan animasi slide-down untuk navbar =====
      if (typeof initNavbarSlideDown === "function") {
        initNavbarSlideDown(header);
        console.log("[INFO] Animasi slide-down navbar telah diinisialisasi.");
      } else {
        console.log("[WARN] Fungsi initNavbarSlideDown tidak ditemukan. Animasi navbar tidak dijalankan.");
      }

    } else {
      console.log("[WARN] Header, desktopMenu, atau mobileMenu belum tersedia. Menunggu elemen dimuat...");
    }
  }, 300);
});

// =========================================================
// 2. FOOTER ANIMATION
// =========================================================
function initFooterAnimation() {
  setTimeout(() => {
    const footerCards = document.querySelectorAll(".slide-left, .slide-right");
    if (!footerCards.length) {
      console.log("[INFO] Tidak ada elemen footer untuk dianimasikan.");
      return;
    }

    console.log("[INFO] Memulai animasi footer...");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
            console.log(`[INFO] Footer element '${entry.target.className}' tampil dan diobservasi.`);
          }
        });
      },
      { threshold: 0.2 }
    );

    footerCards.forEach((el) => observer.observe(el));
    console.log("[INFO] Observer footer telah diinisialisasi.");
  }, 500);
}
