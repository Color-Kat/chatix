import { nanoid } from "nanoid";
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import bcrypt from 'bcrypt';
import commonjsVariables from 'commonjs-variables-for-esmodules';
import jwt from "jsonwebtoken";
import { secret } from "../config/jwt_secret.js";
import messageController from "./messageController.js";
import checkAuth from "../checkAuth.js";
 
const {__dirname,} = commonjsVariables(import.meta);

const adapter = new JSONFile (path.resolve(__dirname, '../db/messages.json'));
const db = new Low(adapter);
await db.read();

// Create empty messages list if doesn't exist
db.data = db.data?.messages ? db.data : { messages: [], ...db.data };


class WebSocketController {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;

        socket.on('messages', (data) => this.getMessages(data));
        socket.on('chat_message', (data) => this.chatMessage(data));
        socket.on('disconnect', () => this.disconnect());
        
    }

    async getMessages(data) {
        const userId = checkAuth(data.authorization_token).id;
        const peerId = data.peerId;

        if (!userId || !peerId) { return; }

        const result = messageController.getMessages(userId, peerId);

        this.io.emit('messages', result);
    }

    chatMessage(data) {
        // Get userId of sender
        const userId = checkAuth(data.authorization_token).id;
        if (!userId) { return; }
        console.log('- New message from: ' + userId + '\n- To: ' + data.to + '\n- Message: ' + data.message);

        // Join user to room by userId
        this.socket.join(userId);

        messageController.addMessage(data); // Add message to db
        this.io.to(data.to).emit('chat_message', data); // Send message to client to userId
    }

    

    disconnect() { console.log('User disconnected'); }
}

function chat(io) {
    io.on('connection', socket => {
        console.log('User connected');

        new WebSocketController(io, socket);
    })
}

export default chat;