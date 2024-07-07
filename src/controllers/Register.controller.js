import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { jsonGenerate } from "../utils/helpers.js";
import constants from "../utils/constants.js";
import User from "../models/User.js";
import Jwt from 'jsonwebtoken';

// Retrieve the constants
const { StatusCode, JWT_TOKEN_SECRET } = constants();

const Register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(StatusCode.VALIDATION_ERROR).json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
        }

        const { name, username, password, email } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userExist = await User.findOne({ $or: [{ email: email }, { username: username }] });

        if (userExist) {
            return res.status(StatusCode.UNPROCESSABLE_ENTITY).json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "User or Email already exists"));
        }

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            username: username
        });

        const token = Jwt.sign({ userId: newUser._id }, JWT_TOKEN_SECRET);

        // Return success message along with token
        return res.status(StatusCode.SUCCESS).json({
            message: "Registration successful",
            data: {
                userId: newUser.id,
                token: token
            }
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "An error occurred during registration"));
    }
};

export default Register;
