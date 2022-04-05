import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import AuthController from "./AuthController.js";
import checkAuth from './checkAuth.js';

const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const io = new Server(httpServer, {
    cors: {origin: '*'}
});

app.get('/', (req, res) => {
    res.send('123');
})

app.post('/register', AuthController.register);

app.post('/login', AuthController.login);

app.post('/users', AuthController.getUsers);

io.on('connection', async socket => {
    console.log('User connected');
    // console.log(await auth().register('ColorTest', '123'));
    // console.log(await auth().login('ColorTest', '1231'));

    socket.on('chat_message', (data) => {
        console.log(checkAuth(data.authorization_token));

        io.emit('chat_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

httpServer.listen(4000, function () {
    console.log('Listening on port 4000');
})