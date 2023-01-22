import { Socket } from "socket.io-client"

export const searchRandomPlayerOnline = (socket: Socket, isSearching = true) => {
  
  return new Promise<Game>((resolve, reject)=>{
    socket?.timeout(20_000).emit("searching for player", (err:Error | null, message:Error) => {
      reject(message)
    })
    socket?.on("found player", (gameInfo:Game)=> {
      resolve(gameInfo);
    })
    if(!isSearching){
      reject(new Error("User cancelled search"));
    }
  })
}
