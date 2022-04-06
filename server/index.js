import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import authController from "./controllers/authController.js";
import checkAuth from './checkAuth.js';
import messageController from './controllers/messageController.js';

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

app.post('/register', authController.register);

app.post('/login', authController.login);

app.post('/users', authController.getUsers);

io.on('connection', async socket => {
    console.log('User connected');
    // console.log(await auth().register('ColorTest', '123'));
    // console.log(await auth().login('ColorTest', '1231'));

    socket.on('chat_message', (data) => {
        // const userId = checkAuth(data.authorization_token).id;
        // if (!userId) {
        //     io.emit('error', "Вы не авторизованы");
        //     return;
        // }

        messageController.addMessage(data);

        io.emit('chat_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

httpServer.listen(4000, function () {
    console.log('Listening on port 4000');
})