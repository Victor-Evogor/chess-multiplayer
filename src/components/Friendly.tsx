import { FaClipboard, FaWindowClose } from "react-icons/fa";
import { IconBase } from "react-icons";
import { useRef } from "react";
import { useModal } from "../hooks/useModal";
import { useSocket } from "../hooks/useSocket";

export const Friendly = ({ onSubmit }: { onSubmit: (inputID: string) => void }) => {
  const { setIsModalOpen } = useModal();
  const {socket} = useSocket();
  const inputID = useRef<HTMLInputElement>(null);
  if(!socket) return <div>Network issues!</div>;

  return (
    <>
      <div className="flex justify-end px-1 mb-2">
        <div
          className="active:brightness-50 hover:brightness-75"
          onClick={() => setIsModalOpen(false)}
        >
          <IconBase
            style={{
              color: "red",
              fontSize: "1.3rem",
              cursor: "pointer",
            }}
          >
            <FaWindowClose />
          </IconBase>
        </div>
      </div>
      <div className="flex justify-between items-stretch gap-x-2 mb-4">
        <div className="bg-gray-200 w-full px-2 pt-1">
          {socket.id}
        </div>
        <button
          className="bg-gray-700 p-2 rounded-md font-semibold text-white hover:brightness-75 active:brightness-50"
          title="Copy user id to clipboard"
          onClick={()=>{
            if(navigator){
              navigator.clipboard.writeText(socket.id);
            alert("User ID copied to clipboard, now give it to your friend")
            }else{
              alert("Your browser doesn't have a clipboard api. Select and copy the user id manually :)")
            }
          }}
        >
          <FaClipboard />
        </button>
      </div>
      <form className="flex justify-between items-center" onSubmit={(e)=>{
        e.preventDefault();
        if(!inputID.current) return;
        onSubmit(inputID.current.value);
      }}>
        <input
          className="w-full border rounded-md mr-2 text-lg px-2 py-1"
          placeholder="paste opponent ID here"
          ref={inputID}
        />
        <button
          className="bg-blue-600 p-2 rounded-md font-semibold text-white hover:brightness-75 active:brightness-50"
          type="submit"
        >
          Challenge
        </button>
      </form>
    </>
  );
};
