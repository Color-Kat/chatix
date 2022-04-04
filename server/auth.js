const { nanoid } = require('nanoid'); // Generate unique id
const low = require('lowdb'); // Siple json database
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db/messages.json');
const db = low(adapter);
const bcrypt = require('bcrypt');

// interface IUser{
//     id: number;
//     nickname: string,
//     password: string;
// }

const auth = () => {


    const register = (nickname, password) => {
        const users = db.get('users');
        if (users.some(user => (user.nickname == nickname))) return {
            error: 'Пользователь с таким ником уже существует',
            isSuccess: false
        };

        const salt = bcrypt.getSaltSync(10); // Generate salt for bcrypt password

        // Inset new user into db
        db.get('users').push({
            id: nanoid(8),
            nickname,
            password: bcrypt.hashSync(password, salt)
        }).write(); 

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

module.exports = auth;

