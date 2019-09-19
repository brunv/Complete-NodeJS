/**
 * That's the same 'socket' we already have on the server
 * when the connection comes in. This is going to allow us to
 * send events and receive events from both server and the client.
 */
const socket = io();

socket.on('message', (msg) => {
    console.log(msg);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page refresh

    // const message = document.querySelector('input').value;
    const message = e.target.elements.message.value;

    // The third argument in 'emit()' is the callback for acknowledgement:
    socket.emit('sendMessage', message, (error) => {
        if (error) {
            return console.log(error);
        }

        console.log('Message delivered!');
    });
});

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, () => {
            console.log('Location shared!');
        });
    });
});