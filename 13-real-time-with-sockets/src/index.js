const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
// Express library already does that under the hood. We created it for the
// explicit purpose of being able to pass it to 'socketio()':
const server = http.createServer(app);
// We're doing this because socketio() expects to be called with the raw HTTP server:
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // Here we are emitting the event to a particular connection:
    socket.emit('message', 'Welcome!');

    // When we broadcast an event we send it to everyone except the current client:
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message) => {
        // We want to emit it to every connection available:
        io.emit('message', message);
    });

    socket.on('sendLocation', (location) => {
        io.emit('message', `https://google.com/maps?q=${location.lat},${location.long}`);
    });

    // There's no 'io.on()' for listening to disconect:
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!');
    });
});

server.listen(port, () => console.log(`Server up and running on port ${port}.`));