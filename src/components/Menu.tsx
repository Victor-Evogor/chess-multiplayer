import { useModal } from "../hooks/useModal";
import { Friendly } from "./Friendly";
import { SearchingRandom } from "./Searching";
import {useNavigate} from "react-router-dom"

export const Menu = () => {
  const { setIsModalOpen, setModalItems } = useModal();
  const navigate = useNavigate();

  const onCancel = () => {
    setIsModalOpen(false);
    // TODO: cancel the current search
  };

  return (
    <section className="grid w-screen h-screen place-items-center">
      <div className="flex flex-col gap-y-2 border rounded-md border-gray-500 p-4">
        <button
          className="bg-indigo-200 px-4 py-2 hover:brightness-75 active:brightness-50"
          onClick={() => {
            setIsModalOpen(true);
            setModalItems(<SearchingRandom onCancel={onCancel} />);
            // search for random player then start match if found
          }}
        >
          Play Random
        </button>
        <button className="bg-slate-200 px-4 py-2 hover:brightness-75 active:brightness-50" onClick={()=> {
          setIsModalOpen(true);
          setModalItems(<Friendly onSubmit={onCancel}/>)
        }}>
          Play Friendly
        </button>
        <button className="bg-zinc-200 px-4 py-2 hover:brightness-75 active:brightness-50">
          Play Computer
        </button>
        <button className="bg-stone-200 px-4 py-2 hover:brightness-75 active:brightness-50" onClick={()=> navigate("/info")}>
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
