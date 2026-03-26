const form = document.querySelector(".auth-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("Email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

const userError = document.getElementById("userError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const authError = document.getElementById("authError");

const isSignup = Boolean(confirmInput);

function showError(el, message) {
  if (!el) return;
  el.textContent = message;
  el.classList.remove("is-hidden");
}

function clearError(el) {
  if (!el) return;
  el.textContent = "";
  el.classList.add("is-hidden");
}

function shakeForm() {
  if (!form) return;
  form.classList.remove("shake");
  void form.offsetWidth;
  form.classList.add("shake");
}

function isValidEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value);
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function handleSignup(event) {
  event.preventDefault();
  // Reset old messages before validating the new signup attempt.
  clearError(userError);
  clearError(emailError);
  clearError(passwordError);
  clearError(confirmError);
  clearError(authError);

  const username = (usernameInput?.value || "").trim();
  const normalizedUsername = username.toLowerCase();
  const email = (emailInput?.value || "").trim().toLowerCase();
  const password = passwordInput?.value || "";
  const confirm = confirmInput?.value || "";

  let hasError = false;

  if (!username) {
    showError(userError, "Username is required.");
    hasError = true;
  } else if (username.length < 3) {
    showError(userError, "Username must be at least 3 characters.");
    hasError = true;
  }

  if (!email || !isValidEmail(email)) {
    showError(emailError, "Enter a valid email address.");
    hasError = true;
  }

  if (password.length < 6) {
    showError(passwordError, "Password must be at least 6 characters.");
    hasError = true;
  } else if (!/[A-Z]/.test(password)) {
    showError(passwordError, "Include at least one uppercase letter.");
    hasError = true;
  } else if (!/[0-9]/.test(password)) {
    showError(passwordError, "Include at least one number.");
    hasError = true;
  }

  if (confirm !== password) {
    showError(confirmError, "Passwords do not match.");
    hasError = true;
  }

  if (hasError) {
    shakeForm();
    return;
  }

  // Prevent duplicate accounts by checking both email and username.
  const users = getUsers();
  const exists = users.some(
    (user) => user.email === email || (user.username || "").toLowerCase() === normalizedUsername
  );

  if (exists) {
    showError(authError, "Account already exists. Log in instead.");
    shakeForm();
    return;
  }

  // Save the new user locally, then send them to the login page.
  users.push({ username, email, password });
  saveUsers(users);
  window.location.href = "login.html";
}

function handleLogin(event) {
  event.preventDefault();
  // Login only uses the shared auth error because the form accepts either email or username.
  clearError(authError);

  const identifier = (emailInput?.value || "").trim();
  const password = passwordInput?.value || "";

  if (!identifier || !password) {
    showError(authError, "Please enter your email/username and password.");
    shakeForm();
    return;
  }

  const users = getUsers();
  const normalizedIdentifier = identifier.toLowerCase();
  const isEmailLogin = normalizedIdentifier.includes("@");

  // Match by email if the user typed "@", otherwise match by username.
  const found = users.find((user) => {
    const matchId = isEmailLogin
      ? user.email === normalizedIdentifier
      : (user.username || "").toLowerCase() === normalizedIdentifier;
    return matchId && user.password === password;
  });

  if (!found) {
    showError(authError, "Invalid login details. Try again.");
    shakeForm();
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(found));
  console.log(`logged in as ${found.username} at ${found.email}`);
  window.location.href = "store.html";
}

if (form) {
  form.addEventListener("submit", isSignup ? handleSignup : handleLogin);
}
