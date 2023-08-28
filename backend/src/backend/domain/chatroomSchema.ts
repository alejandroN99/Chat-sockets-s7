import {Schema, model} from "mongoose";

//Schema mongoose 
const ChatroomSchema = new Schema({
    name: {
        type: String,
        require: 'Chatroom is required!'
    }
});

//Model mongoose
export const ChatroomModel = model('Chatroom', ChatroomSchema);