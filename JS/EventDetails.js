document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = sessionStorage.getItem("loggedIn");
    
    if (!isLoggedIn) {
        window.location.href = "Login.html";
    }
});

async function getEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('eventId');

    if (!eventId) {
        console.error("Event ID is missing from the URL.");
        return;
    }

    try {
        const response = await fetch('API/Events.json');
        const events = await response.json();

        const event = events.find(event => event.id === eventId);

        if (!event) {
            console.error("Event not found.");
            return;
        }

        console.log(event)

        document.getElementById('event-name').textContent = event.name;
        document.getElementById('event-location').textContent = event.location;
        document.getElementById('event-image').src = event.picture;

        const descriptionContainer = document.getElementById('event-description');
        descriptionContainer.innerHTML = '';

        event.eventDescription.forEach(section => {
            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = section.section;
            descriptionContainer.appendChild(sectionTitle);

            const sectionText = document.createElement('p');
            sectionText.textContent = section.text;
            descriptionContainer.appendChild(sectionText);
        });

        document.getElementById('event-price').textContent = event.price;
        document.getElementById('event-start-time').textContent = event.eventStartTime;
        document.getElementById('quiz-amount').textContent = event.quizzes;
        document.getElementById('event-date').textContent = formatEventDate(event.eventDate);
        document.getElementById('event-topics').textContent = event.topics;
        document.getElementById('total-seat-amount').textContent = event.totalSeats;

        document.querySelector('.floating-event-details').classList.add('show');

    } catch (error) {
        console.error("Error fetching event details:", error);
    }
}

function formatEventDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

window.onload = getEventDetails;
