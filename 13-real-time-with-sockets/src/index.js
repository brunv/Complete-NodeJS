const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');

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
    // socket.emit('message', generateMessage('Welcome!'));

    // When we broadcast an event we send it to everyone except the current client:
    // socket.broadcast.emit('message', generateMessage('A new user has joined!'));

    socket.on('join', ({ username, room }) => {
        socket.join(room);

        socket.emit('message', generateMessage('Welcome!'));

        // Emits an event to everybody in a specific room:
        // io.to().emit();

        // Send an event to everyone except for the specific client also limited to a specific room:
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`));
    });

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        // We want to emit it to every connection available:
        io.emit('message', generateMessage(message));

        // Callback from acknowledgement:
        callback('Delivered.');
    });

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${location.lat},${location.long}`));

        callback();
    });

    // There's no 'io.on()' for listening to disconect:
    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'));
    });
});

server.listen(port, () => console.log(`Server up and running on port ${port}.`));