// Import the necessary modules
import gsap from 'gsap'; // GreenSock Animation Platform
import ScrollTrigger from 'gsap/src/ScrollTrigger';

import { convertDivToSpans } from './helper.js';

gsap.registerPlugin(ScrollTrigger);


//
// Landing
//

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
