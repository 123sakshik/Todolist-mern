import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import constants from "../utils/constants.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

// Retrieve the constants
const { JWT_TOKEN_SECRET, StatusCode } = constants();

const Login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCode.VALIDATION_ERROR).json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
        }

        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Username or password is incorrect"));
        }

        const verified = bcrypt.compareSync(password, user.password);

        if (!verified) {
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Username or password is incorrect"));
        }

        const token = Jwt.sign({ userId: user._id }, JWT_TOKEN_SECRET);

        return res.json(jsonGenerate(StatusCode.SUCCESS, "Login successful", { userId: user._id, token: token }));

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "An error occurred during login"));
    }
};

export default Login;
