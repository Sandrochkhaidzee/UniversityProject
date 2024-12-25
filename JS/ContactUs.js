document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const website = document.getElementById('website').value.trim();
    const message = document.getElementById('message').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (!name || !email || !website || !message) {
        displayError("შეავსეთ ყველა ველი!");
        return;
    }

    if (!validateName(name)) {
        displayError("სახელი უნდა იყოს ასოები და შემდეგი ფორმატით 'სახელი გვარი'!");
        return;
    }

    if (!validateURL(website)) {
        displayError("შეიყვანეთ სწორი ვებ-საიტის URL!");
        return;
    }

    const formDataJson = generateJson(name, email, website, message);
    console.log(JSON.stringify(formDataJson));
    
    // submitToAPI(formDataJson);

    document.getElementById('contact-form').reset();
});

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

function generateJson(name, email, website, message) {
    return {
        name: name,
        email: email,
        website: website,
        message: message
    };
}

function validateName(name) {
    return /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);
}

function validateURL(url) {
    const re = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    return re.test(url);
}

function submitToAPI(data) {
    const apiUrl = ''; // API

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert("მესიჯი წარმატებით გაეგზავნა!");
    })
    .catch((error) => {
        console.error('Error:', error);
        displayError("An error occurred while submitting the form.");
    });
}
