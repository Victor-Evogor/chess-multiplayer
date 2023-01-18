import { ReactNode } from "react";
import { SetStateType } from "./SetStateType";

export interface StoreType {
  isModalOpen: boolean;
  setIsModalOpen: SetStateType<boolean>;
  modalItems: ReactNode;
  setModalItems: SetStateType<ReactNode>;
}
