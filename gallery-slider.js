/**
 * @description Creates a gallery carousel of sorts
 */
export function wsGallerySlider() {
  // enclosed to keep track of visible slide
  let activeSlide = 0;
  // get left and right buttons
  const slideBtns = document.querySelectorAll('.vehicles-slide__btns');
  // moves the slides left or right, uses enclosure to keep track
  function moveSlide(ele) {
    // get slide direction from clicked button
    const direction = ele.srcElement.dataset.slide
    const slides = document.querySelectorAll('.vehicles-slide')
    const slidesLength = slides.length - 1;
    // slides will move either left or right only, dont accept other values
    if (direction === 'right') {
      // slide from right to left
      slides[activeSlide].style.animationName="hideSlideRight";
      activeSlide++;
      // keep within available slides bound
      if (activeSlide > slidesLength) {activeSlide = 0}
      slides[activeSlide].style.animationName="slideFromRight";
    }else if (direction === 'left') {
      // slide from left to right
      slides[activeSlide].style.animationName="hideSlideLeft";
      activeSlide--;
      // keep within available slides bound
      if (activeSlide < 0) {activeSlide = slidesLength}
      slides[activeSlide].style.animationName="slideFromLeft";
    }else {
      console.error('Slides: Is trying to slide without buttons');
    }
  }
  // listen for btn click
  slideBtns.forEach(btn => {
    btn.addEventListener('click', moveSlide);
  });
}