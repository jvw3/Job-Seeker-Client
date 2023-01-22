import { useNavigate, useParams,  } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateBoard, getSingleBoardForUser } from "../managers/BoardManager";

// Board Edit Component allows a user to update their Board data.

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
      is_active: board.is_active
    };

    updateBoard(boardToApi, id).then(() => navigate(`/boards/${id}`));
  };

  return (
    <>
      <main className="flex-col w-full bg-pinkswirl">
        <div className="h-1/6 ">
          <h1 className="p-5 text-4xl text-white font-quicksand">Edit Board</h1>
        </div>
        <div className="flex justify-center w-full h-5/6">
          <div className="flex-col w-2/5 p-10 bg-white border rounded -md h-5/6">
            <form className="flex-col">
              <fieldset className="mb-2 space-y-2">
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
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
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="How would you describe your job search?"
                    value={board.title}
                    onChange={(evt) => {
                      const copy = { ...board };
                      copy.title = evt.target.value;
                      setBoard(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="goal"
                  >
                    Goal:
                  </label>
                  <textarea
                    required
                    rows={3}
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="What is your goal?"
                    value={board.goal}
                    onChange={(evt) => {
                      const copy = { ...board };
                      copy.goal = evt.target.value;
                      setBoard(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Requirements:
                  </label>
                  <textarea
                    required
                    rows={3}
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
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
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
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
