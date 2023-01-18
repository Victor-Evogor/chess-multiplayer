import { useContext } from "react";
import { Store } from "../Store";

export const useModal = () => {
  const { isModalOpen, modalItems, setIsModalOpen, setModalItems } =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useContext(Store)!;
  return { isModalOpen, modalItems, setIsModalOpen, setModalItems };
};
