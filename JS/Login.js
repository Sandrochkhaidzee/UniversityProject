document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  if (!email || !password) {
    displayError("Please fill out all fields.");
    return;
  }

  const loginData = generateLoginJson(email, password);

  fetch('https://sandrochkhaidzee.github.io/OnlineCourseWebsiteProject/API/Students.json')
    .then(response => response.json())
    .then(students => {
      const student = students.find(student => student.Email === loginData.email && student.Password === loginData.password);

      if (student) {
        console.log("Login successful!");
        alert("Welcome back!");
        
        document.getElementById('login-form').reset();
      } else {
        displayError("Incorrect email or password.");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      displayError("An error occurred while logging in.");
    });
});

function displayError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);
}

function generateLoginJson(email, password) {
  const jsonData = {
    email: email,
    password: password
  };

  return jsonData;
}
