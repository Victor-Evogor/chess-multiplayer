import { useSearchParams, Navigate, useNavigate } from "react-router-dom";
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
import { FaWindowClose } from "react-icons/fa";

export const Game = () => {
  const { socket } = useSocket();
  const { setIsModalOpen, setModalItems } = useModal();
  const navigate = useNavigate();
  const [position, setPosition] = useState<string>("start");
  const [gameOver, setGameOver] = useState(false);
  const [searchParams] = useSearchParams();
  const p1 = searchParams.get("p1");
  const p2 = searchParams.get("p2");

  if ((p1 !== socket?.id && p2 !== socket?.id) || !p2 || !p1) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    updateUserData(
      p2 === "ai"
        ? {
            idle: false,
            game: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
          }
        : { idle: false },
      socket
    );
    return () => {
      updateUserData({ idle: true }, socket);
    };
  }, []);

  socket.on<SocketEmitEvents>("move made", (boardFen) => {
    setPosition(boardFen);
  });

  socket.on<SocketEmitEvents>("game over", (gameOver: GameOver) => {
    setIsModalOpen(true);
    if (gameOver.type === "checkmate") {
      setGameOver(true);
      let message: string;
      if (gameOver.loser === "w" && p1 === socket.id) {
        message = "You lose:(";
      } else if (gameOver.loser === "b" && p2 === socket.id) {
        message = "You lose:(";
      } else {
        message = "You win!";
      }
      setModalItems(
        <GameOverComp
          message={message}
          backToMainMenu={() => {
            setIsModalOpen(false);
            navigate("/");
          }}
        />
      );
    } else {
      setModalItems(
        <GameOverComp
          message={gameOver.type}
          backToMainMenu={() => {
            setIsModalOpen(false);
            navigate("/");
          }}
        />
      );
    }
  });

  return (
    <section className="grid place-items-center w-screen h-screen">
      <section className="md:w-96 md:h-96 w-60 h-60">
        <Chessboard
          onPieceDrop={(sourceSquare, targetSquare, piece) => {
            const move: Move = {
              sourceSquare,
              targetSquare,
              piece,
              opponentId: p1 === socket.id ? p2 : p1,
            };
            makeMove(move, socket).catch((error) => {
              if (error === "opponent with this socket id not found") {
                setIsModalOpen(true);
                setGameOver(true);
                setModalItems(
                  <div className="flex justify-between items-center">
                    <span>Seems like your opponent left the game!</span>
                    <span
                      onClick={() => {
                        setIsModalOpen(false);
                        navigate("/");
                      }}
                      className="cursor-pointer"
                    >
                      <FaWindowClose />
                    </span>
                  </div>
                );
              }
            });
            return true;
          }}
          position={position}
          isDraggablePiece={({ piece }) => {
            if (gameOver) return false;
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
