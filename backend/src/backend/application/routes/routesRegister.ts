import express from "express";
import { loginController, registerController, googleController } from "../controllers/registerController";
import { catchErrors } from "../../domain/middlewares/errorHandler";

export const routerRegister = express.Router();

routerRegister.post('/register', catchErrors(registerController));

routerRegister.post('/login', catchErrors(loginController));

routerRegister.post('/google', catchErrors(googleController))