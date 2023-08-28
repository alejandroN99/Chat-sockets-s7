import express from "express";
import { authToken } from "../../domain/middlewares/authToken";
import { chatroomController } from "../controllers/chatroomController";
import { catchErrors } from "../../domain/middlewares/errorHandler";

export const routerChatroom = express.Router();

routerChatroom.post('/create', authToken, catchErrors(chatroomController));