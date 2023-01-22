import { SocketEmitEvents } from "../shared/SocketEvents";
import { User } from "../shared/User";
import { Socket } from "socket.io-client";

export const updateUserData = (data: User, socket:Socket) => {
  return new Promise<User>((resolve) => {
    socket?.emit<SocketEmitEvents>("update user", data, (userData: User) => {
      resolve(userData);
    });
  });
};
