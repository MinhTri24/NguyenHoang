// Automatic log out
function setLoggedOut() {
  window.localStorage.setItem("loggedIn", "false");
}

// Check if the user is authenticated
if (!isAuthenticated()) {
  // redirectToLogin();
};