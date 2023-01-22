import {
  createContext,
  ReactNode,
  useState,
  PropsWithChildren,
  FunctionComponent,
  useEffect,
} from "react";
import { StoreType } from "./types/StoreType";
import {io, Socket, } from "socket.io-client"
import env from "./env.json"

export const Store = createContext<StoreType | null>(null);

export const StoreProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalItems, setModalItems] = useState<ReactNode>();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(()=>{
    setSocket(io(env.server_url));
  }, [])

  return (
    <Store.Provider
      value={{ isModalOpen, setIsModalOpen, modalItems, setModalItems, socket }}
    >
      {children}
    </Store.Provider>
  );
};
