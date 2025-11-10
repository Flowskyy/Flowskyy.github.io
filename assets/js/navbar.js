// =========================================================
// NAVBAR.JS — HEADER + FOOTER DINAMIS + ANIMASI SLIDE-DOWN
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("[UPDATE 0.14.06] Memulai inisialisasi navbar dan footer...");

  const checkHeaderLoaded = setInterval(() => {
    const header = document.getElementById("header");
    const desktopMenu = document.getElementById("desktopMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    if (header && desktopMenu && mobileMenu) {
      clearInterval(checkHeaderLoaded);
      console.log("[INFO] Header dan menu ditemukan.");

      // ===== Tambahkan link "BERANDA" di menu mobile =====
      const berandaLi = document.createElement("li");
      berandaLi.classList.add("nav-item");

      const berandaLink = document.createElement("a");
      berandaLink.classList.add("nav-link");
      berandaLink.href = "/index.html"; 
      berandaLink.textContent = "BERANDA";

      berandaLi.appendChild(berandaLink);
      mobileMenu.appendChild(berandaLi);
      console.log("[INFO] Link 'BERANDA' berhasil ditambahkan ke menu mobile.");

      // ===== Clone semua dropdown dari menu desktop ke mobile =====
      const dropdownItems = desktopMenu.querySelectorAll(".nav-item.dropdown");
      if (!dropdownItems.length) {
        console.log("[INFO] Tidak ada dropdown di menu desktop.");
      }

      dropdownItems.forEach((item) => {
        const titleEl = item.querySelector(".nav-link.dropdown-toggle");
        const title = titleEl ? titleEl.innerText.trim() : "";
        const submenuItems = item.querySelectorAll(".dropdown-menu .dropdown-item");

        const li = document.createElement("li");
        li.classList.add("nav-item", "dropdown");

        const toggle = document.createElement("button");
        toggle.classList.add("dropdown-toggle");
        toggle.textContent = title;

        const ul = document.createElement("ul");
        ul.classList.add("dropdown-menu");

        submenuItems.forEach((sub) => {
          const a = document.createElement("a");
          a.href = sub?.getAttribute("href") || "#";
          a.classList.add("dropdown-item");
          a.textContent = sub ? sub.textContent : "";
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

      console.log("[INFO] Semua dropdown berhasil dicloning ke menu mobile.");

      // ===== Jalankan animasi slide-down untuk navbar =====
      if (typeof initNavbarSlideDown === "function") {
        initNavbarSlideDown(header);
        console.log("[INFO] Animasi slide-down navbar diinisialisasi.");
      }
    } else {
      console.log("[WARN] Header, desktopMenu, atau mobileMenu belum tersedia.");
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
      (entries) => {
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
    console.log("[INFO] Observer footer diinisialisasi.");
  }, 500);
}

// =====================================================
// SCHOOL TOUR – AUTO YT API + FADE + AUTO-SLIDE + READ MORE
// =====================================================

function initSchoolTour() {

  const API_KEY = "AIzaSyA7P_bhBW1KjffeCT-YeLrdUwJy-Bk88Y4"; 

  const videos = [
    { id: "IKtbJUjFzwc" },
    { id: "SAKA7U5BWgM" },
    { id: "WWcn9qekEbs" }
  ];

  let index = 0;
  let autoSlideTimer = null;

  const iframe   = document.getElementById("tourVideo");
  const titleEl  = document.getElementById("tourTitle");
  const descEl   = document.getElementById("tourDesc");

  const nextBtn  = document.getElementById("nextTour");
  const prevBtn  = document.getElementById("prevTour");

  const descWrapper = document.querySelector(".tour-desc-wrapper");
  const readMoreBtn = document.getElementById("readMoreTour");

  if (!iframe) return;

  // =====================================================
  // FETCH INFO VIDEO
  // =====================================================
  async function fetchVideoInfo(videoId) {
    try {
      const url = 
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

      const res = await fetch(url);
      const json = await res.json();

      if (!json.items || json.items.length === 0) {
        return {
          title: "Judul tidak ditemukan",
          description: "Deskripsi tidak tersedia."
        };
      }

      const snip = json.items[0].snippet;

      return {
        title: snip.title || "Tanpa Judul",
        description: snip.description || ""
      };

    } catch (e) {
      console.warn("Gagal fetch YT:", e);
      return {
        title: "Kesalahan memuat judul",
        description: "Tidak bisa mengambil deskripsi video."
      };
    }
  }

  // =====================================================
  // FADE ANIMATION
  // =====================================================
  function fadeElement(el) {
    el.style.opacity = 0;
    el.style.transition = "opacity 0.5s";
    setTimeout(() => el.style.opacity = 1, 50);
  }

  // =====================================================
  // UPDATE VIDEO + TITLE + DESC
  // =====================================================
  async function updateTour() {
    const video = videos[index];

    // Reset deskripsi ke collapsed
    if (descWrapper) {
      descWrapper.classList.remove("expanded");
    }
    if (readMoreBtn) {
      readMoreBtn.textContent = "Read More";
    }

    iframe.src = `https://www.youtube.com/embed/${video.id}`;
    titleEl.textContent = "Memuat judul...";
    descEl.textContent  = "Mengambil deskripsi video...";

    fadeElement(iframe);
    fadeElement(titleEl);
    fadeElement(descEl);

    const info = await fetchVideoInfo(video.id);

    titleEl.textContent = info.title;
    descEl.innerHTML    = info.description.replace(/\n/g, "<br>");

    fadeElement(titleEl);
    fadeElement(descEl);
  }

  // =====================================================
  // AUTO SLIDE
  // =====================================================
  function startAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
      index = (index + 1) % videos.length;
      updateTour();
    }, 20000);
  }

  // =====================================================
  // MANUAL NEXT / PREV
  // =====================================================
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % videos.length;
    updateTour();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + videos.length) % videos.length;
    updateTour();
    startAutoSlide();
  });

  // =====================================================
  // READ MORE SYSTEM
  // =====================================================
  if (readMoreBtn && descWrapper) {
    readMoreBtn.addEventListener("click", () => {
      const expanded = descWrapper.classList.toggle("expanded");
      readMoreBtn.textContent = expanded ? "Sesingkatnya..." : "Selengkapnya...";
    });
  }

  // FIRST LOAD
  updateTour();
  startAutoSlide();
}


// =====================================================
// TRIGGER
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initSchoolTour, 700);
});
