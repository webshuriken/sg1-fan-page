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
    // toggle navlist
    navList.classList.toggle('active');
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

initMobileMenu();
initCardFlip();
