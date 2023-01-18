import { MouseEventHandler } from "react";

export const SearchingRandom = ({
  onCancel,
}: {
  onCancel: MouseEventHandler<HTMLButtonElement>;
}) => (
  <section className="flex justify-between items-center">
    <div>Searching a random player...</div>
    <button
      onClick={onCancel}
      className="bg-red-600 p-2 rounded-md font-semibold text-white hover:brightness-75 active:brightness-50"
    >
      Cancel
    </button>
  </section>
);
