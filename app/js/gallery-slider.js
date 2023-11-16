export function wsGallerySlider() {
  let e = 0;
  function t(t) {
    const i = t.srcElement.dataset.slide,
      l = document.querySelectorAll(".vehicles-slide"),
      n = l.length - 1;
    "right" === i
      ? ((l[e].style.animationName = "hideSlideRight"),
        e++,
        e > n && (e = 0),
        (l[e].style.animationName = "slideFromRight"))
      : "left" === i
        ? ((l[e].style.animationName = "hideSlideLeft"),
          e--,
          e < 0 && (e = n),
          (l[e].style.animationName = "slideFromLeft"))
        : console.error("Slides: Is trying to slide without buttons");
  }
  document.querySelectorAll(".vehicles-slide__btns").forEach((e) => {
    e.addEventListener("click", t);
  });
}
//# sourceMappingURL=gallery-slider.js.map
