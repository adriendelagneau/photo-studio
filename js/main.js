// Import the necessary modules
import gsap from 'gsap'; // GreenSock Animation Platform
import ScrollTrigger from 'gsap/src/ScrollTrigger';

import { convertDivToSpans } from './helper.js';

gsap.registerPlugin(ScrollTrigger);


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
const dynamicText = document.querySelector("span"); // The element where typing effect will be displayed
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

// Select all elements with the class "skew-container"
const skexContainers = document.querySelectorAll(".skew-container");

// Function to toggle grayscale effect on images within "skew-container"
function toggleGrayscale(event) {
  const img = event.currentTarget.querySelector(".skew-container img");

  // Toggle between grayscale and color classes
  if (img.classList.contains("grayscale")) {
    img.classList.remove("grayscale");
    img.classList.add("no-grayscale");
  } else {
    img.classList.remove("no-grayscale");
    img.classList.add("grayscale");
  }
}

// Add mouse enter and leave event listeners to apply grayscale toggle
skexContainers.forEach((c) => {
  c.addEventListener("mouseenter", toggleGrayscale);
  c.addEventListener("mouseleave", toggleGrayscale);
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
  ****** Fotter ********** 
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
