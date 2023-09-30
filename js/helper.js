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