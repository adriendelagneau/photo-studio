//
// Split a div content to spans
//

// This function converts the content of a div element into spans, each containing a character or a space.
export const convertDivToSpans = (element, spanClass) => {
  // Set the overflow property to "hidden" to ensure that the spans don't overflow the div.
  element.style.overflow = "hidden";

  // Replace the innerHTML of the div with spans, adding the specified class to each span.
  element.innerHTML = element.innerText
    .split("")
    .map((char) => {
      if (char === " ") {
        // If the character is a space, create a non-breaking space within a span.
        return `<span class="${spanClass}">&nbsp;</span>`;
      }
      // Otherwise, create a span for the character with the specified class.
      return `<span class="${spanClass}">${char}</span>`;
    })
    .join("");

  // Return the modified element.
  return element;
}

//
// Grayscale toggle
//

// This function toggles the grayscale effect on an image when clicked.
export const toggleGrayscale = (event, selector) => {
  // Find the image element within the current target of the event.
  const img = event.currentTarget.querySelector(selector);

  // Toggle between grayscale and color classes on the image.
  if (img.classList.contains("grayscale")) {
    // If the image has the "grayscale" class, remove it and add the "no-grayscale" class.
    img.classList.remove("grayscale");
    img.classList.add("no-grayscale");
  } else {
    // If the image doesn't have the "grayscale" class, remove "no-grayscale" and add "grayscale" class.
    img.classList.remove("no-grayscale");
    img.classList.add("grayscale");
  }
}
