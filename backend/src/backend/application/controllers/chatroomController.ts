import { Request, Response } from "express"
import { ChatroomModel } from "../../domain/chatroomSchema";

export const chatroomController = async (req: Request,res: Response) => {
    const { name } = req.body;

    const chatroomExist = await ChatroomModel.findOne({name});

    if(chatroomExist){
        res.status(401).json({
            msg: 'Chatroom with that name already exist!'
        });
    }

    const chatroom = new ChatroomModel({
        name
    });

    await chatroom.save();

    res.status(200).json({
        msg: `Chatroom ${name} created successfuly!`
    });
};

export const getAllChatrooms = async (_req: Request, res: Response) => {
    const allChatrooms = await ChatroomModel.find({});

    res.json(allChatrooms);
}