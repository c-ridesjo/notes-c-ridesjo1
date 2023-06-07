const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  const usernameValue = usernameInput.value;
  const passwordValue = passwordInput.value;

fetch("http://localhost:3000/login", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: usernameValue,
    password: passwordValue
  })
})
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    if (data.success) {
      // Login successful
      console.log(data.message);
      // Proceed with the necessary actions after successful login
    } else {
      // Login failed
      console.log(data.message);
      // Handle the failed login scenario
    }
  })
  .catch(error => console.error(error));
})