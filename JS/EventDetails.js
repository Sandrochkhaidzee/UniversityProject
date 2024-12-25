function getEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('eventName');
    const eventDate = urlParams.get('eventDate');
    const eventDescription = JSON.parse(urlParams.get('eventDescription'));
    const location = urlParams.get('location');
    const picture = urlParams.get('picture');

    document.getElementById('event-name').textContent = eventName;
    document.getElementById('event-date').textContent = `${formatEventDate(eventDate)}`;
    document.getElementById('event-location').textContent = `${location}`;
    document.getElementById('event-image').src = picture;
    const descriptionContainer = document.getElementById('event-description');
    descriptionContainer.innerHTML = '';

    eventDescription.forEach(section => {
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = section.section;
        descriptionContainer.appendChild(sectionTitle);

        const sectionText = document.createElement('p');
        sectionText.textContent = section.text;
        descriptionContainer.appendChild(sectionText);
    });
}

function formatEventDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

window.onload = getEventDetails;
