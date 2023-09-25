
import { UserModel, IUser } from "../../domain/userSchema";
import { CustomSocket } from "../../domain/interfaces/customSocket";
import { MessageModel } from "../../domain/messageSchema";
import { Server } from "../../infrastructure/server";

export const socketController = (socket: CustomSocket , io: Server["io"]) => {
  console.log("user connected!:"+" "+ socket.userId);

  socket.on("get_users", async ({}) => {
    const users = await UserModel.find({}, (err: Error, users: IUser) => {
      if (err) throw err;
        socket.emit("users", users);
    });
  });

  socket.on("chatroomMessage", async({chatroomId,message}) => {
    if(message.trim().length > 0){
      const user = await UserModel.findOne({_id:socket.userId});
      
      if(user){
        const newMessage = new MessageModel({
          chatroom: chatroomId,
          user: socket.userId,
          message
        });

        console.log("Received chatroomMessage:", message, chatroomId);

        const sendMessage = {
          message,
          name: user.username,
          userId: socket.userId
        }
       
        
        io.to(chatroomId).emit("newMessage", sendMessage );

        await newMessage.save();
      
      }

    }
  })

  socket.on('joinChatroom', async ({chatroomId}) => {
    socket.join(chatroomId);
    console.log(`A user joined chatroom: ${chatroomId}`);

    const users = await UserModel.find({});

    io.to(chatroomId).emit("users", users);
  });
  

  socket.on('leaveChatroom', ({chatroomId}) => {
    socket.leave(chatroomId);
    console.log(`A user leaved chatroom: ${chatroomId}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected!:"+" "+socket.userId);
  });
};
