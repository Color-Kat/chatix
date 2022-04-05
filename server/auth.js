import { nanoid } from "nanoid";
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import bcrypt from 'bcrypt';
import commonjsVariables from 'commonjs-variables-for-esmodules';
 
const {__dirname,} = commonjsVariables(import.meta);

const adapter = new JSONFile (path.resolve(__dirname, 'db/messages.json'));
const db = new Low(adapter);

await db.read();

db.data = db.users ? db.data : { users: [], ...db.data };

export default () => {
    const register = async (nickname, password) => {
        const users = db.data.users;

        if (users.some(user => (user.nickname == nickname))) return {
            error: 'Пользователь с таким ником уже существует',
            isSuccess: false
        };

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

        return {
            isSuccess: true
        }
    }

    const login = async (nickname, password) => {
        // Get user by nickname
        const user = db.data.users.find(user => user.nickname == nickname);

        // Wrong password
        if (!(await bcrypt.compare(password, user.password))) return {
            error: "Введён неправильный пароль",
            isSuccess: false
        }

        return {
            isSuccess: true,
            payload: user
        }
    }

    return {
        register,
        login
    }
}
