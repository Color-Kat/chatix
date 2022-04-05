import express from 'express';
import http from 'http';



const app = express();
const httpServer = http.createServer();
import { Server } from 'socket.io';
// const cors = require('cors');

import auth from "./auth.js";

// const auth = require('./auth.js');
// const auth = import('./auth.js');

// app.use(cors());

const io = new Server(httpServer, {
    cors: {origin: '*'}
});

app.post('/register', function (req, res) {
    console.log(req);
    const result = auth().register("tester", "123");
    res.send(result);
});

io.on('connection', async socket => {
    console.log('User connected');
    // console.log(await auth().register('ColorTest', '123'));
    console.log(await auth().login('ColorTest', '1231'));

    socket.on('chat_message', (data) => {
        console.log(data);
        io.emit('chat_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

httpServer.listen(4000, function () {
    console.log('Listening on port 4000');
})