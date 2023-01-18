import { useModal } from "../hooks/useModal";

export const Modal = () => {
  const {isModalOpen, modalItems} = useModal();

  return (
    <div className="w-screen h-screen bg-black bg-opacity-10 absolute" style={{
      display: isModalOpen?"block":"none"
    }}>
      <section className="absolute top-2 w-3/4 border rounded-md left-[12.5%] p-2 shadow-md bg-white">
        {modalItems}
      </section>
    </div>
  );
};
