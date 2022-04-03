const app = require('express')();

const http = require('http').createServer(app);
const path = require('path');
const { Server } = require('socket.io');

const cors = require('cors');
app.use(cors())

const io = new Server(http, {
    cors: {origin: '*'}
});

// app.get('/', function(req, res){
//     res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
// });

io.on('connection', socket => {
    console.log('User connected');
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