import { fetchAndPrintDocuments } from "./printDocuments.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const usernameValue = usernameInput.value;
  const passwordValue = passwordInput.value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameValue,
      password: passwordValue,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data.message);

        fetchAndPrintDocuments();
        document.getElementById("documentsContainer").style.display = "block";
        document.getElementById("loginContainer").style.display = "none"; // Hide the login form
      } else {
        // Login failed
        console.log(data.message);
      }
    })
    .catch((error) => console.error(error));
});
