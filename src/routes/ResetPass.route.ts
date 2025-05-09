import { Router } from "express";
import { requestPasswordReset, resetPassword } from "../controllers/ResetPass.controller";

const ResetRoute = Router();

ResetRoute.post("/reset", resetPassword);
ResetRoute.post("/requestreset", requestPasswordReset);


export {ResetRoute}