const carousel = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-images img");
const dots = document.querySelectorAll(".carousel-dots .dot");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let currentIndex = 0;
const totalImages = images.length;
let interval;

function showImage(index) {
  const offset = -index * 100;
  carousel.style.transform = `translateX(${offset}%)`;
  updateDots(index);
}

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextImage() {
  currentIndex = (currentIndex + 1) % totalImages;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  showImage(currentIndex);
}

leftArrow.addEventListener("click", () => {
  prevImage();
  resetInterval();
});

rightArrow.addEventListener("click", () => {
  nextImage();
  resetInterval();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    showImage(currentIndex);
    resetInterval();
  });
});

function startAutoSlide() {
  interval = setInterval(nextImage, 3000);
}

function resetInterval() {
  clearInterval(interval);
  startAutoSlide();
}

let keyCooldown = false;
document.addEventListener("keydown", function (event) {
  if (keyCooldown) return;

  if (event.key === "ArrowLeft") {
    prevImage();
    resetInterval();
    keyCooldown = true;
  } else if (event.key === "ArrowRight") {
    nextImage();
    resetInterval();
    keyCooldown = true;
  }

  setTimeout(() => {
    keyCooldown = false;
  }, 400);
});

showImage(currentIndex);
startAutoSlide();
