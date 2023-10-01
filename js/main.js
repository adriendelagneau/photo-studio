// Import the necessary modules
import gsap from 'gsap'; // GreenSock Animation Platform
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import Lenis from '@studio-freight/lenis'

import { convertDivToSpans, toggleGrayscale } from './helper.js';
import { photosMode } from './data.js';

gsap.registerPlugin(ScrollTrigger);

/*
  ****** Smooth scroll ********** 
*/

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) { // need a classic function
      e.preventDefault(); // Prevent the default behavior of the anchor tag
      const targetId = this.getAttribute('href').substring(1); // Get the target ID
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
      }
  });
});


/*
  ****** Menu ********** 
*/

var menuToggle = document.getElementById("menuToggle");

var menuBar = gsap.timeline();

menuBar.to('.bar-1', {
  attr: { d: "M8,2 L2,8" },
  x: 1,
  duration: 0.5,
  ease: "Power2.easeInOut"
}, 'start')

menuBar.to('.bar-2', {
  autoAlpha: 0,
  duration: 0.5,
}, 'start')

menuBar.to('.bar-3', {
  attr: { d: "M8,8 L2,2" },
  x: 1,
  duration: 0.5,
  ease: "Power2.easeInOut"
}, 'start')

menuBar.reverse();


var tl = gsap.timeline({ paused: true });

tl.to('.fullpage-menu', {
  zIndex: 100,
});

tl.to('.fullpage-menu', {
  duration: 0,
  display: "block",
  ease: 'Expo.easeInOut',
});

tl.from('.menu-bg span', {
  duration: 1,
  x: "100%",
  stagger: 0.1,
  ease: 'Expo.easeInOut'
});

tl.from('.main-menu li a', {
  duration: 1.5,
  y: "100%",
  stagger: 0.2,
  ease: 'Expo.easeInOut'
}, "-=0.5");

tl.from('.social-links li', {
  duration: 1,
  y: "-100%",
  opacity: 0,
  stagger: 0.1,
  ease: 'Expo.easeInOut'
}, "-=0.5");

// Reverse the tl timeline to its initial state
tl.reverse();

// Add a click event listener to the menu toggle button
menuToggle.addEventListener('click', () => {
  // Reverse the menuBar timeline's play direction
  menuBar.reversed(!menuBar.reversed());

  // Reverse the tl timeline's play direction
  tl.reversed(!tl.reversed());
});


// Add a click event listener to the menu links
document.querySelectorAll('.main-menu li a').forEach((menuLink) => {
  menuLink.addEventListener('click', () => {
    // Reverse the menuBar timeline
    menuBar.reverse();

    // Reverse the tl timeline
    tl.reverse();
  });
});



/*
  ****** Landing ********** 
*/

// Define words with classes for the typing effect
const wordsWithClasses = [
  { word: "Mode", class: "art-class" },
  { word: "Artiste", class: "love-class" },
  { word: "Evenements", class: "pain-class" },
];

let wordIndex = 0;
let charIndex = 1;
let isDeleting = false;

// Function for the typing effect
function typeEffect() {
  const currentWordObj = wordsWithClasses[wordIndex];
  const currentWord = currentWordObj.word;
  const currentChar = currentWord.substring(0, charIndex);
  const currentClass = currentWordObj.class;

  // Update the innerHTML to display the typed text with the appropriate class
  dynamicText.innerHTML = `<span class="${currentClass}">${currentChar}</span>`;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 200); // Type the next character after a delay
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 100); // Delete the last character after a delay
  } else {
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % wordsWithClasses.length : wordIndex;
    setTimeout(typeEffect, 700); // Move to the next word after a longer delay
  }
}

// Select elements from the HTML
const dynamicText = document.querySelector("#landing span"); // The element where typing effect will be displayed
const h1 = document.querySelector("h1"); // Main heading
const name = document.getElementById("name"); // Element with ID "name"

// Convert the contents of 'h1' and 'name' elements into spans using the helper function
convertDivToSpans(h1, "splited-title"); // Convert 'h1' contents into spans with class "splited-title"
convertDivToSpans(name, "splited-name"); // Convert 'name' contents into spans with class "splited-name"

// Select the newly created spans
const splitedName = document.querySelectorAll(".splited-name"); // All elements with class "splited-name"
const splitedTitle = document.querySelectorAll(".splited-title"); // All elements with class "splited-title"

// Create a GSAP timeline for animating the spans
gsap.timeline({
  onComplete: typeEffect, // Call the typeEffect function when the timeline completes
})
  .fromTo(splitedName, { opacity: 0 }, { opacity: 1, stagger: 0.15, delay: 0.3 }) // Fade in 'splited-name' elements
  .fromTo(splitedTitle, { opacity: 0 }, { opacity: 1, stagger: 0.15, delay: 0.3 }); // Fade in 'splited-title' elements



/*
  ****** Presentation ********** 
*/

// Toggle grayscale on hover
const skexContainers = document.querySelectorAll(".skew-container");
// Add mouse enter and leave event listeners to apply grayscale toggle
skexContainers.forEach((c) => {
  c.addEventListener("mouseenter", (event) => toggleGrayscale(event, ".skew-container img"));
  c.addEventListener("mouseleave", (event) => toggleGrayscale(event, ".skew-container img"));
});


// Define variables for scroll skew effect
let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".skew-container", "skewY", "deg"), // Fast skew updates
  clamp = gsap.utils.clamp(-20, 20); // Ensure skew doesn't exceed -20 to 20 degrees

// Create a ScrollTrigger to control the skew effect
ScrollTrigger.create({
  onUpdate: (self) => {
    // Calculate skew based on scroll velocity and clamp it
    let skew = clamp(self.getVelocity() / -300);

    // Update proxy object and apply skew animation
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
    }
  }
});

// Set the transform origin for elements with the class "col"
gsap.set(".col", { transformOrigin: "right center", force3D: true });

// Select all elements with the class "right-part div"
const presentationPart = document.querySelectorAll('.right-part div');

// Options for the Intersection Observer
let options = {
  root: null,
  rootMargin: "0px 0px",
  threshold: 0.5,
};

// Function to handle intersection of elements with the viewport
const handleIntersect = (entries) => {
  entries.forEach((e) => {
    // If an element is at least 50% visible, set its opacity to 1
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
    }
  });
};

// Create an Intersection Observer and observe "right-part div" elements
const observer = new IntersectionObserver(handleIntersect, options);

presentationPart.forEach(container => {
  observer.observe(container);
});



/*
  ****** Slider ********** 
*/
const slider = document.getElementById("slider");

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

const sliderContainer = document.querySelector(".sliderContainer");
const sliderContainerWidth = sliderContainer.offsetWidth;
const sliderWidth = slider.offsetWidth;
const gallery = document.querySelector("#gallery");

const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: gallery,
    pin: true,
    start: "top top",
    end: `300% bottom`,
    scrub: true,
    //markers: true,
  },
});

timeline.to(".slider", {
  x: `${sliderContainerWidth - sliderWidth}px`,
});

// Grayscale Effect on Cards
const cards = document.querySelectorAll('.card');
cards.forEach((c) => {
  c.addEventListener("mouseenter", (event) => toggleGrayscale(event, ".card img"));
  c.addEventListener("mouseleave", (event) => toggleGrayscale(event, ".card img"));
});

// Gallery Title Animation
const galleryTitle = document.querySelector(".gallery-title");
convertDivToSpans(galleryTitle, "splited-gallery");
const splitedGallerySpans = document.querySelectorAll(".splited-gallery");

let t4 = gsap.timeline({ paused: true });
t4.from(splitedGallerySpans, { opacity: 0, skewX: 40, x: -30, y: -40, stagger: 0.1 });

// Intersection Observer Configuration
let options3 = {
  root: null,
  rootMargin: "-150px 0px",
  threshold: 0.5,
};

// Intersection Observer Function
const handleIntersect3 = (entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      t4.play();
    }
  });
};

// Create and Observe Intersection Observer
const observer3 = new IntersectionObserver(handleIntersect3, options3);
observer3.observe(galleryTitle);



/*
  ****** Footer ********** 
*/

// Select all elements with the class "right-part div"
const underlineFooterSpans = document.querySelectorAll('h4 span');

// Options for the Intersection Observer
let options2 = {
  root: null,
  rootMargin: "-150px 0px",
  threshold: 0.5,
};

// Function to handle intersection of elements with the viewport
const handleIntersect2 = (entries) => {
  entries.forEach((e) => {
    // If an element is at least 50% visible, add class
    if (e.isIntersecting) {
      e.target.classList.add('visible')
    }
  });
};

// Create an Intersection Observer and observe "right-part div" elements
const observer2 = new IntersectionObserver(handleIntersect2, options2);

underlineFooterSpans.forEach(container => {
  observer2.observe(container);
});


