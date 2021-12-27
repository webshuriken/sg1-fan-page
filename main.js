function initMobileMenu() {
  // get the mobile menu button
  const burgerBtn = document.querySelector('#burger-btn');
  // get navlist to close nav on click
  const navList = document.querySelector('#nav-list');
  // listen for clicks on the mobile menu button
  burgerBtn.addEventListener('click', elem => {
    elem.preventDefault();
    // toggle nav list
    navList.classList.toggle('active');
  });
  // listen to all clicks on the nav list, disable on screens < 768px
  navList.addEventListener('click', elem => {
    // only toggle on viewport < 768px
    if (window.innerWidth < 768) {
      // toggle navlist
      navList.classList.toggle('active');
    }
  });
}

function initCardFlip() {
  const card = document.querySelectorAll('.read-more');
  card.forEach(card => {
    card.addEventListener('click', elem => {
      elem.target.previousElementSibling.classList.toggle('rotate-card');
    });
  })
}

/**
 * @description Takes care of the vehicle slider
 */
function initSlides() {
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

// start all methods for site interactivity
initMobileMenu();
initCardFlip();
initSlides();
