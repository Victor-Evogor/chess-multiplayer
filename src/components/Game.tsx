import { useSearchParams, Navigate } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { useSocket } from "../hooks/useSocket";
import { Move } from "../shared/Move";
import { makeMove } from "../utils/makeMove";
import { useState, useEffect } from "react";
import { updateUserData } from "../utils/updateUserData";
import { SocketEmitEvents } from "../shared/SocketEvents";
import { GameOver } from "../shared/GameOver";
import { useModal } from "../hooks/useModal";
import { GameOverComp } from "./GameOverComp";

export const Game = () => {
  const { socket } = useSocket();
  const { setIsModalOpen, setModalItems } = useModal();
  const [position, setPosition] = useState<string>("start");
  const [searchParams] = useSearchParams();
  const p1 = searchParams.get("p1");
  const p2 = searchParams.get("p2");

  if ((p1 !== socket?.id && p2 !== socket?.id) || !p2 || !p1) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    updateUserData({ idle: false }, socket);
    return () => {
      updateUserData({ idle: true }, socket);
    };
  }, []);

  socket.on<SocketEmitEvents>("move made", (boardFen) => {
    // TODO: check for end of game here
    setPosition(boardFen);
  });

  socket.on<SocketEmitEvents>("game over", (gameOver: GameOver) => {
    setIsModalOpen(true);
    if (gameOver.type === "checkmate") {
      let message: string;
      if (gameOver.loser === "w" && p1 === socket.id) {
        message = "You lose:(";
      } else if (gameOver.loser === "b" && p2 === socket.id) {
        message = "You lose:(";
      } else {
        message = "You win!";
      }
      setModalItems(<GameOverComp message={message}/>);
    }else {
      setModalItems(<GameOverComp message={gameOver.type}/>)
    }
  });

  return (
    <section className="grid place-items-center w-screen h-screen">
      <section className="w-96 h-96">
        <Chessboard
          onPieceDrop={(sourceSquare, targetSquare, piece) => {
            const move: Move = {
              sourceSquare,
              targetSquare,
              piece,
              opponentId: p1 === socket.id ? p2 : p1,
            };
            makeMove(move, socket).catch((error) => {
              console.log(error);
            });
            return true;
          }}
          position={position}
          isDraggablePiece={({ piece }) => {
            if (
              (p1 === socket.id && piece[0] === "w") ||
              (p2 === socket.id && piece[0] === "b")
            )
              return true;
            else return false;
          }}
          boardOrientation={p1 === socket.id ? "white" : "black"}
        />
      </section>
    </section>
  );
};
