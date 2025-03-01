// runner.js

document.addEventListener("DOMContentLoaded", () => {
    // Buttons
    const toggleIframeBtn = document.getElementById("toggleIframeBtn");
    const toggleDarkModeBtn = document.getElementById("toggleDarkModeBtn");
  
    // Container where we'll place the iframe
    const iframeContainer = document.getElementById("iframeContainer");
  
    // 1. Dynamically create the iframe
    const notionFrame = document.createElement("iframe");
    notionFrame.id = "notionFrame";
    notionFrame.classList.add("notion-iframe");
    notionFrame.src = "https://telling-potential-0f8.notion.site/Runners-4882b096c64e48ad9692e69c0dbd6eee";
    notionFrame.frameBorder = "0";
    notionFrame.scrolling = "yes";
    notionFrame.allowFullscreen = true;
  
    // Insert it into the DOM
    iframeContainer.appendChild(notionFrame);
  
    // 2. Fade in once the iframe loads
    notionFrame.addEventListener("load", () => {
      notionFrame.style.opacity = 1;
    });
  
    // 3. Toggle iframe visibility
    toggleIframeBtn.addEventListener("click", () => {
      if (notionFrame.classList.contains("hidden")) {
        notionFrame.classList.remove("hidden");
        toggleIframeBtn.textContent = "Hide Iframe";
      } else {
        notionFrame.classList.add("hidden");
        toggleIframeBtn.textContent = "Show Iframe";
      }
    });
  
    // 4. Toggle dark mode
    toggleDarkModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  });