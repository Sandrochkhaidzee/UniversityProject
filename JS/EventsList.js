let currentPage = 1;
const eventsPerPage = 8;
let allEvents = [];

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = sessionStorage.getItem("loggedIn");
    
    if (!isLoggedIn) {
        window.location.href = "Login.html";
    }
});

document.getElementById('eventsButton').addEventListener('click', function() {
    window.location.href = 'EventsList.html';
});

document.getElementById('contactButton').addEventListener('click', function() {
    window.location.href = 'ContactUs.html';
});

function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');

    const eventImageContainer = document.createElement('div');
    eventImageContainer.classList.add('event-image-container');
    const eventImage = document.createElement('img');
    eventImage.src = event.picture;
    eventImage.alt = `${event.eventName} Image`;
    eventImage.classList.add('event-image');
    eventImageContainer.appendChild(eventImage);

    const eventDate = document.createElement('div');
    eventDate.classList.add('event-date');
    eventDate.textContent = formatEventDate(event.eventDate);

    const eventTitle = document.createElement('h2');
    eventTitle.classList.add('event-title');
    eventTitle.textContent = event.eventName;

    const eventLocation = document.createElement('p');
    eventLocation.classList.add('event-location');
    eventLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i>${event.location}`;

    eventCard.addEventListener('click', () => {
        const eventDetailsUrl = `EventDetails.html?eventId=${encodeURIComponent(event.id)}`;
        window.location.href = eventDetailsUrl;
    });

    eventCard.appendChild(eventImageContainer);
    eventCard.appendChild(eventDate);
    eventCard.appendChild(eventTitle);
    eventCard.appendChild(eventLocation);

    return eventCard;
}

function displayEvents(pageNumber) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';

    const startIndex = (pageNumber - 1) * eventsPerPage;
    const endIndex = pageNumber * eventsPerPage;
    const eventsToDisplay = allEvents.slice(startIndex, endIndex);

    eventsToDisplay.forEach(event => {
        const eventCard = createEventCard(event);
        eventsContainer.appendChild(eventCard);
    });
}

function createPages(totalEvents) {
    const totalPages = Math.ceil(totalEvents / eventsPerPage);
    const pagesContainer = document.getElementById('pagesJ');
    pagesContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayEvents(currentPage);
        });
        pagesContainer.appendChild(pageButton);
    }
}

function formatEventDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

function loadEvents() {
    fetch('API/Events.json')
        .then(response => response.json())
        .then(data => {
            allEvents = data;
            const totalEvents = allEvents.length;
            displayEvents(currentPage);
            createPages(totalEvents);
        })
        .catch(error => {
            console.error('Error loading event data:', error);
        });
}

window.onload = loadEvents;
