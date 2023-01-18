import {
  createContext,
  ReactNode,
  useState,
  PropsWithChildren,
  FunctionComponent,
} from "react";
import { StoreType } from "./types/StoreType";

export const Store = createContext<StoreType | null>(null);

export const StoreProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalItems, setModalItems] = useState<ReactNode>();

  return (
    <Store.Provider
      value={{ isModalOpen, setIsModalOpen, modalItems, setModalItems }}
    >
      {children}
    </Store.Provider>
  );
};
