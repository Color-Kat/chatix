import { nanoid } from "nanoid";
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import bcrypt from 'bcrypt';
import commonjsVariables from 'commonjs-variables-for-esmodules';
import jwt from "jsonwebtoken";
import { secret } from "../config/jwt_secret.js";
import checkAuth from "../checkAuth.js";
import messageController from "./messageController.js";
 
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
            image: 'https://sun9-32.userapi.com/impf/c853428/v853428972/210be5/TEX4SUcRtK8.jpg?size=689x1080&quality=96&sign=9b6e14d8e04ace5ff72332c71015a281&type=album',
            myChatsIds: [],
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

    getAuthUser(req, res) {
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

        let user = db.data.users.find(user => user.id == userId);
        user.notifications[peerId] = null;

        await await db.write();

        return res.status(200).json({
            isSuccess: true
        });
    }

    /**
     * @return userData by user's nickname
     */

    getUserByNickname (req, res) {
        const requestedField = req.params.requestedField;
        const { type } = req.query; // Type of search (by nickname or id)

        const user = db.data.users.find(user => {
            return type === "nickname" ? user.nickname == requestedField : user.id == requestedField;
        });

        if (!user) return res.status(400).json({
            isSuccess: false,
            error: 'Такой пользователь не найден'
        });

        return res.status(200).json({
            isSuccess: true,
            payload: {
                user
            }
        });
    }

    async addToMyChat (req, res) {
        const userId = checkAuth(req).id;
        const peerId = req.body.peerId;

        if (!userId) return res.status(403).json({
            isSuccess: false,
            error: 'Вы не авторизированы'
        });

        const user = db.data.users.find(user => user.id == userId);
        if (!user.myChatsIds.includes(peerId)) user.myChatsIds.push(peerId);

        await await db.write();

        return res.status(200).json({
            isSuccess: true
        });
    }

    async removeFromMyChat (req, res) {
        const userId = checkAuth(req).id;
        const peerId = req.body.peerId;

        if (!userId) return res.status(403).json({
            isSuccess: false,
            error: 'Вы не авторизированы'
        });

        const user = db.data.users.find(user => user.id == userId);

        const index = user.myChatsIds.indexOf(peerId);
        if (index !== -1) user.myChatsIds.splice(index, 1);

        await await db.write();

        return res.status(200).json({
            isSuccess: true
        });
    }

    getMyChats(req, res) {
        const userId = checkAuth(req).id;

        if (!userId) return res.status(403).json({
            isSuccess: false,
            error: 'Вы не авторизированы'
        });

        const user = db.data.users.find(user => user.id == userId);
        const myChatsIds = user.myChatsIds;

        const myChats = [];
        myChatsIds.forEach(chatId => {
            const peerUser = db.data.users.find(user => user.id == chatId);
            const result = messageController.getLastMessage(userId, chatId);

            if (result.isSuccess) {
                myChats.push({
                    chatId,
                    lastMessage: result.payload.lastMessage,
                    peerUser,
                    notifications: user.notifications[chatId]?.count ?? 0
                });
           }
        });
        return res.status(200).json({
            isSuccess: true,
            payload: {
                myChats
            }
        })
    }

    changeAvatar(req, res) {
        const userId = checkAuth(req).id;

        if (!userId) return res.status(403).json({
            isSuccess: false,
            error: 'Вы не авторизированы'
        });

        const user = db.data.users.find(user => user.id == userId);


        req.files.photo.mv('public/pics/'+req.files.photo.name);
        res.end(req.files.photo.name);
      
        return res.status(200).json({
            isSuccess: true,
            payload: {
                avatar: user.image
            }
        })
    }
}

export default new AuthController();