/**
 * That's the same 'socket' we already have on the server
 * when the connection comes in. This is going to allow us to
 * send events and receive events from both server and the client.
 */
const socket = io();

socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count);
});

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked!');
    socket.emit('increment');
});