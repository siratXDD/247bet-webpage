function registerUser() {
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const repeatPassword = document.getElementById('reg-repeat-password').value;
  const message = document.getElementById('reg-message');

  if (password !== repeatPassword) {
    message.textContent = "Passwords do not match.";
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[username]) {
    message.textContent = "Username already exists.";
    return;
  }

  users[username] = { password: password, balance: 100 };
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedInUser', username);
  window.location.href = "index.html";
}

function loginUser() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const message = document.getElementById('login-message');

  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (!users[username] || users[username].password !== password) {
    message.textContent = "Invalid username or password.";
    return;
  }

  localStorage.setItem('loggedInUser', username);
  window.location.href = "index.html";
}

window.onload = function () {
  const authButtons = document.getElementById('auth-buttons');
  if (authButtons) {
    const user = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (user && users[user]) {
      authButtons.innerHTML = `
        <div class="balance-box">
          Balance: $${users[user].balance}
          <button id="power-btn" onclick="showLogoutPopup()">⏻</button>
        </div>
      `;
    }
  }
};

function showLogoutPopup() {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="popup-content">
      <p>Are you sure you want to logout?</p>
      <button onclick="logoutUser()">Confirm</button>
      <button onclick="this.parentElement.parentElement.remove()">Cancel</button>
    </div>
  `;
  document.body.appendChild(popup);
}

function logoutUser() {
  localStorage.removeItem('loggedInUser');
  window.location.reload();
}
