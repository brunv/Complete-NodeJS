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

let count = 0;

/**
 * What is happening?
 * server (emit) -> client (receive) -> countUpdated
 * client (emit) -> server (receive) -> increment
 */

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // send event from server:
    socket.emit('countUpdated', count);

    socket.on('increment', () => {
        count++;

        // Here we are emitting the event to a particular connection:
        // socket.emit('countUpdated', count);

        // We want to emit it to every connection available:
        io.emit('countUpdated', count);
    });
});

server.listen(port, () => console.log(`Server up and running on port ${port}.`));