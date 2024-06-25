const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configura il middleware e le route di Express
// ...

// Gestisci le connessioni Socket.io
io.on('connection', (socket) => {
    console.log('Nuova connessione socket: ', socket.id);

    // Gestisci gli eventi Socket.io qui
    socket.on('increaseValue', () => {
        // Logica per aumentare il valore
        initialValue1++;

        // Emetti l'aggiornamento a tutti i client connessi
        io.emit('updateValues', {
            initialValue1: initialValue1,
            initialValue2: initialValue2,
            initialValue3: initialValue3,
            initialValue4: initialValue4
        });
    });

    socket.on('decreaseValue', () => {
        // Logica per diminuire il valore
        initialValue1--;

        // Emetti l'aggiornamento a tutti i client connessi
        io.emit('updateValues', {
            initialValue1: initialValue1,
            initialValue2: initialValue2,
            initialValue3: initialValue3,
            initialValue4: initialValue4
        });
    });

    // Altri gestori di eventi Socket.io necessari
});

// Avvio del server Express
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
