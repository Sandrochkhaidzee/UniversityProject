function getEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('eventName');
    const eventDate = urlParams.get('eventDate');
    const eventDescription = JSON.parse(urlParams.get('eventDescription'));
    const location = urlParams.get('location');
    const picture = urlParams.get('picture');
    
    const eventPrice = urlParams.get('eventPrice');
    const eventStartTime = urlParams.get('eventStartTime');
    const quizAmount = urlParams.get('quizAmount');
    const topicsAmount = urlParams.get('topicsAmount');
    const seatsAmount = urlParams.get('seatsAmount');

    document.getElementById('event-name').textContent = eventName;
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

    document.getElementById('event-price').textContent = eventPrice;
    document.getElementById('event-start-time').textContent = eventStartTime;
    document.getElementById('quiz-amount').textContent = quizAmount;
    document.getElementById('event-date').textContent = `${formatEventDate(eventDate)}`;
    document.getElementById('event-topics').textContent = topicsAmount;
    document.getElementById('total-seat-amount').textContent = seatsAmount;

    document.querySelector('.floating-event-details').classList.add('show');
}

function formatEventDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

window.onload = getEventDetails;
