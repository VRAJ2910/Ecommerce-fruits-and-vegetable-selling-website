// Minimal Auth System for Modal

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
const authModal = document.getElementById('authModal');
const authModalContent = document.getElementById('authModalContent');
const userIcon = document.getElementById('userIcon');

function showAuthForm(type = 'login') {
  authModal.classList.add('active');
  authModal.style.display = 'flex';
  authModalContent.innerHTML = `
    <span class="close-btn" id="closeAuthModal">&times;</span>
    <h2>${type === 'login' ? 'Login' : 'Sign Up'}</h2>
    <form id="authForm">
      ${type === 'signup' ? `
        <div class="form-group">
          <label for="signupName">Full Name</label>
          <input type="text" id="signupName" required>
        </div>
      ` : ''}
      <div class="form-group">
        <label for="authEmail">Email</label>
        <input type="email" id="authEmail" required>
      </div>
      <div class="form-group">
        <label for="authPassword">Password</label>
        <input type="password" id="authPassword" required>
      </div>
      <button type="submit" class="submit-btn">${type === 'login' ? 'Login' : 'Sign Up'}</button>
    </form>
    <p class="form-switch">
      ${type === 'login'
        ? `Don't have an account? <a href="#" id="switchToSignup">Sign Up</a>`
        : `Already have an account? <a href="#" id="switchToLogin">Login</a>`}
    </p>
  `;

  document.getElementById('closeAuthModal').onclick = () => closeAuthModal();
  document.getElementById('authForm').onsubmit = (e) => {
    e.preventDefault();
    if (type === 'login') handleLogin();
    else handleSignup();
  };
  if (type === 'login') {
    document.getElementById('switchToSignup').onclick = (e) => {
      e.preventDefault();
      showAuthForm('signup');
    };
  } else {
    document.getElementById('switchToLogin').onclick = (e) => {
      e.preventDefault();
      showAuthForm('login');
    };
  }
}

function closeAuthModal() {
  authModal.classList.remove('active');
  authModal.style.display = 'none';
}

function showLoggedInModal() {
  authModal.classList.add('active');
  authModal.style.display = 'flex';
  authModalContent.innerHTML = `
    <span class="close-btn" id="closeAuthModal">&times;</span>
    <h2>Account</h2>
    <div style="margin-bottom:1.5rem;">Logged in as <b>${currentUser.email}</b></div>
    <button class="submit-btn" id="logoutBtnModal">Logout</button>
  `;
  document.getElementById('closeAuthModal').onclick = () => closeAuthModal();
  document.getElementById('logoutBtnModal').onclick = () => handleLogout();
}

function handleLogin() {
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    showMessage('Invalid email or password', 'error');
    return;
  }
  currentUser = { name: user.name, email: user.email };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  closeAuthModal();
  updateAuthUI();
  showMessage('Logged in successfully!', 'success');
}

function handleSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  if (!name || !email || !password) {
    showMessage('Please fill all fields', 'error');
    return;
  }
  let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  if (users.find(u => u.email === email)) {
    showMessage('Email already registered', 'error');
    return;
  }
  users.push({ name, email, password });
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  currentUser = { name, email };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  closeAuthModal();
  updateAuthUI();
  showMessage('Account created and logged in!', 'success');
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
  closeAuthModal();
  showMessage('Logged out!', 'success');
}

function updateAuthUI() {
  if (userIcon) {
    if (currentUser) {
      userIcon.title = `Logged in as ${currentUser.email}`;
      userIcon.onclick = (e) => {
        e.preventDefault();
        showLoggedInModal();
      };
    } else {
      userIcon.title = 'Account';
      userIcon.onclick = (e) => {
        e.preventDefault();
        showAuthForm('login');
      };
    }
  }
}

function showMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#2ed573' : type === 'error' ? '#ff4757' : '#3742fa'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  document.body.appendChild(messageDiv);
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}

// Initialize UI on page load
updateAuthUI(); 