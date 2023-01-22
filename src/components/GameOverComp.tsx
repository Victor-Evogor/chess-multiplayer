import { useNavigate } from "react-router-dom";

export const GameOverComp = ({ message }: { message: string }) => {
  const navigate = useNavigate();

  return (
    <section>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>Back to main menu</button>
    </section>
  );
};
