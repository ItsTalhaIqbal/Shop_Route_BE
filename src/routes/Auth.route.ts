import { Router } from "express";
import { login, register, tokenAuth } from '../controllers/Auth.controller';
import { RegisterMiddleware } from "../middlewares/auth/register/Register.Middlweare";
import { LoginMiddleware } from "../middlewares/auth/login/Login.middleware";
const AuthRoute = Router();

AuthRoute.post("/register",RegisterMiddleware, register);
AuthRoute.post("/login",LoginMiddleware, login);
AuthRoute.post("/auth", tokenAuth);

export {AuthRoute};
