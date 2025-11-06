/* HL: GET IMAGES FROM PAGE */
const previewImgs = document.querySelectorAll(".preview-img");
const images = Array.from(previewImgs).map(img => img.src);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".lightbox-btn.prev");
const nextBtn = document.querySelector(".lightbox-btn.next");

let currentIndex = 0;

/* HL: OPEN */
previewImgs.forEach((img, i) => {
  img.addEventListener("click", () => {
    currentIndex = i;
    showImage();
    lightbox.classList.add("active");

    setTimeout(() => {
      lightbox.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  });
});

/* HL: SHOW */
function showImage() {
  lightboxImg.src = images[currentIndex];
}

/* HL: NEXT */
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

/* HL: PREV */
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

/* HL: CLOSE */
closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

/* HL: SWIPE */
let startX = 0;
let endX = 0;
const threshold = 50;

lightbox.addEventListener("touchstart", e => {
  startX = e.changedTouches[0].clientX;
});

lightbox.addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      currentIndex = (currentIndex + 1) % images.length;
    }
    showImage();
  }
});
