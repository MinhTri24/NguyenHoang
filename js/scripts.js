// Scripts

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async event => {
            event.preventDefault();

            const email = document.getElementById('inputEmail').value;
            const password = document.getElementById('inputPassword').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        alert("Login Successfully.");
                        window.location.href = 'index.html';
                    } else {
                        alert('Invalid email or password');
                    }
                } else {
                    alert('Error occurred during login');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error occurred during login');
            }
        });
    }
});

document.getElementById("logout").addEventListener("click", () => {
    // Set loggedIn to false
    window.localStorage.setItem("loggedIn", "false");

    // Redirect to the login page
    window.location.href = "login.html";
});



function isAuthenticated() {
    const loggedIn = window.localStorage.getItem('loggedIn');
    console.log('Logged In:', loggedIn);
    return loggedIn === 'true';
}

function redirectToLogin() {
    alert("Haven't logged in yet.")
    window.location.href = 'login.html';
};

// Check if the user is authenticated
if (!isAuthenticated()) {
    // redirectToLogin();
};

// Automatic log out
let logoutTimer;

function startLogoutTimer() {
    // Set the timer to log out the user after 30 minutes (1800000 ms)
    logoutTimer = setTimeout(logoutUser, 1800000);
}

function resetLogoutTimer() {
    clearTimeout(logoutTimer);
    startLogoutTimer();
}

function logoutUser() {
    window.localStorage.setItem("loggedIn", "false");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.localStorage.getItem("loggedIn") === "true") {
        startLogoutTimer();
        document.addEventListener("mousemove", resetLogoutTimer);
        document.addEventListener("keydown", resetLogoutTimer);
        document.addEventListener("scroll", resetLogoutTimer);
    }
});

function setLoggedOut() {
    window.localStorage.setItem("loggedIn", "false");
}


