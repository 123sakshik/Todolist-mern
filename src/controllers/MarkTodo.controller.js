import Todo from "../models/Todo";
import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js"; // Assuming jsonGenerate function is defined in helpers.js
import { StatusCode } from "../utils/constants.js"; // Assuming StatusCode is defined correctly in constants.js

export const MarkTodo = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(StatusCode.VALIDATION_ERROR).json({
            success: false,
            message: "Validation error",
            errors: errors.array()
        });
    }

    try {
        const { todoId, userId } = req.body; // Assuming todoId and userId are sent in the request body

        const todo = await Todo.findOneAndUpdate(
            {
                _id: todoId,
                userId: userId
            },
            {
                $set: {
                    isCompleted: true // Assuming you want to mark the todo as completed
                }
            },
            { new: true } // Return the updated todo after the update operation
        );

        if (todo) {
            return res.json({
                success: true,
                message: "Todo updated successfully",
                todo: todo
            });
        } else {
            return res.status(StatusCode.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: "Could not update todo"
            });
        }
    } catch (error) {
        console.error("Error updating todo:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while updating todo"
        });
    }
};
