import express from "express";
import { authToken } from "../../domain/middlewares/authToken";
import { chatroomController, getAllChatrooms } from "../controllers/chatroomController";
import { catchErrors } from "../../domain/middlewares/errorHandler";

export const routerChatroom = express.Router();

routerChatroom.get('/',authToken, catchErrors(getAllChatrooms));
routerChatroom.post('/',authToken, catchErrors(chatroomController));