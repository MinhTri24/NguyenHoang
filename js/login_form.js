//async function authenticateUser(email, password) {
// const response = await fetch("http://192.168.1.8:5000/api/log_info");
//  const users = await response.json();
//  console.log(users);
//  for (const user of users) {
//    if ((users.username === email || users.username_1 === email) &&
//        (users.password === password || users.password_1 === password)) {
//      return users;
//    }
//  }
//  return null;
//}


async function authenticateUser(username, password) {
  const apiLink = "http://192.168.1.16:3000/tanthuan/users";

  try {
    const response = await fetch(apiLink);
    const data = await response.json();

    const users = data; // Assuming that the data directly contains the array of users
    console.log(users);
    return users[0];

    // No matching user found
    return;
  } catch (error) {
    console.log("Login Error.", error);
    return null;
  }
}




document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameInput = document.getElementById("usernameInput").value;
  const password = document.getElementById("inputPassword").value;
  const authenticatedUser = await authenticateUser(usernameInput, password);
  if (authenticatedUser) {
    // Save the display name in localStorage
    const displayName = authenticatedUser.username || authenticatedUser.username_1;
    window.localStorage.setItem("displayName", displayName);
    window.localStorage.setItem('loggedIn', 'true');
    window.location.href = 'index.html';

  } else {
    alert('Invalid email or password.');
  }
});
