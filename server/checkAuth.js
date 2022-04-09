import jwt from "jsonwebtoken";
import { secret } from "./config/jwt_secret.js";

export default function (auth_variable) {
    let token = '';
    // Get bearer access token (JWT) from headers or
    if (typeof auth_variable == 'string') token = auth_variable;
    else token = auth_variable?.headers.authorization.split(' ')[1];

    try {
        if (!token) return false;

        // Get decoded data from jwt token
        const decodedData = jwt.verify(token, secret);
        return {
            id: decodedData.id
        }
    } catch (error) {
        console.log(error);
        return false
    }
}