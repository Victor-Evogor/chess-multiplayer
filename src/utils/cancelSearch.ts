import { Socket } from "socket.io-client"
import { SocketEmitEvents } from "../shared/SocketEvents"

export const cancelSearch = (socket:Socket) => {
  socket.emit<SocketEmitEvents>("cancel search");
}
