import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { photosMode } from './data.js';

gsap.registerPlugin(ScrollTrigger);

/*
  ****** Slider ********** 
*/

// Get the slider element by its ID
const slider = document.getElementById("slider");

// Loop through the photo data and create cards for each photo
photosMode.forEach((data) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = data.url;
  img.alt = "";
  img.classList.add("grayscale");

  card.appendChild(img);
  slider.appendChild(card);
});

// Get references to slider elements and calculate dimensions
const sliderContainer = document.querySelector(".sliderContainer");
const sliderContainerWidth = sliderContainer.offsetWidth;
const sliderWidth = slider.offsetWidth;
const gallery = document.querySelector(".gallery");

// Create a GSAP timeline for slider animation
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: gallery,
    pin: true,
    start: "top top",
    end: `300% bottom`,
    scrub: true,
    // markers: true,
  },
});

// Animate the slider element to move horizontally
timeline.to(".slider", {
  x: `${sliderContainerWidth - sliderWidth}px`,
});


/*
****** Grayscale toggle ********** 
*/

// Function to toggle grayscale effect on hover
const cards = document.querySelectorAll('.card');
function toggleGrayscale(event) {
  const img = event.currentTarget.querySelector("img");
  
  if (img.classList.contains("grayscale")) {
    img.classList.remove("grayscale");
    img.classList.add("no-grayscale");
  } else {
    img.classList.remove("no-grayscale");
    img.classList.add("grayscale");
  }
}

// Add event listeners to cards for grayscale toggle
cards.forEach((card) => {
  card.addEventListener("mouseenter", toggleGrayscale);
  card.addEventListener("mouseleave", toggleGrayscale);
});

