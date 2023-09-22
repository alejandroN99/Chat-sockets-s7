import express from "express";
// import { authToken } from "../../domain/middlewares/authToken";
import { chatroomController, getAllChatrooms } from "../controllers/chatroomController";
import { catchErrors } from "../../domain/middlewares/errorHandler";

export const routerChatroom = express.Router();

routerChatroom.get('/', catchErrors(getAllChatrooms));
routerChatroom.post('/', catchErrors(chatroomController));