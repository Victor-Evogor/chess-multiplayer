import { Socket } from "socket.io-client";
import { SocketEmitEvents } from "../shared/SocketEvents";


export const challengeOpponentWithId = (socket:Socket, id:string) => new Promise<{response:boolean, game:Game}>((resolve, reject)=>{
  socket.timeout(20_0000).emit<SocketEmitEvents>("challenge", id, (networkError:Error | null, userError:string | null,  response: boolean, game:Game)=>{
    if(networkError) reject(networkError);
    if(userError) reject(userError);
    resolve({response, game})
  })
})
