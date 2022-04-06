import { nanoid } from "nanoid";
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import bcrypt from 'bcrypt';
import commonjsVariables from 'commonjs-variables-for-esmodules';
import jwt from "jsonwebtoken";
import { secret } from "../config/jwt_secret.js";
import messageController from "./messageController.js";
 
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

        socket.on('createRoom', () => messageController.createRoom());
        socket.on('getMessages', () => messageController.getMessages());
        socket.on('message', (value) => this.handleMessage(value));
        socket.on('disconnect', () => this.disconnect());
    }

    

    disconnect() {
        // users.delete(this.socket);
    }
}

function chat(io) {
    io.on('connection', socket => {
        new WebSocketController(io, socket);
    })
}

export default chat;