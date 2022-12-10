import { useNavigate, useParams,  } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateBoard, getSingleBoardForUser } from "../managers/BoardManager";

export const BoardEdit = () => {
  const [board, setBoard] = useState({
    title: "",
    goal: "",
    requirements: "",
  });

const { id } = useParams();
const navigate = useNavigate();

useEffect(() => {
      getSingleBoardForUser(id).then((userBoard) => {
        setBoard(userBoard);
      });
    }, []);

  const putRequestForBoard = (event) => {
    event.preventDefault();

    const boardToApi = {
      title: board.title,
      goal: board.goal,
      requirements: board.requirements,
    };

    updateBoard(boardToApi, id).then(() => navigate("/"));
  };

  return (
    <>
      <main>
        <h1>Update Board</h1>
      </main>
      <form>
        <fieldset className="formSection">
          <label htmlFor="name">Title:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="How would you describe your job search?"
            value={board.title}
            onChange={(evt) => {
              const copy = {... board};
              copy.title = evt.target.value;
              setBoard(copy);
            }}
          />
        </fieldset>
        <fieldset className="formSection">
          <label htmlFor="name">Goal:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="What is your goal?"
            value={board.goal}
            onChange={(evt) => {
              const copy = {... board};
              copy.goal = evt.target.value;
              setBoard(copy);
            }}
          />
        </fieldset>
        <fieldset className="formSection">
          <label htmlFor="name">Requirements:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="What are your job requirements?"
            value={board.requirements}
            onChange={(evt) => {
              const copy = {... board};
              copy.requirements = evt.target.value;
              setBoard(copy);
            }}
          />
        </fieldset>
        <button
          size="lg"
          color="violet"
          onClick={(clickEvent) => putRequestForBoard(clickEvent)}
        >
          Save changes!
        </button>
      </form>
    </>
  );
};
