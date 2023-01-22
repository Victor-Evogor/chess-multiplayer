import { ReactNode } from "react";
import { SetStateType } from "./SetStateType";
import {Socket} from "socket.io-client"

export interface StoreType {
  isModalOpen: boolean;
  setIsModalOpen: SetStateType<boolean>;
  modalItems: ReactNode;
  setModalItems: SetStateType<ReactNode>;
  socket: Socket | null
}
