import constants from '../utils/constants.js';
import { jsonGenerate } from '../utils/helpers.js';
import Jwt from 'jsonwebtoken';

const { JWT_TOKEN_SECRET, StatusCode } = constants();

const AuthMiddleware = (req, res, next) => {
    console.log('AuthMiddleware invoked');

    if (!req.headers["auth"]) {
        console.log('No auth header found');
        return res.status(StatusCode.VALIDATION_ERROR).json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Access Denied"));
    }

    const token = req.headers['auth'];
    console.log('Token received:', token);

    try {
        const decoded = Jwt.verify(token, JWT_TOKEN_SECRET);
        console.log('Token decoded:', decoded);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(StatusCode.UNPROCESSABLE_ENTITY).json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid Token"));
    }
};

export default AuthMiddleware;
