/**
 * @jest-environment jsdom
 */

import { wsGallerySlider } from '../app/js/gallery-slider.js';

describe('wsGallerySlider', () => {
  let slides;
  let leftButton;
  let rightButton;

  beforeEach(() => {
    // Setup DOM structure
    document.body.innerHTML = `
      <div class="vehicles-carousel">
        <div class="vehicles-slide" style="animation-name: '';">
          <div class="vehicles-slide-inner">
            <div>
              <img src="image1.jpg" alt="" class="vehicles-slide__img" />
              <div class="vehicles-slide__caption"><span>Slide 1</span></div>
            </div>
          </div>
        </div>
        <div class="vehicles-slide" style="animation-name: '';">
          <div class="vehicles-slide-inner">
            <div>
              <img src="image2.jpg" alt="" class="vehicles-slide__img" />
              <div class="vehicles-slide__caption"><span>Slide 2</span></div>
            </div>
          </div>
        </div>
        <div class="vehicles-slide" style="animation-name: '';">
          <div class="vehicles-slide-inner">
            <div>
              <img src="image3.jpg" alt="" class="vehicles-slide__img" />
              <div class="vehicles-slide__caption"><span>Slide 3</span></div>
            </div>
          </div>
        </div>
        <button class="vehicles-slide__back vehicles-slide__btns" data-slide="left">&lt;</button>
        <button class="vehicles-slide__next vehicles-slide__btns" data-slide="right">&gt;</button>
      </div>
    `;

    slides = document.querySelectorAll('.vehicles-slide');
    leftButton = document.querySelector('[data-slide="left"]');
    rightButton = document.querySelector('[data-slide="right"]');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should initialize gallery slider', () => {
    expect(slides.length).toBe(3);
    expect(leftButton).toBeTruthy();
    expect(rightButton).toBeTruthy();
  });

  test('should slide right when right button is clicked', () => {
    wsGallerySlider();

    // Click right button
    rightButton.click();

    // First slide should hide to the right
    expect(slides[0].style.animationName).toBe('hideSlideRight');
    // Second slide should appear from the right
    expect(slides[1].style.animationName).toBe('slideFromRight');
  });

  test('should slide left when left button is clicked', () => {
    wsGallerySlider();

    // Click left button
    leftButton.click();

    // First slide should hide to the left
    expect(slides[0].style.animationName).toBe('hideSlideLeft');
    // Last slide should appear from the left
    expect(slides[2].style.animationName).toBe('slideFromLeft');
  });

  test('should loop to first slide after last slide when going right', () => {
    wsGallerySlider();

    // Click right button three times to go through all slides
    rightButton.click(); // to slide 2
    rightButton.click(); // to slide 3
    rightButton.click(); // should loop back to slide 1

    // Should loop back to first slide
    expect(slides[0].style.animationName).toBe('slideFromRight');
  });

  test('should loop to last slide when going left from first slide', () => {
    wsGallerySlider();

    // Click left button from first slide
    leftButton.click();

    // Should show last slide
    expect(slides[2].style.animationName).toBe('slideFromLeft');
  });

  test('should attach event listeners to slide buttons', () => {
    const slideButtons = document.querySelectorAll('.vehicles-slide__btns');
    
    wsGallerySlider();

    // Verify buttons have event listeners by checking they respond to clicks
    const initialRightAnimation = slides[1].style.animationName;
    rightButton.click();
    expect(slides[1].style.animationName).not.toBe(initialRightAnimation);
  });

  test('should handle multiple button clicks in sequence', () => {
    wsGallerySlider();

    // Click right twice
    rightButton.click();
    rightButton.click();

    // Should be on third slide
    expect(slides[2].style.animationName).toBe('slideFromRight');

    // Click left once
    leftButton.click();

    // Should be back on second slide
    expect(slides[1].style.animationName).toBe('slideFromLeft');
  });
});
