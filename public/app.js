// filepath: c:\Users\plcsp\OneDrive - Kuwait University\سطح المكتب\371project\public\app.js

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.getElementById('emailOrPhone').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message); // Show success message
    } else {
      alert(result.message); // Show error message
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});

// Handle create account form submission
document.getElementById('createAccountForm')?.addEventListener('submit', async function (event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/create-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message); // Show success message
      window.location.href = 'index.html'; // Redirect to login page
    } else {
      alert(result.message); // Show error message
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.getElementById('emailOrPhone').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      // Save the username in localStorage to display it on the dashboard
      localStorage.setItem('username', username);
      // Redirect to the dashboard page
      window.location.href = 'dashboard.html';
    } else {
      alert(result.message); // Show error message
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});

// Handle logout functionality
document.getElementById('logoutButton')?.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default link behavior
  console.log('Logout button clicked'); // Debugging log
  // Clear the username from localStorage
  localStorage.removeItem('username');
  // Redirect to the login page
  window.location.href = 'index.html';
});

// Populate the username on the dashboard
if (window.location.pathname.endsWith('dashboard.html')) {
  const username = localStorage.getItem('username');
  if (username) {
    document.getElementById('username').textContent = username;
  } else {
    // If no username is found, redirect to the login page
    window.location.href = 'index.html';
  }
}