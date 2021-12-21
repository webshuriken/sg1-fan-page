function initMobileMenu() {
  // get the mobile menu button
  const burgerBtn = document.querySelector('#burger-btn');
  // listen for clicks on the mobile menu button
  burgerBtn.addEventListener('click', elem => {
    elem.preventDefault();
    // get nav list
    const navList = document.querySelector('#nav-list');
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
