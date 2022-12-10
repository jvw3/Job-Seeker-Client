import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBoard } from "../managers/BoardManager";



export const BoardForm = () => {
    const [board, setBoard] = useState({
        "title": "",
        "goal": "",
        "requirements": ""
    })

    const navigate = useNavigate()


    const postRequestForBoard = (event) => {
        event.preventDefault()

        const boardToApi = {
            title: board.title,
            goal: board.goal,
            requirements: board.requirements,
        }

        createBoard(boardToApi).then(() => navigate("/"));
    }


    return (
      <>
        <main>
          <h1>New Board</h1>
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
                const copy = structuredClone(board);
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
                const copy = structuredClone(board);
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
                const copy = structuredClone(board);
                copy.requirements = evt.target.value;
                setBoard(copy);
              }}
            />
          </fieldset>
          <button
            size="lg"
            color="violet"
            onClick={(clickEvent) => postRequestForBoard(clickEvent)}
          >
            Create New Itinerary!
          </button>
        </form>
      </>
    );
}