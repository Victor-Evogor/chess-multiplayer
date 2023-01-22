import { useContext } from "react";
import { Store } from "../Store";

export const useSocket = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {socket} = useContext(Store)!
  return {socket};
}
