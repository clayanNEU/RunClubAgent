// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const notionFrame = document.getElementById("notionFrame");
    const toggleIframeBtn = document.getElementById("toggleIframeBtn");
    const toggleDarkModeBtn = document.getElementById("toggleDarkModeBtn");
  
    // 1. Fade the iframe in once it finishes loading
    notionFrame.addEventListener("load", () => {
      notionFrame.style.opacity = 1;
    });
  
    // 2. Toggle iframe visibility
    toggleIframeBtn.addEventListener("click", () => {
      if (notionFrame.classList.contains("hidden")) {
        notionFrame.classList.remove("hidden");
        toggleIframeBtn.textContent = "Hide Iframe";
      } else {
        notionFrame.classList.add("hidden");
        toggleIframeBtn.textContent = "Show Iframe";
      }
    });
  
    // 3. Toggle dark mode
    toggleDarkModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  });