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

        if (users.some(user => (user.nickname == nickname))) return res.status(400).json({
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
            password: hashPassword
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

        if (!user) return res.status(400).json({
            error: "Такого пользователя не существует",
            isSuccess: false
        });

        // Wrong password
        if (!(await bcrypt.compare(password, user.password))) return res.status(400).json({
            error: "Введён неправильный пароль",
            isSuccess: false
        });

        const token = generateAccessToken(user.id);

        return res.status(200).json({
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

    async getUsers(req, res) {
        const users = db.data.users;
        return res.status(200).json(users);
    }

    /**
     * @return userData by authorization JWT token from request
     */

    async getUser(req, res) {
        const userId = checkAuth(req.body.authorization_token).id;
        if (!userId) return res.status(403).json({
            isSuccess: false,
            error: 'Вы не авторизированы'
        });

        const user = db.data.users.find(user => user.id == userId);
        return res.status(200).json(user);
    }
}

export default new AuthController();