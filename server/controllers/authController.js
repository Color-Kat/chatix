import { nanoid } from "nanoid";
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import bcrypt from 'bcrypt';
import commonjsVariables from 'commonjs-variables-for-esmodules';
import jwt from "jsonwebtoken";
import { secret } from "../config/jwt_secret.js";
import checkAuth from "../checkAuth.js";
 
const {__dirname,} = commonjsVariables(import.meta);

const adapter = new JSONFile (path.resolve(__dirname, '../db/users.json'));
const db = new Low(adapter);
await db.read();

// Create empty users list if doesn't exist
db.data = db.data?.users ? db.data : { users: [], ...db.data };

// Generate JSW access token for auth
const generateAccessToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, secret, {expiresIn: '96h'});
}

class AuthController {

    /**
     * Register new user by nickname and password from request
     * @return isSuccess or error
     */

    async register(req, res) {
        const { nickname, password } = req.body;

        const users = db.data.users;

        // Empty fields
        if (!nickname || !password) return res.status(400).json({
            error: "Заполните все поля",
            isSuccess: false
        });

        if (users.some(user => (user.nickname === nickname))) return res.status(400).json({
            error: 'Пользователь с таким ником уже существует',
            isSuccess: false
        });

        let hashPassword = await new Promise(resolve => {
            bcrypt.genSalt(10, async function(err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    resolve(hash);
                });
            });
        })

        users.push({
            id: nanoid(8),
            nickname,
            password: hashPassword,
            notifications: {}
        });

        await db.write();

        return res.status(200).json({
            isSuccess: true
        });
    }

    /**
     * Check nickname and password and then login user.
     * @return jwt_token, user or error
     */

    async login(req, res) {
        const { nickname, password } = req.body;

        // Empty fields
        if (!nickname || !password) return res.status(400).json({
            error: "Заполните все поля",
            isSuccess: false
        });

        // Get user by nickname
        const user = db.data.users.find(user => user.nickname == nickname);

        if (!user) return res.status(404).json({
            error: "Такого пользователя не существует",
            isSuccess: false
        });

        // Wrong password
        if (!(await bcrypt.compare(password, user.password))) return res.status(400).json({
            error: "Введён неправильный пароль",
            isSuccess: false
        });

        const token = generateAccessToken(user.id);

        return res.json({
            isSuccess: true,
            payload: {
                jwt_token: token,
                user: user
            }
        });
    }

    /**
     * @return users list
     */

    getUsers(req, res) {
        const users = db.data.users;
        return res.status(200).json(users);
    }

    /**
     * @return userData by authorization JWT token from request
     */

    getUser(req, res) {
        const userId = checkAuth(req).id;

        if (!userId) return res.status(403).json({
            isSuccess: false,
            error: 'Вы не авторизированы'
        });

        const user = db.data.users.find(user => user.id == userId);
        return res.status(200).json({
            isSuccess: true,
            payload: {
                user
            }
        });
    }

    /**
     * Save notification from fromID to db for userId
     * 
     * @param {*} userId notification receiver
     * @param {*} fromId sender of new message
     * @returns 
     */
    
    async newNotification(userId, fromId) {
        const user = db.data.users.find(user => user.id == userId);
        const notifications = user.notifications;
        if (notifications[fromId]) notifications[fromId].count++;
        else notifications[fromId] = {
            fromId,
            count: 1
        }

        user.notifications = notifications;

        await db.write();

        return true;
    }

    /**
     * Return notifications of user
     */

    getNotifications(req, res) {
        const userId = checkAuth(req).id;

        if (!userId) return res.status(403).json({
            isSuccess: false,
            error: 'Вы не авторизированы'
        });

        const user = db.data.users.find(user => user.id == userId);
        return res.status(200).json({
            isSuccess: true,
            payload: user.notifications
        });
    }

    /**
     * Clear notifications of req.body.peerId
     */

    async clearNotifications(req, res) {
        const userId = checkAuth(req).id;
        const peerId = req.body.peerId;

        if (!userId) return res.status(403).json({
            isSuccess: false,
            error: 'Вы не авторизированы'
        });

        const user = db.data.users.find(user => user.id == userId);
        user.notifications[peerId] = undefined;

        await await db.write();

        return res.status(200).json({
            isSuccess: true
        });
    }
}

export default new AuthController();