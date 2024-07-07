import express from "express";
import { validationResult, check } from "express-validator";
import { RegisterSchema } from "../validationSchema/Registerschema.js";
import Register from "../controllers/Register.controller.js";
import Login from "../controllers/Login.controller.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { createTodo, MarkTodo, RemoveTodo, GetTodos } from "../controllers/Todo.controller.js";

const apiRoute = express.Router();
const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/login", LoginSchema, Login);

apiProtected.post(
    "/createTodo",
    [check("desc", "Todo desc is required").exists()],
    createTodo
);

apiProtected.post(
    "/marktodo",
    [check("todo_id", "Todo id is required").exists()],
    MarkTodo
);

apiProtected.post(
    "/deleteTodo",
    [check("todo_id", "Todo id is required").exists()],
    RemoveTodo
);

apiProtected.get("/todolist", GetTodos);

export { apiRoute, apiProtected };
