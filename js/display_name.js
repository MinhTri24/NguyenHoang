document.addEventListener("DOMContentLoaded", () => {
    const displayName = window.localStorage.getItem("displayName");
  
    if (displayName) {
      const displayNameElement = document.querySelector(".sb-sidenav-footer .small");
      const displayNameWrapper = document.createElement("div");
      displayNameWrapper.textContent = displayName;
      if (displayNameElement) {
        displayNameElement.parentNode.insertBefore(displayNameWrapper, displayNameElement.nextSibling);
      }
    }
  });
  