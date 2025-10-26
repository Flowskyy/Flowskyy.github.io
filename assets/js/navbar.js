// =========================================================
//  NAVBAR.JS — FIX UNTUK HEADER YANG DIMUAT DINAMIS
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const checkHeaderLoaded = setInterval(() => {
    const desktopMenu = document.getElementById("desktopMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    if (desktopMenu && mobileMenu) {
      clearInterval(checkHeaderLoaded);

      // Bersihin dulu biar ga dobel
      mobileMenu.innerHTML = `
        <li class="nav-item">
          <a class="nav-link" href="index.html">BERANDA</a>
        </li>
      `;

      // Clone isi dropdown dari desktop
      desktopMenu.querySelectorAll(".nav-item.dropdown").forEach(item => {
        const title = item.querySelector(".nav-link.dropdown-toggle").innerText.trim();
        const submenu = item.querySelectorAll(".dropdown-menu .dropdown-item");

        const li = document.createElement("li");
        li.classList.add("nav-item", "dropdown");

        const toggle = document.createElement("button");
        toggle.classList.add("dropdown-toggle");
        toggle.textContent = title;

        const ul = document.createElement("ul");
        ul.classList.add("dropdown-menu");

        submenu.forEach(sub => {
          const a = document.createElement("a");
          a.href = sub.getAttribute("href");
          a.classList.add("dropdown-item");
          a.textContent = sub.textContent;
          ul.appendChild(a);
        });

        // Klik toggle buka/tutup submenu
        toggle.addEventListener("click", () => {
          ul.style.display = ul.style.display === "block" ? "none" : "block";
        });

        li.appendChild(toggle);
        li.appendChild(ul);
        mobileMenu.appendChild(li);
      });
    }
  }, 300); // cek tiap 0.3 detik sampai header kebaca
});
