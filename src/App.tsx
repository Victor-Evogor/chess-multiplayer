import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Game } from "./components/Game";
import { Info } from "./components/Info";
import { Menu } from "./components/Menu";
import { Modal } from "./components/Modal";
import { StoreProvider } from "./Store";
import {PageNotFound} from "./components/PageNotFound"

export const App = () => {
  return (
    <main>
      <StoreProvider>
        <Modal />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/info" element={<Info />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </main>
  );
};
