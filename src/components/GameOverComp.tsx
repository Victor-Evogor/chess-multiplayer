
export const GameOverComp = ({ message, backToMainMenu }: { message: string, backToMainMenu: ()=>void }) => {

  return (
    <section className="px-2">
      <p>{message}</p>
      <button onClick={() => backToMainMenu()} className="text-slate-500 p-2 rounded-md hover:brightness-75 active:brightness-50">Back to main menu</button>
    </section>
  );
};
