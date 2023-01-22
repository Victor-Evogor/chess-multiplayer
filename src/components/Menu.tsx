import { useModal } from "../hooks/useModal";
import { Friendly } from "./Friendly";
import { SearchingRandom } from "./Searching";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../utils/updateUserData";
import { searchRandomPlayerOnline } from "../utils/searchRandomPlayerOnline";
import { useSocket } from "../hooks/useSocket";
import { cancelSearch } from "../utils/cancelSearch";
import { challengeOpponentWithId } from "../utils/challengeOpponentWithId";
import { SocketEmitEvents } from "../shared/SocketEvents";

export const Menu = () => {
  const { setIsModalOpen, setModalItems } = useModal();
  const { socket } = useSocket();
  const navigate = useNavigate();

  if (!socket) return <div>Loading...</div>;

  updateUserData({idle: true}, socket);

  const onCancel = () => {
    if (!socket) return;
    setIsModalOpen(false);
    cancelSearch(socket);
  };

  socket.on<SocketEmitEvents>(
    "challenge made",
    (game: Game, callback: (err: string | null , answer: boolean, game?:Game) => void) => {
      setIsModalOpen(true);
      setModalItems(
        <section>
          <p className="px-2 py-2">You have been challenged by <strong>{game.p1}</strong></p>
          <div className="flex items-center gap-2">
            <button onClick={()=>{
              callback(null, true, game)
              setIsModalOpen(false);
              navigate(`/game?p1=${game.p1}&p2=${game.p2}`);
            }} className="p-2 bg-green-300 hover:brightness-75 active:brightness-50 rounded-md`">Accept</button>
            <button onClick={()=> {
              callback(null, false)
              setIsModalOpen(false)
            }} className="p-2 bg-red-300 hover:brightness-75 active:brightness-50 rounded-md">Reject</button>
          </div>
        </section>
      );
    }
  );

  return (
    <section className="grid w-screen h-screen place-items-center">
      <div className="flex flex-col gap-y-2 border rounded-md border-gray-500 p-4">
        <button
          className="bg-indigo-200 px-4 py-2 hover:brightness-75 active:brightness-50"
          onClick={() => {
            setIsModalOpen(true);
            setModalItems(<SearchingRandom onCancel={onCancel} />);
            updateUserData({ idle: false, searching: true }, socket).then(
              () => {
                searchRandomPlayerOnline(socket)
                  .then((game) => {
                    setIsModalOpen(false);
                    updateUserData({ searching: false }, socket);
                    navigate(`/game?p1=${game.p1}&p2=${game.p2}`);
                  })
                  .catch((err: Error) => {
                    setIsModalOpen(false);
                    updateUserData({ searching: false }, socket);
                    alert(err);
                  });
              }
            );
          }}
        >
          Play Random
        </button>
        <button
          className="bg-slate-200 px-4 py-2 hover:brightness-75 active:brightness-50"
          onClick={() => {
            setIsModalOpen(true);
            setModalItems(
              <Friendly
                onSubmit={(inputID) => {
                  if (!inputID || inputID === socket.id) return;
                  challengeOpponentWithId(socket, inputID)
                    .then(({game, response}) => {
                      if(response)
                      {
                        setIsModalOpen(false)
                        navigate(`/game?p1=${game.p1}&p2=${game.p2}`);
                      }
                      else{
                        setIsModalOpen(true);
                        setModalItems(<p>User rejected your challenge</p>)
                      }
                    })
                    .catch((error) => {
                      alert(error);
                      console.log(error)
                    });
                }}
              />
            );
          }}
        >
          Play Friendly
        </button>
        <button className="bg-zinc-200 px-4 py-2 hover:brightness-75 active:brightness-50">
          Play Computer
        </button>
        <button
          className="bg-stone-200 px-4 py-2 hover:brightness-75 active:brightness-50"
          onClick={() => navigate("/info")}
        >
          Info
        </button>
        <p className="mt-4">
          &copy;2023{" "}
          <a
            href="https://linktr.ee/victorevogor"
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-slate-600"
          >
            Victor Evogor
          </a>
        </p>
      </div>
    </section>
  );
};
