import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Info } from "./components/Info";
import { Menu } from "./components/Menu";
import { Modal } from "./components/Modal";
import { StoreProvider } from "./Store";

export const App = () => {
  return (
    <main>
      <StoreProvider>
        <Modal/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/info" element={<Info/>} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </main>
  );
};