//
// Split a div content to spans
//
export const convertDivToSpans = (element, spanClass) => {
    element.style.overflow = "hidden";
    element.innerHTML = element.innerText
      .split("")
      .map((char) => {
        if (char === " ") {
          return `<span class="${spanClass}">&nbsp;</span>`;
        }
        return `<span class="${spanClass}">${char}</span>`;
      })
      .join("");
  
    return element;
}
  


//
// Grayscale toggle
//
export const toggleGrayscale = (event, selector) => {
  const img = event.currentTarget.querySelector(selector);
  
  // Toggle between grayscale and color classes
  if (img.classList.contains("grayscale")) {
      img.classList.remove("grayscale");
      img.classList.add("no-grayscale");
  } else {
      img.classList.remove("no-grayscale");
      img.classList.add("grayscale");
  }
}
