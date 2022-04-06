import { nanoid } from "nanoid";
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import bcrypt from 'bcrypt';
import commonjsVariables from 'commonjs-variables-for-esmodules';
import jwt from "jsonwebtoken";
import { secret } from "../config/jwt_secret.js";
 
const {__dirname,} = commonjsVariables(import.meta);

const adapter = new JSONFile (path.resolve(__dirname, '../db/messages.json'));
const db = new Low(adapter);
await db.read();

// Create empty messages list if doesn't exist
db.data = db.data?.messages ? db.data : { messages: [], ...db.data };


class MessageController {
    async addMessage({ message, authorization_token }) {
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

        messages.push({
            id: nanoid(8),
            message,
            createdAt: Date.now()
        });

        await db.write();

        return {
            isSuccess: true,
            payload: message
        }
    }
    
    async getMessages() {
        const messages = db.data.messages;
        return {
            isSuccess: true,
            payload: {messages}
        }
    }
}

export default new MessageController();