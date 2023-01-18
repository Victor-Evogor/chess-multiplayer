import { FaArrowCircleLeft } from "react-icons/fa";
import { IconBase } from "react-icons";
import { useNavigate } from "react-router-dom";

export const Info = () => {
  const navigate = useNavigate();
  return (
    <section className="px-10 py-4">
      <span
        className="text-gray-400"
        title="go back to main menu"
        onClick={() => navigate("/")}
      >
        <IconBase
          style={{
            fontSize: "2rem",
          }}
          className="text-gray-400 hover:text-gray-800 cursor-pointer active:scale-90"
        >
          <FaArrowCircleLeft />
        </IconBase>
      </span>
      <section>
        <div>
          <h2>How to play against a friend</h2>
          <ul className="list-decimal list-inside">
            {/* TODO: Each of these steps should include images */}
            <li>
              Click the <strong>Play against a friend button</strong>
            </li>
            <li>
              Copy your <strong>ID</strong> if you want to be challenged and
              give it to your friend
            </li>
            <li>
              Your friend should then paste the ID and click the challenge
              button
            </li>
          </ul>
        </div>

        <div>
          <h2>Game Play</h2>
          <p></p>
        </div>

        <div>
          <h2>Chess Rules</h2>
          <p>
            Learn more about chess{" "}
            <a href="#" target="_blank" rel="noreferrer">
              here
            </a>
          </p>
        </div>
      </section>
    </section>
  );
};
