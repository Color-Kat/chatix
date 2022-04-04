const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');

// import * as auth from "./auth.mjs";
const auth = require('./auth.js');

app.use(cors());

const io = new Server(http, {
    cors: {origin: '*'}
});

app.post('/register', function (req, res) {
    console.log(req);
    const result = auth().register("tester", "123");
    res.send(result);
});

io.on('connection', socket => {
    console.log('User connected');
console.log(auth);

    socket.on('chat_message', (data) => {
        console.log(data);
        io.emit('chat_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(4000, function () {
    console.log('Listening on port 4000');
})