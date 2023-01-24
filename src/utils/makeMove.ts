import {Socket} from "socket.io-client"
import { SocketEmitEvents } from "../shared/SocketEvents"
import { Move } from "../shared/Move"

export const makeMove = (move:Move, socket:Socket) => {
  return new Promise<string>((_, reject)=>{
    socket.emit<SocketEmitEvents>("make move", move);
    socket.on<SocketEmitEvents>("invalid move made", (err)=>{
      reject(err);
    })
    socket.on<SocketEmitEvents>("no user found", errorMessage => {
      console.log(errorMessage, "No user found")
      reject(errorMessage)
    });
  })
}
