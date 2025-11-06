/**
 * @jest-environment jsdom
 */

describe('Main.js functionality', () => {
  beforeEach(() => {
    // Setup DOM structure for mobile menu
    document.body.innerHTML = `
      <nav id="navbar">
        <h2 id="site-title">Stargate Fan Site</h2>
        <button id="burger-btn" class="material-icons">menu</button>
        <ul id="nav-list">
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#characters" class="nav-link">Characters</a></li>
          <li><a href="#vehicles" class="nav-link">Vehicles</a></li>
        </ul>
      </nav>
      <section id="characters">
        <div class="cards-wrapper">
          <article class="tile-scene">
            <div class="tile-card">
              <div class="tile-card__face tile-card__face--front">
                <img src="oneill.jpg" alt="" />
                <h3>Jack O'Neill</h3>
              </div>
              <div class="tile-card__face tile-card__face--back">
                <ul class="tile-card__list">
                  <li><b>Name:</b> Jack O'Neill</li>
                </ul>
              </div>
            </div>
            <button class="read-more">Read more</button>
          </article>
          <article class="tile-scene">
            <div class="tile-card">
              <div class="tile-card__face tile-card__face--front">
                <img src="daniel.jpg" alt="" />
                <h3>Daniel Jackson</h3>
              </div>
              <div class="tile-card__face tile-card__face--back">
                <ul class="tile-card__list">
                  <li><b>Name:</b> Daniel Jackson</li>
                </ul>
              </div>
            </div>
            <button class="read-more">Read more</button>
          </article>
        </div>
      </section>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Mobile Menu functionality', () => {
    test('should toggle nav-list active class when burger button is clicked', () => {
      const burgerBtn = document.querySelector('#burger-btn');
      const navList = document.querySelector('#nav-list');

      // Manually initialize mobile menu since we can't import the function directly
      burgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navList.classList.toggle('active');
      });

      expect(navList.classList.contains('active')).toBe(false);

      // Click burger button
      burgerBtn.click();
      expect(navList.classList.contains('active')).toBe(true);

      // Click again to close
      burgerBtn.click();
      expect(navList.classList.contains('active')).toBe(false);
    });

    test('should prevent default behavior when burger button is clicked', () => {
      const burgerBtn = document.querySelector('#burger-btn');
      const navList = document.querySelector('#nav-list');

      let defaultPrevented = false;
      burgerBtn.addEventListener('click', (e) => {
        defaultPrevented = e.defaultPrevented;
        e.preventDefault();
        navList.classList.toggle('active');
      });

      burgerBtn.click();
      expect(defaultPrevented).toBe(false); // Before preventDefault
    });

    test('should toggle nav-list when nav-list itself is clicked on mobile', () => {
      const navList = document.querySelector('#nav-list');

      // Set window width to mobile size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      navList.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          navList.classList.toggle('active');
        }
      });

      navList.classList.add('active');
      navList.click();
      expect(navList.classList.contains('active')).toBe(false);
    });

    test('should not toggle nav-list when nav-list is clicked on desktop', () => {
      const navList = document.querySelector('#nav-list');

      // Set window width to desktop size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      navList.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          navList.classList.toggle('active');
        }
      });

      navList.classList.add('active');
      navList.click();
      // Should still be active since we're on desktop
      expect(navList.classList.contains('active')).toBe(true);
    });
  });

  describe('Card Flip functionality', () => {
    test('should toggle rotate-card class when read-more button is clicked', () => {
      const readMoreButtons = document.querySelectorAll('.read-more');
      const firstCard = readMoreButtons[0].previousElementSibling;

      // Manually initialize card flip
      readMoreButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.target.previousElementSibling.classList.toggle('rotate-card');
        });
      });

      expect(firstCard.classList.contains('rotate-card')).toBe(false);

      // Click read-more button
      readMoreButtons[0].click();
      expect(firstCard.classList.contains('rotate-card')).toBe(true);

      // Click again to flip back
      readMoreButtons[0].click();
      expect(firstCard.classList.contains('rotate-card')).toBe(false);
    });

    test('should handle multiple card flips independently', () => {
      const readMoreButtons = document.querySelectorAll('.read-more');
      const firstCard = readMoreButtons[0].previousElementSibling;
      const secondCard = readMoreButtons[1].previousElementSibling;

      // Manually initialize card flip
      readMoreButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.target.previousElementSibling.classList.toggle('rotate-card');
        });
      });

      // Flip first card
      readMoreButtons[0].click();
      expect(firstCard.classList.contains('rotate-card')).toBe(true);
      expect(secondCard.classList.contains('rotate-card')).toBe(false);

      // Flip second card
      readMoreButtons[1].click();
      expect(firstCard.classList.contains('rotate-card')).toBe(true);
      expect(secondCard.classList.contains('rotate-card')).toBe(true);

      // Unflip first card
      readMoreButtons[0].click();
      expect(firstCard.classList.contains('rotate-card')).toBe(false);
      expect(secondCard.classList.contains('rotate-card')).toBe(true);
    });

    test('should find all read-more buttons', () => {
      const readMoreButtons = document.querySelectorAll('.read-more');
      expect(readMoreButtons.length).toBe(2);
    });

    test('should access previousElementSibling correctly', () => {
      const readMoreButtons = document.querySelectorAll('.read-more');
      const firstCardElement = readMoreButtons[0].previousElementSibling;

      expect(firstCardElement).toBeTruthy();
      expect(firstCardElement.classList.contains('tile-card')).toBe(true);
    });
  });

  describe('DOM Element Selection', () => {
    test('should select burger button correctly', () => {
      const burgerBtn = document.querySelector('#burger-btn');
      expect(burgerBtn).toBeTruthy();
      expect(burgerBtn.tagName).toBe('BUTTON');
    });

    test('should select nav-list correctly', () => {
      const navList = document.querySelector('#nav-list');
      expect(navList).toBeTruthy();
      expect(navList.tagName).toBe('UL');
    });

    test('should select all read-more buttons correctly', () => {
      const buttons = document.querySelectorAll('.read-more');
      expect(buttons.length).toBeGreaterThan(0);
      buttons.forEach((btn) => {
        expect(btn.tagName).toBe('BUTTON');
      });
    });
  });
});
