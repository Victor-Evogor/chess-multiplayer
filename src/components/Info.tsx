import { FaArrowCircleLeft } from "react-icons/fa";
import { IconBase } from "react-icons";
import { useNavigate } from "react-router-dom";
import step1 from "../imgs/step_1.png";
import step2 from "../imgs/step_2.png";
import step3 from "../imgs/step_3.png";
import step4 from "../imgs/step_4.png";

export const Info = () => {
  const navigate = useNavigate();
  return (
    <section className="px-10 py-10">
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
          <h2 className="text-2xl font-extrabold my-1">
            How to challenge a friend
          </h2>
          <ul className="list-decimal list-inside">
            <li>
              <p>
                Click the <strong>Play friendly</strong> button
              </p>
              <p>
                <img src={step1} />
              </p>
            </li>
            <li>
              <p>
                Copy your <strong>ID</strong> if you want to be challenged and
                give it to your friend. Please note that your id changes every
                time you visit the website or refresh the page.
              </p>
              <p>
                <img src={step2} />
              </p>
            </li>
            <li>
              <p>
                Your friend should then paste the ID and click the challenge
                button
              </p>
              <p className="mb-2">
                <img src={step3} />
              </p>
              <p>
                <img src={step4} />
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold my-1">Game Play</h2>
          <p>
            Drag a piece to the target square to make a move, if its a valid
            move, it will drop else it will not
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold my-1">Chess Rules</h2>
          <p>
            Learn more about chess {/* TODO:add external chess rules guide  */}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-sky-500"
            >
              here
            </a>
          </p>
        </div>
      </section>
    </section>
  );
};
