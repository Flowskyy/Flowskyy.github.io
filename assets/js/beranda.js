document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector("#beritaCarousel");
  const titleBox = document.getElementById("beritaTitle");
  const captionBox = document.getElementById("beritaCaption");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 5000,
    ride: false,
  });

  const updateCaption = () => {
    const active = carousel.querySelector(".carousel-item.active");
    if (active) {
      titleBox.textContent = active.dataset.title;
      captionBox.textContent = active.dataset.caption;
    }
  };

  nextBtn.addEventListener("click", () => {
    bsCarousel.next();
    setTimeout(updateCaption, 500);
  });

  prevBtn.addEventListener("click", () => {
    bsCarousel.prev();
    setTimeout(updateCaption, 500);
  });

  carousel.addEventListener("slid.bs.carousel", updateCaption);
  updateCaption();

  // ==== Animasi Scroll ====
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".fade-slide-up").forEach((el) => {
    observer.observe(el);
  });
});
