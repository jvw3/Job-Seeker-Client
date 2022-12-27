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

    updateBoard(boardToApi, id).then(() => navigate(`/boards/${id}`));
  };

  return (
    <>
       <main className="flex-col w-full bg-pinkswirl">
        <div className="h-1/6 ">
          <h1 className="text-white text-4xl p-5">Edit Board</h1>
        </div>
        <div className="w-full h-5/6 flex justify-center">
          <div className="border p-10 rounded -md bg-white w-4/5 h-5/6 flex-col">
            <form className="flex-col">
              <fieldset className="">
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Title:
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="How would you describe your job search?"
                    value={board.title}
                    onChange={(evt) => {
                      const copy = { ...board };
                      copy.title = evt.target.value;
                      setBoard(copy);
                    }}
                  />
                </div>
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="goal"
                  >
                    Goal:
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="What is your goal?"
                    value={board.goal}
                    onChange={(evt) => {
                      const copy = { ...board };
                      copy.goal = evt.target.value;
                      setBoard(copy);
                    }}
                  />
                </div>
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Requirements:
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="What are your job requirements?"
                    value={board.requirements}
                    onChange={(evt) => {
                      const copy = { ...board };
                      copy.requirements = evt.target.value;
                      setBoard(copy);
                    }}
                  />
                </div>
              </fieldset>
              <button
                size="lg"
                color="violet"
                className="transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                onClick={(clickEvent) => putRequestForBoard(clickEvent)}
              >
                Save Changes!
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
