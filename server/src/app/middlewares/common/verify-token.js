import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../configs/constants.js';

export const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(401).send({error: true, message: "Token is required"});
    }

    token = token.replace(/^Bearer\s+/, "");

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({error: true, message: "Token is invalid"});
        }
        req.username = decoded.username;
        next();
    });
}