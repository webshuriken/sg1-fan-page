import { wsGallerySlider } from "./gallery-slider.js";

/**
 * @description Looks after the mobile menu <768px width
 */
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

/**
 * @description Flip a card to revel back content
 */
function initCardFlip() {
  const card = document.querySelectorAll('.read-more');
  card.forEach(card => {
    card.addEventListener('click', elem => {
      elem.target.previousElementSibling.classList.toggle('rotate-card');
    });
  })
}



// start all methods for site interactivity
(()=>{
  initMobileMenu();
  initCardFlip();
  wsGallerySlider();
})();
