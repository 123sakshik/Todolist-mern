import express from "express";
import Register from "../controllers/Register.controller";
const apiRoute =express.Router();


apiRoute.post('/register',Register);

apiRoute.post('/login',login);
export default apiRoute;