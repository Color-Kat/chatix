import { nanoid } from "nanoid";
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import bcrypt from 'bcrypt';
import commonjsVariables from 'commonjs-variables-for-esmodules';
import jwt from "jsonwebtoken";
import { secret } from "../config/jwt_secret.js";
import messageController from "./messageController.js";
import checkAuth from "../checkAuth.js";
import AuthController from "./AuthController.js";
 
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

        socket.on('connect_user', (data) => this.connectUser(data));
        socket.on('messages_of', (data) => this.getMessagesOf(data));
        socket.on('send_message', (data) => this.sendMessage(data));
        socket.on('disconnect', () => this.disconnect());
    }

    connectUser(data) {
        // Get userId of sender
        const userId = checkAuth(data.authorization_token).id;
        if (!userId) { return; }

        // Join user to room by userId
        this.socket.join(userId);
    }

    async getMessagesOf(data) {
        const userId = checkAuth(data.authorization_token).id;
        const peerId = data.peerId;

        console.log(userId, peerId);

        if (!userId || !peerId) { return; }

        const result = messageController.getMessages(userId, peerId);

        this.io.to(userId).emit('messages_of', result);
    }

    async sendMessage(data) {
        // Get userId of sender
        const userId = checkAuth(data.authorization_token).id;
        if (!userId) { return; }

        const result = await messageController.addMessage(data); // Add message to db
        this.io.to(userId).to(data.to).emit('send_message', result); // Send message to client to userId

        this.io.to(data.to).emit('new_notification', {
            isSuccess: AuthController.newNotification(data.to, userId),
            payload: {peerId: userId}
        }); // Send new message notification
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