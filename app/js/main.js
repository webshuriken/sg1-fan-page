import { wsGallerySlider } from "./gallery-slider.js";
function initMobileMenu() {
  const e = document.querySelector("#burger-btn"),
    t = document.querySelector("#nav-list");
  e.addEventListener("click", (e) => {
    e.preventDefault(), t.classList.toggle("active");
  }),
    t.addEventListener("click", (e) => {
      window.innerWidth < 768 && t.classList.toggle("active");
    });
}
function initCardFlip() {
  document.querySelectorAll(".read-more").forEach((e) => {
    e.addEventListener("click", (e) => {
      e.target.previousElementSibling.classList.toggle("rotate-card");
    });
  });
}
initMobileMenu(), initCardFlip(), wsGallerySlider();
//# sourceMappingURL=main.js.map
