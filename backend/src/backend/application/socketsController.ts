import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { UserModel, IUser } from "../domain/userSchema";

export const socketController = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
  console.log("user coneccted!");

  socket.on("get_users", async () => {
    const users = await UserModel.find({}, (err: Error, users: IUser) => {
      if (err) throw err;
        socket.emit("users", users);
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected!");
  });
};
