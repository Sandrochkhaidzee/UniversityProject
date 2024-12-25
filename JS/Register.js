document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    displayError("All fields are required!");
    return;
  }

  if (!validateLetters(firstName) || !validateLetters(lastName)) {
    displayError("First and last names can only contain letters.");
    return;
  }

  if (password !== confirmPassword) {
    displayError("Passwords do not match!");
    return;
  }

  const formDataJson = generateJson(firstName, lastName, email, password);
  console.log(JSON.stringify(formDataJson));

  // submitToAPI(formDataJson);

  document.getElementById('register-form').reset();
});

function displayError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);
}

function validateLetters(name) {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(name);
}

function generateJson(firstName, lastName, email, password) {
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  };
}

function submitToAPI(data) {
  const apiUrl = '';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .then(data => {
    console.log('Success:', data);
    alert("You have successfully registered!");
  })
  .catch((error) => {
    console.error('Error:', error);
    displayError("An error occurred while submitting the form.");
  });
}
