import { nanoid } from "nanoid";
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import bcrypt from 'bcrypt';
import commonjsVariables from 'commonjs-variables-for-esmodules';
import jwt from "jsonwebtoken";
import { secret } from "../config/jwt_secret.js";
import checkAuth from "../checkAuth.js";
 
const {__dirname,} = commonjsVariables(import.meta);

const adapter = new JSONFile (path.resolve(__dirname, '../db/messages.json'));
const db = new Low(adapter);
await db.read();

// Create empty messages list if doesn't exist
db.data = db.data?.messages ? db.data : { messages: [], ...db.data };


class MessageController {
    async addMessage({ to, message, authorization_token }) {
        const userId = checkAuth(authorization_token).id;
        const messages = db.data.messages;

        // Empty fields
        if (!userId) return {
            isSuccess: false,
            error: "Вы не авторизированы"
        }
        if (!message) return {
            isSuccess: false,
            error: "Пустое сообщение"
        }

        const newMessage = {
            id: nanoid(8),
            message,
            from: userId,
            to,
            createdAt: Date.now()
        }

        messages.push(newMessage);

        await db.write();

        return {
            isSuccess: true,
            payload: newMessage
        }
    }
    
    getMessages(userId, peerId) {
        if (!userId || !peerId) return [];

        // Get message only for current user and peer user
        const messages = db.data.messages.filter(message => {
            return (
                (message.to == peerId && message.from == userId) || 
                (message.to == userId && message.from == peerId)
            );
        });

        return {
            isSuccess: true,
            payload: {messages, peerId}
        }
    }

    getLastMessage(userId, peerId) {
        if (!userId || !peerId) return [];

        let isFound = false;
        const lastMessage = db.data.messages.reverse().filter(message => {
            if (
                !isFound &&
                ((message.to == peerId && message.from == userId) ||
                (message.to == userId && message.from == peerId))
            ) {
                isFound = true;
                return true;
            } else return false;
        })[0];

        return {
            isSuccess: true,
            payload: {lastMessage}
        }
    }
}

export default new MessageController();