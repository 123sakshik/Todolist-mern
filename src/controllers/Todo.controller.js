// Todo.controller.js
import Todo from '../models/Todo.js';
import constants from '../utils/constants.js';

const { JWT_TOKEN_SECRET, StatusCode } = constants();
export const createTodo = async (req, res) => {
    // Implement createTodo function
};

export const MarkTodo = async (req, res) => {
    // Implement MarkTodo function
};

export const RemoveTodo = async (req, res) => {
    // Implement RemoveTodo function
};

export const GetTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId }); // Assuming userId is set in the request
        return res.json({ success: true, todos: todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error fetching todos" });
    }
};
