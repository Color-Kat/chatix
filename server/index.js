import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import AuthController from "./AuthController.js";

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

app.post('/register', async function (req, res) {
    const result = await AuthController.register(req, res);
    res.send(result);
});

app.post('/login', async function (req, res) {
    const result = await AuthController.login(req, res);
    res.send(result);
});

io.on('connection', async socket => {
    console.log('User connected');
    // console.log(await auth().register('ColorTest', '123'));
    // console.log(await auth().login('ColorTest', '1231'));

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