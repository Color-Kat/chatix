import jwt from "jsonwebtoken";
import { secret } from "./config/jwt_secret.js";

export default function (token) {
    try {

        // const token = bearerToken.split(' ')[1]; 

        // Get bearer access token (JWT) from headers
        if (!token) return false;

        const decodedData = jwt.verify(token, secret);
        return {
            id: decodedData.id
        }
        
    } catch (error) {
        console.log(error);
        return false
    }
}