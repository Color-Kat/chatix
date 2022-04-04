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

        console.log(users);

        if (users.some(user => (user.nickname == nickname))) return {
            error: 'Пользователь с таким ником уже существует',
            isSuccess: false
        };

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt,async  function(err, hash) {
                users.push({
                    id: nanoid(8),
                    nickname,
                    password: hash
                });

                await db.write();
                console.log(123);
            });
        });
        console.log(123);


        return {
            isSuccess: true
        }
    }

    const login = (nickname, password) => {
        // Get user by nickname
        const user = db.get('users').find(user => user.nickname == nickname);

        // Wrong password
        if (!bcrypt.compare(password, user.password)) return {
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
