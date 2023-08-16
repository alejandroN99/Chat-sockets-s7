import {Schema, model} from "mongoose";
import { UserModel } from "./userSchema";
import { ChatroomModel } from "./chatroomSchema";

//Schema mongoose 
const MessageSchema = new Schema({
    chatroom: {
        type: Schema.Types.ObjectId,
        require: 'Chatroom is required!',
        ref: ChatroomModel
    },
    user: {
        type: Schema.Types.ObjectId,
        require: 'Username is required!',
        ref: UserModel
    },
    message: {
        type: String,
        require: 'Message is required!'
    }
});

//Model mongoose
export const MessageModel = model('Message', MessageSchema);