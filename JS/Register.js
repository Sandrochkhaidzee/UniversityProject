document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    displayError("შეავსეთ ყველა ველი!");
    return;
  }

  if (!validateLetters(firstName) || !validateLetters(lastName)) {
    displayError("სახელი და გვარი უნდა იყოს ასოები.");
    return;
  }

  if (password !== confirmPassword) {
    displayError("პაროლები არ ემთხვევა!");
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
    alert("წარმატებით დარეგისტრირდი!");
  })
  .catch((error) => {
    console.error('Error:', error);
    displayError("An error occurred while submitting the form.");
  });
}
