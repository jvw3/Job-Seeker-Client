import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBoard, getAllCategories } from "../managers/BoardManager";

export const BoardForm = () => {
  const [categories, setCategories] = useState([]);
   const [checkedCategories, setCheckedCategories] = useState(new Set());
  const [board, setBoard] = useState({
    title: "",
    goal: "",
    requirements: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((allCategories) => {
      setCategories(allCategories);
    });
  }, []);

  const postRequestForBoard = (event) => {
    event.preventDefault();

    const boardToApi = {
      title: board.title,
      goal: board.goal,
      requirements: board.requirements,
      categories: Array.from(checkedCategories),
    };

    createBoard(boardToApi).then(() => navigate("/dashboard"));
  };

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
              const copy = {...board};
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
              const copy = {...board};
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
              const copy = {...board};
              copy.requirements = evt.target.value;
              setBoard(copy);
            }}
          />
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="age">Categories:</label>
            {categories.map((category) => (
              <div>
                {category.name}
                <input
                  value={category.id}
                  onChange={(event) => {
                    const copy = new Set(checkedCategories);
                    if (copy.has(category.id)) {
                      copy.delete(category.id);
                    } else {
                      copy.add(category.id);
                    }
                    setCheckedCategories(copy);
                  }}
                  type="checkbox"
                />
              </div>
            ))}
          </div>
        </fieldset>
        <button
          size="lg"
          color="violet"
          onClick={(clickEvent) => postRequestForBoard(clickEvent)}
        >
          Create New Board!
        </button>
      </form>
    </>
  );
};
