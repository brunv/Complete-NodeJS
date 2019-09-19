/**
 * That's the same 'socket' we already have on the server
 * when the connection comes in. This is going to allow us to
 * send events and receive events from both server and the client.
 */
const socket = io();

/** Elements: **/
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

/** Templates: **/
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

socket.on('message', (msg) => {
    console.log(msg);

    const html = Mustache.render(messageTemplate, {
        message: msg.text,
        createdAt: moment(msg.createdAt).format('h:mm a')
    });

    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (url) => {
    console.log(url);

    const html = Mustache.render(locationTemplate, {
        location: url.url,
        createdAt: moment(url.createdAt).format('h:mm a')
    });

    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page refresh

    // Disable button:
    $messageFormButton.setAttribute('disabled', 'disabled');

    // const message = document.querySelector('input').value;
    const message = e.target.elements.message.value;

    // The third argument in 'emit()' is the callback for acknowledgement:
    socket.emit('sendMessage', message, (error) => {
        // Enable button:
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (error) {
            return console.log(error);
        }

        console.log('Message delivered!');
    });
});

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!');
    }

    // Disable button:
    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, () => {
            console.log('Location shared!');
        });
    });

    // Reanable button:
    $sendLocationButton.removeAttribute('disabled');
});