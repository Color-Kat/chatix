import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import cors from 'cors';
import authController from "./controllers/authController.js";
import checkAuth from './checkAuth.js';
import messageController from './controllers/messageController.js';
import chat from './controllers/webSocketController.js';

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
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

app.post('/user', authController.getAuthUser);

app.post('/user/:requestedField', authController.getUserByNickname);

app.post('/notifications', authController.getNotifications);

app.post('/clear-notifications', authController.clearNotifications);

app.post('/add-to-chats', authController.addToMyChat);

app.post('/remove-from-chats', authController.removeFromMyChat);

app.post('/my-chats', authController.getMyChats);

chat(io);

httpServer.listen(4000, function () {
    console.log('Listening on port 4000');
})